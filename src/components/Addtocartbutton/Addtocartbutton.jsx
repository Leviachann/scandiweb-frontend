import './AddToCartButton.css';

const AddToCartButton = ({ onClick, disabled }) => {
    return (
        <button
            className={`add-to-cart-btn ${disabled ? 'add-to-cart-btn-disabled' : ''}`}
            onClick={onClick}
            disabled={disabled}
            data-testid="add-to-cart"
        >
            ADD TO CART
        </button>
    );
};

export default AddToCartButton;