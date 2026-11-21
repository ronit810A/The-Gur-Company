import BlogBanner from "../Component/BlogPageData/BlogBanner";
import BlogFeatured from "../Component/BlogPageData/BlogFeatured";
import BlogGrid from "../Component/BlogPageData/BlogGrid";
import BlogNewsletter from "../Component/BlogPageData/BlogNewsletter";


import CuratedSection from "../Component/HomePageData/curated-section";

import "../Css/blog.css";

function Blogs() {
  return (
    <main className="blog-page">
      <BlogBanner />
      <BlogFeatured />
      <CuratedSection />
      <BlogGrid />
      <BlogNewsletter />
    </main>
  );
}

export default Blogs;
