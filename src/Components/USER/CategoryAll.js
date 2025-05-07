import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAXiosApi } from "../../App";

const CategoryAll = () => {
  const [category, setCategory] = useState([]);

  const API = useAXiosApi();

  useEffect(() => {
    API.get("http://localhost:8080/category")
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="category-all m-5 dark:bg-gray-900   p-8 rounded-lg shadow-md">
      <h1 className="text-gray-400 text-center text-2xl mb-5">Category All</h1>

      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 gap-4 m-auto w-full max-w-screen-lg ">
        {category.map((category) => (
          <Link
            to={`category/${category.id}`}
            key={category.id}
            className=" w-full flex flex-col items-center justify-center bg-gray-800 p-4 m-2 rounded-lg shadow-md"
          >
            <h2 className="text-gray-200 text-xl font-bold">
              {category.id}
              {category.name}({category.productCount})
            </h2>
            {/* <img src={category.imgurl} alt={category.name} className="w-full h-48 object-cover rounded-lg mt-2" /> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryAll;
