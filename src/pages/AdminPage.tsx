import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import AdminBlogList from "@/components/admin/AdminBlogList";
import AdminStudyMaterials from "@/components/admin/AdminStudyMaterials";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminExperiences from "@/components/admin/AdminExperiences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const AdminPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Authentication error. Please try again.");
      navigate("/auth");
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="blogs">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="materials">Study Materials</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
          </TabsList>
          <TabsContent value="blogs" className="mt-6">
            <AdminBlogList />
          </TabsContent>
          <TabsContent value="materials" className="mt-6">
            <AdminStudyMaterials />
          </TabsContent>
          <TabsContent value="projects" className="mt-6">
            <AdminProjects />
          </TabsContent>
          <TabsContent value="experiences" className="mt-6">
            <AdminExperiences />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;
