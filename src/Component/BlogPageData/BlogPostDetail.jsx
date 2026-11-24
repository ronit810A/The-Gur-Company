import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { blogPosts, featuredPost } from "./blogPosts";

function BlogPostDetail() {
  const { slug } = useParams();
  const post = [featuredPost, ...blogPosts].find((item) => item.slug === slug);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <main className="blog-story-page">
      <header className="blog-story-hero">
        <div className="container heading">
          <Link className="blog-story-back" to="/blogs">
            <ArrowLeft size={17} /> Back to stories
          </Link>
          <div className="blog-story-meta">
            <span>{post.category}</span>
            <span>{post.date}</span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
      </header>

      <article className="blog-story-article">
        <div className="blog-story-cover">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="blog-story-content">
          {post.sections.map((section) => (
            <section className="blog-story-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <Link className="blog-story-more" to="/blogs">
            Explore more stories <ArrowRight size={17} />
          </Link>
        </div>
      </article>
    </main>
  );
}

export default BlogPostDetail;
