import { Switch, Route } from "wouter";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Airdrops from "./pages/Airdrops";
import AirdropDetail from "./pages/AirdropDetail";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/airdrops" component={Airdrops} />
      <Route path="/airdrops/:id" component={AirdropDetail} />
      <Route>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, fontWeight: 800, color: "#e5e7eb" }}>404</div>
            <p style={{ color: "#9ca3af", marginTop: 8 }}>Page not found</p>
            <a href="/" style={{ marginTop: 16, display: "inline-block", color: "#0ea5e9" }}>Go home</a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}
