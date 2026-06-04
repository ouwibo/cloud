import { Suspense, lazy } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import PageErrorBoundary from "@/components/PageErrorBoundary";

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const AirdropsPage = lazy(() => import("@/pages/AirdropsPage"));
const AirdropDetailPage = lazy(() => import("@/pages/AirdropDetailPage"));
const ChatPage = lazy(() => import("@/pages/ChatPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const NotFound = lazy(() => import("@/pages/not-found"));

const qc = new QueryClient();

function PremiumRouteFallback() {
  return (
    <div className="premium-page space-y-4" aria-busy="true" aria-live="polite">
      <div className="premium-panel rounded-3xl border p-5 sm:p-6">
        <div className="lazy-premium h-4 w-32 rounded-full" />
        <div className="lazy-premium mt-5 h-8 w-full max-w-xl rounded-2xl" />
        <div className="lazy-premium mt-3 h-4 w-full max-w-3xl rounded-full" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="premium-card rounded-2xl border p-4">
            <div className="lazy-premium h-28 rounded-xl" />
            <div className="lazy-premium mt-4 h-4 rounded-full" />
            <div className="lazy-premium mt-2 h-3 w-2/3 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <WouterRouter>
      <QueryClientProvider client={qc}>
        <TooltipProvider>
          <ThemeProvider>
            <Layout>
              <PageErrorBoundary>
                <Suspense fallback={<PremiumRouteFallback />}>
                  <Switch>
                    <Route path="/" component={DashboardPage} />
                    <Route path="/airdrops" component={AirdropsPage} />
                    <Route
                      path="/airdrops/:slug"
                      component={AirdropDetailPage}
                    />
                    <Route path="/chat" component={ChatPage} />
                    <Route path="/settings" component={SettingsPage} />
                    <Route component={NotFound} />
                  </Switch>
                </Suspense>
              </PageErrorBoundary>
            </Layout>
            <Toaster />
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;
