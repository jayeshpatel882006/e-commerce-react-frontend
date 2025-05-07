import { createContext, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { useAXiosApi } from "../App";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartNumber, setCartNumber] = useState(0);
  const { user } = useContext(UserContext);
  const API = useAXiosApi();

  const getCartNumber = () => {
    if (user.id !== 3) {
      API.get(`http://localhost:8080/cart/${user?.id}/getnum`).then((res) => {
        setCartNumber(res.data);
        // console.log(res.data);
      });
    }
  };

  return (
    <CartContext.Provider value={{ cartNumber, setCartNumber, getCartNumber }}>
      {children}
    </CartContext.Provider>
  );
};
