import { useEffect, useMemo, useRef, useState } from "react";
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
  const messageTimerRef = useRef(null);

  const showMessage = (text) => {
    setMessage(text);

    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }

    messageTimerRef.current = setTimeout(() => {
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

    return () => {
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current);
      }
    };
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return ["All", ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const matchSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleAddToCart = async (productId) => {
    try {
      const product = products.find((p) => p.id === productId);
      const cartItem = cartItems.find((item) => item.product.id === productId);

      if (!product) {
        showMessage("Product not found.");
        return;
      }

      const currentQuantity = cartItem ? cartItem.quantity : 0;

      if (currentQuantity >= product.stock) {
        showMessage("Cannot add more. Stock limit reached.");
        return;
      }

      await addToCart(productId, 1);
      await loadData();
      showMessage("Item added to cart.");
    } catch (error) {
      console.error("Failed to add item:", error);
      showMessage("Failed to add item.");
    }
  };

  const handleIncrease = async (cartItemId, currentQuantity) => {
    try {
      const cartItem = cartItems.find((item) => item.id === cartItemId);

      if (!cartItem) {
        showMessage("Cart item not found.");
        return;
      }

      const product = products.find((p) => p.id === cartItem.product.id);

      if (!product) {
        showMessage("Product not found.");
        return;
      }

      if (currentQuantity >= product.stock) {
        showMessage("Cannot add more. Stock limit reached.");
        return;
      }

      await updateCartItem(cartItemId, currentQuantity + 1);
      await loadData();
      showMessage("Quantity updated.");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      showMessage("Failed to update quantity.");
    }
  };

  const handleDecrease = async (cartItemId, currentQuantity) => {
    try {
      if (currentQuantity === 1) {
        await deleteCartItem(cartItemId);
        await loadData();
        showMessage("Item removed from cart.");
      } else {
        await updateCartItem(cartItemId, currentQuantity - 1);
        await loadData();
        showMessage("Quantity updated.");
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      showMessage("Failed to update quantity.");
    }
  };

  const handleDelete = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      await loadData();
      showMessage("Item removed from cart.");
    } catch (error) {
      console.error("Failed to delete item:", error);
      showMessage("Failed to delete item.");
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