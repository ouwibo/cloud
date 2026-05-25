import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "@/components/Layout";
import DashboardPage from "@/pages/DashboardPage";
import AirdropsPage from "@/pages/AirdropsPage";
import AirdropDetailPage from "@/pages/AirdropDetailPage";
import NewsPage from "@/pages/NewsPage";
import ChatPage from "@/pages/ChatPage";
import SettingsPage from "@/pages/SettingsPage";
import ArticlePage from "@/pages/ArticlePage";
import AdminPage from "@/pages/AdminPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import NotFound from "@/pages/not-found";

const qc = new QueryClient();

function App() {
  return (
    <WouterRouter><QueryClientProvider client={qc}><TooltipProvider><ThemeProvider><Switch>
              {/* Admin — no sidebar */}
              <Route path="/admin/login" component={AdminLoginPage} />

              {/* All other routes — inside sidebar Layout */}
              <Route><Layout><Switch><Route path="/"                component={DashboardPage}    /><Route path="/airdrops"         component={AirdropsPage}     /><Route path="/airdrops/:slug"   component={AirdropDetailPage}/><Route path="/news"             component={NewsPage}         /><Route path="/article/:slug"    component={ArticlePage}      /><Route path="/chat"             component={ChatPage}         /><Route path="/admin"            component={AdminPage}        /><Route path="/settings"         component={SettingsPage}     /><Route component={NotFound} /></Switch></Layout></Route></Switch><Toaster /></ThemeProvider></TooltipProvider></QueryClientProvider></WouterRouter>
  );
}

export default App;
