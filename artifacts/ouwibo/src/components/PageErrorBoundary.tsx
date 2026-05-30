import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PageErrorBoundaryProps {
  children: ReactNode;
}

interface PageErrorBoundaryState {
  error: Error | null;
}

export default class PageErrorBoundary extends Component<
  PageErrorBoundaryProps,
  PageErrorBoundaryState
> {
  state: PageErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): PageErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Page rendering failed", error, errorInfo);
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <section className="flex min-h-[55vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg rounded-2xl border border-destructive/30 bg-card/80 p-6 text-center shadow-lg backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The page could not be rendered, but your navigation and layout are
            still available. Refresh the page to try again.
          </p>
          <p className="mt-4 rounded-xl border border-border/60 bg-background/70 px-3 py-2 text-left text-xs text-muted-foreground">
            {this.state.error.message}
          </p>
          <Button className="mt-5" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh page
          </Button>
        </div>
      </section>
    );
  }
}
