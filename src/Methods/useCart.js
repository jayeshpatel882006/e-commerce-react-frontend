import { useContext } from "react";
import { useAXiosApi } from "../App";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";
import { toast } from "react-toastify";

const useCart = () => {
  const API = useAXiosApi();
  const { user } = useContext(UserContext);
  const { getCartNumber } = useContext(CartContext);
  const userId = user.id;

  const addToCart = async (productId) => {
    if (
      user.username === "default" ||
      userId === null ||
      userId === undefined
    ) {
      // alert("Login First");
      toast.error("Login First");
      return;
    } else {
      try {
        const id = toast.loading("Adding product to cart", {
          isLoading: true,
        });

        const response = await API.post(
          `http://localhost:8080/cart?quantity=${2}&prodid=${productId}&userid=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        //   console.log("Product added to cart:", response.data);
        toast.update(id, {
          render: "Product added to cart",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        getCartNumber();
        return response.data;
      } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
      }
    }
  };

  const removeFromCart = async (cartid) => {
    if (
      user.username === "default" ||
      userId === null ||
      userId === undefined
    ) {
      alert("Login First");
      return;
    } else {
      try {
        // Example progress value (0 to 1)
        // toast.info("Product removed from cart", { progress, isLoading: true });
        const id = toast.loading("Removing product from cart", {
          isLoading: true,
        });
        const res = await API.delete(`http://localhost:8080/cart/${cartid}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.update(id, {
          render: "Product removed from cart",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        getCartNumber();
        return res.data;
      } catch (error) {
        console.error("Error Removing from cart:", error);
        throw error;
      }
    }
  };

  return { addToCart, removeFromCart };
};

export default useCart;
