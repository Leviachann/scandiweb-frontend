import './CartItem.css';

const toKebab = (str) => str.toLowerCase().replace(/\s+/g, '-');

const CartItem = ({ item, increaseQuantity, decreaseQuantity }) => {
    const { id, name, price, attributes, selectedOptions, gallery, quantity } = item;

    return (
        <div className="cart-item">
            <div className="cart-item-left">
                <p className="cart-item-name">{name}</p>
                <p className="cart-item-price">${price.toFixed(2)}</p>

                {attributes && attributes.map(attr => {
                    const attrKebab = toKebab(attr.name);
                    const selectedValue = selectedOptions?.[attr.name];

                    return (
                        <div
                            key={attr.id}
                            className="cart-item-attribute"
                            data-testid={`cart-item-attribute-${attrKebab}`}
                        >
                            <p className="cart-item-attr-label">{attr.name}:</p>
                            <div className="cart-item-options">
                                {attr.items.map(item => {
                                    const itemKebab = toKebab(item.value);
                                    const isSelected = item.value === selectedValue;
                                    const testId = isSelected
                                        ? `cart-item-attribute-${attrKebab}-${itemKebab}-selected`
                                        : `cart-item-attribute-${attrKebab}-${itemKebab}`;

                                    return attr.type === 'swatch' ? (
                                        <button
                                            key={item.id}
                                            disabled
                                            className={`cart-item-swatch ${isSelected ? 'cart-item-swatch-selected' : ''}`}
                                            style={{ backgroundColor: item.value }}
                                            data-testid={testId}
                                        />
                                    ) : (
                                        <button
                                            key={item.id}
                                            disabled
                                            className={`cart-item-option ${isSelected ? 'cart-item-option-selected' : ''}`}
                                            data-testid={testId}
                                        >
                                            {item.display_value}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="cart-item-right">
                <div className="cart-item-controls">
                    <button
                        className="cart-qty-btn"
                        data-testid="cart-item-amount-increase"
                        onClick={() => increaseQuantity(id, selectedOptions)}
                    >
                        +
                    </button>
                    <span className="cart-qty-value" data-testid="cart-item-amount">
                        {quantity}
                    </span>
                    <button
                        className="cart-qty-btn"
                        data-testid="cart-item-amount-decrease"
                        onClick={() => decreaseQuantity(id, selectedOptions)}
                    >
                        −
                    </button>
                </div>
                <img
                    src={gallery?.[0]}
                    alt={name}
                    className="cart-item-image"
                />
            </div>
        </div>
    );
};

export default CartItem;
