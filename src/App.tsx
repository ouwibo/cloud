import { Switch, Route, Router as WouterRouter } from "wouter";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", background: "#0a1e3c" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
        <p style={{ color: "rgba(255,255,255,.5)" }}>Page not found</p>
        <a href="/" style={{ color: "#93d9f8" }}>← Back home</a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter>
      <Router />
    </WouterRouter>
  );
}
