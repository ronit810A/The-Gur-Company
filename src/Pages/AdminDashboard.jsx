import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Boxes,
  Check,
  CircleDollarSign,
  LayoutDashboard,
  Leaf,
  LogOut,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import "../Css/admin.css";

const categories = [
  { value: "powder", label: "Jaggery powder" },
  { value: "block", label: "Jaggery block" },
  { value: "syrup", label: "Jaggery syrup" },
];

const emptyForm = {
  name: "",
  category: "powder",
  price: "",
  stock: "",
  status: "active",
  description: "",
  image: "",
};

const formatPrice = (price) => `₹${Number(price).toLocaleString("en-IN")}`;

async function fetchProducts() {
  const response = await fetch("/api/admin/products");
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Products could not be loaded.");
  if (!Array.isArray(result)) throw new Error("Product data is in an unexpected format.");
  return result;
}

function AdminDashboard({ userEmail, onLogout }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setProducts(await fetchProducts());
      setError("");
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchProducts()
      .then((items) => {
        if (active) setProducts(items);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      const matchesSearch = !query || product.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, products, search]);

  const activeCount = products.filter((product) => product.status === "active").length;
  const stockCount = products.reduce((total, product) => total + product.stock, 0);
  const inventoryValue = products.reduce((total, product) => total + product.price * product.stock, 0);

  const openForm = (product) => {
    setFormOpen(true);
    setEditingId(product?.id || "");
    setForm(product ? {
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      status: product.status,
      description: product.description || "",
      image: product.image || "",
    } : { ...emptyForm });
    setError("");
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId("");
    setForm({ ...emptyForm });
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim(),
      image: form.image.trim(),
    };

    try {
      const response = await fetch(editingId ? `/api/products/${encodeURIComponent(editingId)}` : "/api/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = response.status === 204 ? null : await response.json();
      if (!response.ok) throw new Error(result?.error || "Product could not be saved.");
      closeForm();
      await loadProducts();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setError("");
    try {
      const response = await fetch(`/api/products/${encodeURIComponent(product.id)}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Product could not be deleted.");
      setProducts((current) => current.filter((item) => item.id !== product.id));
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  const logout = async () => {
    setError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not sign out.");
      onLogout();
    } catch (logoutError) {
      setError(logoutError.message);
    }
  };

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/" aria-label="The Gur Company home">
          <span className="admin-brand-icon"><Leaf size={21} /></span>
          <span>The Gur Company<small>STORE ADMIN</small></span>
        </a>
        <div className="admin-nav-label">WORKSPACE</div>
        <a className="admin-nav-link is-current" href="/admin"><LayoutDashboard size={18} /> Dashboard</a>
        <a className="admin-nav-link" href="/powder"><Package size={18} /> Storefront</a>
        <div className="admin-sidebar-bottom">
          <span className="admin-status-dot" />
          Local product API connected
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div><span className="admin-breadcrumb">Workspace /</span> Products</div>
          <div className="admin-account">
            <span>{userEmail}</span>
            <a className="admin-store-link" href="/" target="_blank" rel="noreferrer">View storefront <span aria-hidden="true">↗</span></a>
            <button type="button" className="admin-logout-button" onClick={logout}><LogOut size={15} /> Sign out</button>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-page-heading">
            <div>
              <p className="admin-eyebrow">YOUR STORE AT A GLANCE</p>
              <h1>Product dashboard</h1>
              <p>Manage your jaggery collection, prices and stock in one place.</p>
            </div>
            <button type="button" className="admin-primary-button" onClick={() => openForm()}>
              <Plus size={18} /> Add product
            </button>
          </div>

          {error && <div className="admin-alert" role="alert"><AlertTriangle size={18} />{error}</div>}

          <div className="admin-stats">
            <article className="admin-stat-card">
              <span className="admin-stat-icon icon-amber"><Package size={19} /></span>
              <span className="admin-stat-label">Total products</span>
              <strong>{products.length}</strong>
              <small>Across all categories</small>
            </article>
            <article className="admin-stat-card">
              <span className="admin-stat-icon icon-green"><Check size={19} /></span>
              <span className="admin-stat-label">Active products</span>
              <strong>{activeCount}</strong>
              <small>Visible on the storefront</small>
            </article>
            <article className="admin-stat-card">
              <span className="admin-stat-icon icon-blue"><Boxes size={19} /></span>
              <span className="admin-stat-label">Units in stock</span>
              <strong>{stockCount.toLocaleString("en-IN")}</strong>
              <small>Across all products</small>
            </article>
            <article className="admin-stat-card">
              <span className="admin-stat-icon icon-purple"><CircleDollarSign size={19} /></span>
              <span className="admin-stat-label">Stock value</span>
              <strong>{formatPrice(inventoryValue)}</strong>
              <small>Retail value of inventory</small>
            </article>
          </div>

          <section className="admin-products-panel">
            <div className="admin-panel-heading">
              <div>
                <h2>All products <span>{products.length}</span></h2>
                <p>Products listed here sync with your storefront.</p>
              </div>
              <div className="admin-filters">
                <label className="admin-search">
                  <Search size={17} />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" aria-label="Search products" />
                </label>
                <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter by category">
                  <option value="all">All categories</option>
                  {categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="admin-empty-state">Loading your products…</div>
            ) : filteredProducts.length === 0 ? (
              <div className="admin-empty-state">{products.length ? "No products match your filters." : "No products yet. Add your first product to get started."}</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>STOCK</th><th>STATUS</th><th aria-label="Actions" /></tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="admin-product-name">
                            <span className="admin-product-thumb"><Package size={18} /></span>
                            <span><strong>{product.name}</strong><small>{product.description || "No description"}</small></span>
                          </div>
                        </td>
                        <td><span className="admin-category-tag">{categories.find((category) => category.value === product.category)?.label}</span></td>
                        <td className="admin-price">{formatPrice(product.price)}</td>
                        <td><span className={product.stock < 10 ? "admin-stock is-low" : "admin-stock"}>{product.stock} units</span></td>
                        <td><span className={`admin-product-status is-${product.status}`}>{product.status}</span></td>
                        <td>
                          <div className="admin-row-actions">
                            <button type="button" onClick={() => openForm(product)} aria-label={`Edit ${product.name}`}><Pencil size={16} /></button>
                            <button type="button" onClick={() => deleteProduct(product)} aria-label={`Delete ${product.name}`}><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </section>

      {formOpen ? (
        <div className="admin-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeForm();
        }}>
          <section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-form-title">
            <div className="admin-modal-heading">
              <div><p className="admin-eyebrow">{editingId ? "UPDATE YOUR CATALOGUE" : "GROW YOUR COLLECTION"}</p><h2 id="admin-form-title">{editingId ? "Edit product" : "Add a product"}</h2></div>
              <button type="button" className="admin-close-button" onClick={closeForm} aria-label="Close form"><X size={20} /></button>
            </div>
            <form onSubmit={saveProduct}>
              <label>Product name<input required maxLength={100} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Golden Jaggery Powder" /></label>
              <label>Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select></label>
              <div className="admin-form-row">
                <label>Price (₹)<input required type="number" min="0.01" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="199" /></label>
                <label>Stock units<input required type="number" min="0" step="1" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} placeholder="24" /></label>
              </div>
              <label>Status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="active">Active — visible in store</option><option value="draft">Draft — hidden from store</option></select></label>
              <label>Short description<textarea maxLength={400} rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Tell customers what makes this product special." /></label>
              <label>Product image URL <span className="admin-optional">(optional)</span><input type="url" value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="https://example.com/product.jpg" /></label>
              {error && <div className="admin-alert" role="alert"><AlertTriangle size={18} />{error}</div>}
              <div className="admin-form-actions">
                <button type="button" className="admin-secondary-button" onClick={closeForm}>Cancel</button>
                <button type="submit" className="admin-primary-button" disabled={saving}>{saving ? "Saving…" : <><Check size={17} /> {editingId ? "Save changes" : "Add product"}</>}</button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </main>
  );
}

export default AdminDashboard;
