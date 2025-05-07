import React, { useContext, useEffect, useState } from "react";
import { useAXiosApi } from "../../App";
import { UserContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../../Methods/useCart";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const API = useAXiosApi();
  const { user } = useContext(UserContext);
  const { cartNumber, setCartNumber, getCartNumber } = useContext(CartContext);
  const cartoperation = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username === "default") {
      navigate("/");
    }

    getCart();
  }, [cartNumber]);

  const getCart = () => {
    getCartNumber();
    if (cartNumber === 0) {
      setCart([]);
      return;
    }
    const id = toast.loading("Loading Cart...", { isLoading: true });
    API.get(`http://localhost:8080/cart/${user.id}`).then((res) => {
      //   console.log(res.data);
      setCart(res.data);
      toast.isActive(id) && toast.dismiss(id);
      toast.update(id, {
        render: "Cart Loaded",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });
    });
  };

  const removefromCart = (cartid) => {
    cartoperation.removeFromCart(cartid).then((res) => {
      //   alert(res);
      getCart();
    });
  };

  return (
    <>
      <div className="cart dark:bg-gray-900 p-8 rounded-lg shadow-md m-5">
        {/* <h2 className="text-gray-200 text-xl font-bold">No Product Found</h2> */}
        <h1 className="text-gray-200 text-center font-extrabold text-2xl mb-5">
          Cart
        </h1>
        <div className="w-full flex flex-wrap  items-center flex-row justify-center bg-gray-800 p-4 m-2 rounded-lg shadow-md">
          {/* <h2 className="text-gray-200 text-xl font-bold">No Product Found</h2> */}
          {cartNumber !== 0 ? (
            cart.map((product) => (
              <div key={product.id}>
                <div className="flex w-80 flex-col items-center justify-center bg-gray-950 p-4 m-2 rounded-lg shadow-md">
                  <h2 className="text-gray-200 text-xl font-bold">
                    {product.product.name}
                  </h2>
                  <img
                    src={product.product.imgurl}
                    alt={product.product.name}
                    className="w-full h-48 object-contain rounded-lg mt-2"
                  />
                  <p className="text-gray-200 text-sm font-bold">
                    Price: {product.product.price} Rs
                  </p>
                  <p className="text-gray-200 text-sm font-bold">
                    Quantity: {product.quantity}
                  </p>
                  <div className="w-full flex justify-between items-center mt-4">
                    <button className="outline outline-1 text-sm hover:text-black hover:outline-0 hover:bg-teal-400 transition text-teal-400 outline-slate-100 p-1 rounded">
                      Edit Quantity
                    </button>
                    <button
                      onClick={() => removefromCart(product.id)}
                      className="outline outline-1 text-sm hover:text-black hover:outline-0 hover:bg-teal-400 transition text-teal-400 outline-slate-100 p-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-gray-200 text-xl font-bold">
              No Product Found Add from{" "}
              <Link to="/" className="text-teal-500">
                Home
              </Link>
            </h2>
          )}
        </div>
        {cart.length !== 0 && (
          <>
            <h2 className="text-gray-200 text-xl font-bold">
              Total Price:{" "}
              {cart.reduce(
                (acc, product) =>
                  acc + product.product.price * product.quantity,
                0
              )}{" "}
              Rs{" "}
            </h2>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
