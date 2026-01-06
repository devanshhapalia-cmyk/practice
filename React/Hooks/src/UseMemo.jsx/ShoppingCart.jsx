    import { useMemo, useState } from "react";

    const initialCart = [
    { id: 1, name: "Laptop", price: 60000, qty: 1 },
    { id: 2, name: "Mouse", price: 1000, qty: 2 },
    { id: 3, name: "Keyboard", price: 3000, qty: 1 },
    ];

    export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState(initialCart);
    const [theme, setTheme] = useState("light"); // unrelated state

    //    useMemo: expensive derived calculation
    const totalPrice = useMemo(() => {
        console.log("Calculating total...");
        return cartItems.reduce(
        (total, item) => total + item.price * item.qty,
        0
        );
    }, [cartItems]);

    const increaseQty = (id) => {
        setCartItems((items) =>
        items.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
        );
    };

    return (
        <div style={{ padding: 20 }}>
        <h2>🛒 Shopping Cart</h2>

        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Toggle Theme ({theme})
        </button>

        <ul>
            {cartItems.map((item) => (
            <li key={item.id}>
                {item.name} - ₹{item.price} × {item.qty}
                <button onClick={() => increaseQty(item.id)}>+</button>
            </li>
            ))}
        </ul>

        <h3>Total: ₹{totalPrice}</h3>
        </div>
    );
    }
