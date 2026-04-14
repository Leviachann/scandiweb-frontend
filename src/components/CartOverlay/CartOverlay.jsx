import { HiOutlineShoppingCart } from "react-icons/hi";
import CartItem from '../CartItem/CartItem';
import './CartOverlay.css';
import { graphqlFetch } from '../../utils/graphql';
const CartOverlay = ({ cartItems = [], increaseQuantity, decreaseQuantity, cartOpen, setCartOpen, clearCart }) => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemLabel = totalItems === 1 ? '1 Item' : `${totalItems} Items`;

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) return;

        const mutation = `
        mutation CreateOrder($items: [OrderItemInput!]!) {
            createOrder(items: $items)
        }
    `;

        const items = cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            selectedAttributes: JSON.stringify(item.selectedOptions ?? {})
        }));

        try {
            const res = await graphqlFetch(mutation, { items });
            if (res.data?.createOrder) {
                clearCart();
                setCartOpen(false);
            } else {
                console.error('Order failed', res);
            }
        } catch (err) {
            console.error('Order error', err);
        }
    };

 return (
    <>
        <div className="cart-wrapper">
            <button
                className="cart-btn"
                data-testid="cart-btn"
                onClick={() => setCartOpen(!cartOpen)}
            >
                <HiOutlineShoppingCart />
                {totalItems > 0 && (
                    <span className="cart-bubble">{totalItems}</span>
                )}
            </button>
            <div 
                className={`cart-overlay-container ${cartOpen ? 'show' : 'hide'}`} 
                data-testid="cart-overlay"
            >
                {cartOpen && (
                    <div className="inside-cart">
                        <p className="cart-heading">
                            <strong>My Bag</strong>, {itemLabel}
                        </p>

                        <div className="cart-items-list">
                            {cartItems.map((item, index) => (
                                <CartItem
                                    key={`${item.id}-${JSON.stringify(item.selectedOptions)}-${index}`}
                                    item={item}
                                    increaseQuantity={increaseQuantity}
                                    decreaseQuantity={decreaseQuantity}
                                />
                            ))}
                        </div>

                        <div className="cart-total-row">
                            <span className="cart-total-label">Total</span>
                            <span className="cart-total-amount" data-testid="cart-total">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>

                        <button
                            className={`place-order-btn ${totalItems === 0 ? 'place-order-btn-disabled' : ''}`}
                            disabled={totalItems === 0}
                            onClick={() => handlePlaceOrder()}
                            data-testid="place-order-btn"
                        >
                            PLACE ORDER
                        </button>
                    </div>
                )}
            </div>
        </div>

        {cartOpen && (
            <div className="cart-backdrop" onClick={() => setCartOpen(false)} />
        )}
    </>
);
};

export default CartOverlay;