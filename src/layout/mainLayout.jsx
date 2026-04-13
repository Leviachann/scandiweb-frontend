import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { useState } from 'react';

const MainLayout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);

    const increaseQuantity = (id, selectedOptions) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id &&
                JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQuantity = (id, selectedOptions) => {
        setCartItems(prev => {
            const found = prev.find(item =>
                item.id === id &&
                JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            );
            if (!found) return prev;
            if (found.quantity === 1) {
                return prev.filter(item =>
                    !(item.id === id &&
                    JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
                );
            }
            return prev.map(item =>
                item.id === id &&
                JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };

    const addToCart = (product, selectedOptions) => {
        const newItem = {
            ...product,
            price: product.prices[0].amount,
            selectedOptions,
            quantity: 1,
        };
        setCartItems(prev => {
            const found = prev.find(item =>
                item.id === product.id &&
                JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
            );
            if (found) {
                return prev.map(item =>
                    item.id === product.id &&
                    JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, newItem];
        });
        setCartOpen(true);
    };

    const clearCart = () => setCartItems([]);

    return (
        <>
            <Header
                cartItems={cartItems}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                clearCart={clearCart}
            />
            <Outlet context={{ addToCart }} />
        </>
    );
};

export default MainLayout;