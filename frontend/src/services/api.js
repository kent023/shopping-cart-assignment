import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getProducts = () => API.get("/products");
export const getCartItems = () => API.get("/cart");

export const addToCart = (productId, quantity = 1) =>
  API.post("/cart", {
    product_id: productId,
    quantity,
  });

export const updateCartItem = (cartItemId, quantity) =>
  API.put(`/cart/${cartItemId}`, {
    quantity,
  });

export const deleteCartItem = (cartItemId) =>
  API.delete(`/cart/${cartItemId}`);