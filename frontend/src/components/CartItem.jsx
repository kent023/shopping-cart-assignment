function CartItem({ item, onIncrease, onDecrease, onDelete }) {
  const subtotal = item.product.price * item.quantity;

  return (
    <div className="cart-item">
      <div>
        <h4>{item.product.name}</h4>
        <p>${item.product.price.toFixed(2)} each</p>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
      </div>

      <div className="cart-actions">
        <button className="qty-button" onClick={() => onDecrease(item.id, item.quantity)}>-</button>
        <span>{item.quantity}</span>
        <button className="qty-button" onClick={() => onIncrease(item.id, item.quantity)}>+</button>
        <button className="delete-button" onClick={() => onDelete(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;