import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAXiosApi } from "../../App";

const CategorySaprate = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const API = useAXiosApi();
  useEffect(() => {
    API.get(`http://localhost:8080/category/${id}`)
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="category-all m-5 dark:bg-gray-900 p-8 rounded-lg shadow-md">
      <h1 className="text-gray-200 text-center text-2xl mb-5">
        {category.name}
      </h1>
      {category.products?.length !== 0 ? (
        <>
          <h2 className="text-gray-200 text-sm text-center ">
            All Products OF {category.name}
          </h2>

          <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 gap-4 m-auto w-full max-w-screen-lg ">
            {category.products?.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className=" w-full flex flex-col items-center justify-center bg-gray-800 p-4 m-2 rounded-lg shadow-md"
              >
                <h2 className="text-gray-200 text-xl font-bold">
                  {product.name}
                </h2>
                <img
                  src={product.imgurl}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded-lg mt-2"
                />
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="text-gray-200 text-center text-xl">
          No Products Found for this Category{" "}
          <Link to="/all-category" className="text-green-700 font-bold text-lg">
            Go To All Category
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategorySaprate;
