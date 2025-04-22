
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import BlogForm from './BlogForm';
import { toast } from 'sonner';

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {!showForm ? (
        <>
          <Button onClick={() => setShowForm(true)} className="mb-6">
            Add New Blog
          </Button>
          <div className="space-y-4">
            {blogs.map((blog: any) => (
              <div
                key={blog.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-medium">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground">{blog.slug}</p>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingBlog(blog);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <BlogForm
          blog={editingBlog}
          onClose={() => {
            setShowForm(false);
            setEditingBlog(null);
            fetchBlogs();
          }}
        />
      )}
    </div>
  );
};

export default AdminBlogList;
