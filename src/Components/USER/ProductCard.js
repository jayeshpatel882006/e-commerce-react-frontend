import { Link } from "react-router-dom";
import useAddToCart from "../../Methods/useCart";

const ProductCard = ({ product }) => {
  const addToCart = useAddToCart();
  const handalAddToCart = (id) => {
    // console.log(id);
    addToCart.addToCart(id);
  };

  const tempimg =
    "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121032-iphone-16-pro-max.png";
  return (
    <div className="bg-gray-700 shadow-md rounded-lg p-4 m-4 w-64">
      <Link
        className="font-thin text-sm"
        to={`/all-category/category/${product.category?.id}`}
      >
        {product.category?.name}
      </Link>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imgurl == null ? tempimg : product.imgurl}
          alt={product.name}
          className="w-[250px] h-[250px]  object-contain rounded-t-lg"
        ></img>
      </Link>
      {/* <p className="text-xs mt-2 text-gray-500">{product.category.name}</p> */}
      <Link
        to={`/product/${product.id}`}
        className="text-xl text-gray-200 font-semibold "
      >
        {product.name}
      </Link>
      <p className="text-gray-400">
        {product.description.length > 15
          ? product.description.slice(0, 15) + "..."
          : product.description}
      </p>
      <p className="text-lg font-bold text-green-600">${product.price}</p>
      <button
        onClick={() => handalAddToCart(product.id)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};
export default ProductCard;
