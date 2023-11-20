import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext({
    cart: [],
    addToCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    updateCart: () => { },
});

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ defaultValue = [], children }) => {
    const [cart, setCart] = useState(defaultValue);

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateCart = (updatedCart) => {
        setCart(updatedCart);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                updateCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;