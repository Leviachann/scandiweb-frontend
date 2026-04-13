import CategoryNav from "../CategoryNav/CategoryNav";
import CartOverlay from "../CartOverlay/CartOverlay";
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = ({ cartItems, increaseQuantity, decreaseQuantity, cartOpen, setCartOpen, clearCart }) => {
    return (
        <div className="header-container">
            <CategoryNav />
            <Link to="/"><img src={logo} className="main-logo" /></Link>
            <CartOverlay
                cartItems={cartItems}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                clearCart={clearCart}
            />
        </div>
    );
};
export default Header