
import { Link } from "react-router-dom";
import Layout from "@/components/common/Layout";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-portfolio-cyan mb-4">404</h1>
          <h2 className="text-3xl font-bold text-portfolio-lightestSlate mb-4">Page Not Found</h2>
          <p className="text-portfolio-slate mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn-primary inline-flex">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
