import { useEffect, useMemo, useState } from "react";
import {
  getProducts,
  getCartItems,
  addToCart,
  updateCartItem,
  deleteCartItem,
} from "./services/api";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import FilterBar from "./components/FilterBar";
import "./index.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const showMessage = (text) => {
  setMessage(text);
  setTimeout(() => {
    setMessage("");
  }, 2000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsRes, cartRes] = await Promise.all([
        getProducts(),
        getCartItems(),
      ]);
      setProducts(productsRes.data);
      setCartItems(cartRes.data);
    } catch (error) {
      console.error("Failed to load data:", error);
      showMessage("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return ["All", ...uniqueCategories];
  }, [products]);

 const filteredProducts = products.filter((p) => {
  const matchCategory =
    selectedCategory === "All" || p.category === selectedCategory;

  const matchSearch = p.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  return matchCategory && matchSearch;
});

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      await loadData();
      showMessage("Item added to cart.");
    } catch (error) {
      console.error("Failed to add item:", error);
      setMessage("Failed to add item.");
    }
  };

  const handleIncrease = async (cartItemId, currentQuantity) => {
    try {
      await updateCartItem(cartItemId, currentQuantity + 1);
      await loadData();
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setMessage("Failed to update quantity.");
    }
  };

  const handleDecrease = async (cartItemId, currentQuantity) => {
    try {
      if (currentQuantity === 1) {
        await deleteCartItem(cartItemId);
      } else {
        await updateCartItem(cartItemId, currentQuantity - 1);
      }
      await loadData();
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setMessage("Failed to update quantity.");
    }
  };

  const handleDelete = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      await loadData();
      setMessage("Item removed from cart.");
    } catch (error) {
      console.error("Failed to delete item:", error);
      setMessage("Failed to delete item.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Mini Shopping Cart</h1>
        <p>React + FastAPI + SQLite single-page shopping cart application</p>
      </header>

      <div className="search-bar">
      <input
        type="text"
       placeholder="Search products..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
      
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {message && <div className="message">{message}</div>}

      {loading ? (
        <p className="status-text">Loading...</p>
      ) : (
        <main className="main-layout">
          <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
          <Cart
            cartItems={cartItems}
            totalPrice={totalPrice}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onDelete={handleDelete}
          />
        </main>
      )}
    </div>
  );
}

export default App;