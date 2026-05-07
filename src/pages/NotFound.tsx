import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "Page not found — Lumen";
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="font-serif text-7xl text-primary">404</p>
        <h1 className="mt-4 font-serif text-3xl text-foreground">This page is lost</h1>
        <blockquote className="mt-6 font-serif italic text-muted-foreground">
          “Seek and you shall find; knock and the door will be opened to you.”
          <footer className="mt-2 text-sm not-italic">— Matthew 7:7</footer>
        </blockquote>
        <Button asChild className="mt-8">
          <Link to="/">Return home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
