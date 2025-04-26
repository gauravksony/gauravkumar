
import { useParams } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { useBlogPost } from '@/hooks/useBlogPost';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogContent from '@/components/blog/BlogContent';
import BlogAuthor from '@/components/blog/BlogAuthor';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { blog, loading } = useBlogPost(id);
  
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-portfolio-lightestSlate mb-4">Loading...</h2>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!blog) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-portfolio-lightestSlate mb-4">Blog Post Not Found</h2>
            <p className="text-portfolio-slate mb-6">The article you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <BlogHeader 
            title={blog.title}
            date={blog.date}
            readTime={blog.readTime || ''}
            tags={blog.tags}
          />
          
          <BlogContent 
            content={blog.content}
            featuredImage={blog.featuredImage}
            title={blog.title}
          />
          
          <BlogAuthor />
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
