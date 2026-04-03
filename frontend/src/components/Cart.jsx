import CartItem from "./CartItem";

function Cart({ cartItems, totalPrice, onIncrease, onDecrease, onDelete }) {
  return (
    <aside className="cart-section">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onDelete={onDelete}
              />
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-button">Checkout (Demo Only)</button>
          </div>
        </>
      )}
    </aside>
  );
}

export default Cart;