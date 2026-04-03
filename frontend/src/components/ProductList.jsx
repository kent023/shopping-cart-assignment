import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
  return (
    <section className="products-section">
      <h2>Products</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ProductList;