import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <Zap size={32} className="text-primary" />
      </div>
      <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
      <p className="text-xl font-semibold text-foreground mb-2">Page not found</p>
      <p className="text-muted-foreground mb-8 max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">
          <Home size={16} className="mr-2" />
          Back to Dashboard
        </Link>
      </Button>
    </div>
  );
}
