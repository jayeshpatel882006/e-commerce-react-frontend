import { useState } from "react";
import { useAXiosApi } from "../../App";

const AddProduct = () => {
  const API = useAXiosApi();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imgurl: "",
    category: {
      id: -1,
    },
  });

  const categoryList = [
    {
      id: 1,
      name: "Electronics",
    },
    {
      id: 2,
      name: "Furniture",
    },
    {
      id: 3,
      name: "Fashion",
    },
    {
      id: 4,
      name: "Home Appliances",
    },
    {
      id: 5,
      name: "Books",
    },
    {
      id: 6,
      name: "Sports",
    },
    {
      id: 7,
      name: "Beauty & Personal Care",
    },
    {
      id: 8,
      name: "Toys & Games",
    },
    {
      id: 9,
      name: "Automotive",
    },
    {
      id: 0,
      name: "NONE",
    },
    {
      id: -1,
      name: "Select Category",
    },
  ];

  const handalSubmit = (e) => {
    e.preventDefault();
    if (
      formData.category.id === -1 ||
      formData.name === "" ||
      formData.description === "" ||
      formData.price === "" ||
      formData.imgurl === ""
    ) {
      alert("Fill All Details");
      return;
    }
    console.log(formData);

    API.post("http://localhost:8080/product", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        setFormData({
          name: "",
          description: "",
          price: "",
          imgurl: "",
        });
        alert("Product added successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Product not added successfully");
      });

    setFormData({
      name: "",
      description: "",
      price: "",
      imgurl: "",
      category: {
        id: -1,
      },
    });
  };

  return (
    <div className="max-w-md mx-auto dark:bg-gray-900 my-5  p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Add Product</h2>
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-300 font-medium mb-2"
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-300 font-medium mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-300 font-medium mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4  ">
          <div>
            <label
              className=" text-gray-300 font-medium mb-2 flex items-center"
              htmlFor="imgurl"
            >
              Image URL{" "}
              <p className="font-bold text-xs">
                (Add PNG File for better experience)
              </p>
            </label>
            <input
              type="text"
              id="imgurl"
              value={formData.imgurl}
              onChange={(e) =>
                setFormData({ ...formData, imgurl: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter image URL"
            />
          </div>
          {formData.imgurl && (
            <div className="mt-4 flex justify-center items-center">
              <img
                src={formData.imgurl}
                alt="Product Preview"
                className="mt-4 w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            value={formData.category.id}
            onChange={(e) =>
              setFormData({ ...formData, category: { id: e.target.value } })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {/* <option key="categoryDefault" value="">
              Select category
            </option> */}
            {categoryList.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>
        <button
          // type="submit"
          onClick={(e) => handalSubmit(e)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};
export default AddProduct;
