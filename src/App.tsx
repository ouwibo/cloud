import { Switch, Route } from "wouter";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <UserProvider>
    <CartProvider>
      <WishlistProvider>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/product/:slug">
            {(params) => <Product slug={params.slug} />}
          </Route>
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order-success/:id">
            {(params) => <OrderSuccess id={params.id} />}
          </Route>
          <Route path="/orders" component={Orders} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route>
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: "url(/sky-bg.webp)", backgroundSize: "cover", fontFamily: "'Inter',sans-serif" }}>
              <div style={{ textAlign: "center", background: "rgba(255,255,255,0.78)", backdropFilter: "blur(22px)", borderRadius: 22, padding: "52px 60px", border: "1px solid rgba(255,255,255,0.85)" }}>
                <div style={{ fontSize: 72, fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.06em" }}>404</div>
                <p style={{ color: "#888", marginTop: 10, marginBottom: 24, fontSize: 15 }}>Page not found</p>
                <a href="/" style={{ color: "#B8860B", fontWeight: 700, textDecoration: "none" }}>Back to Home</a>
              </div>
            </div>
          </Route>
        </Switch>
      </WishlistProvider>
    </CartProvider>
    </UserProvider>
  );
}
