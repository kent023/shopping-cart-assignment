function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img
  src={product.image_url || "https://picsum.photos/200"}
  alt={product.name}
  className="product-image"
/>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="category">{product.category}</p>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="stock">Stock: {product.stock}</p>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;