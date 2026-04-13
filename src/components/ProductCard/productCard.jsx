import "./productCard.css";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
    const navigate = useNavigate();

    const image = product.gallery[0];
    const price = product.prices[0].amount.toFixed(2);
    const inStock = product.inStock;
    const testId = `product-${product.name.toLowerCase().replace(/\s+/g, '-')}`;

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleQuickShop = (e) => {
        e.stopPropagation();
        const defaults = {};
        product.attributes.forEach(attr => {
            if (attr.items.length > 0) {
                defaults[attr.name] = attr.items[0].value;
            }
        });
        addToCart(product, defaults);
    };

    return (
        <div
            className={`product-card ${!inStock ? "out-of-stock" : ""}`}
            data-testid={testId}
            onClick={handleCardClick}
        >
            <div className="product-image-wrapper">
                <img
                    className="product-card-image"
                    src={image}
                    alt={product.name}
                />
                {!inStock && (
                    <div className="out-of-stock-overlay">
                        OUT OF STOCK
                    </div>
                )}
                {inStock && (
                    <button className="quick-shop-btn" onClick={handleQuickShop}>
                        <HiOutlineShoppingCart />
                    </button>
                )}
            </div>
            <div className="product-card-details">
                <p>{product.name}</p>
                <p>${price}</p>
            </div>
        </div>
    );
};

export default ProductCard;