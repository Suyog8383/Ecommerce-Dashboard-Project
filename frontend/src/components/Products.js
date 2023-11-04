import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config/http/http.config";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch(`${BASE_URL}/products`, {
      method: "get",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  console.log("@SN ", products);
  const handleDelete = async (id) => {
    let result = await fetch(`${BASE_URL}/products/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("product deleted");
      getProducts();
    }
  };
  const handleChange = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`${BASE_URL}/search/${key}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h2>Products List</h2>
      <input
        type="text"
        placeholder="Search here"
        className="searchProductBox"
        onChange={handleChange}
      />
      <ul>
        <li>Sr.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Action</li>
      </ul>
      {products.length > 0 ? (
        <>
          {products.map((item, index) => {
            return (
              <ul key={item._id}>
                <li>{index + 1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                  <Link to={`/update/${item._id}`}>Update</Link>
                </li>
              </ul>
            );
          })}
        </>
      ) : (
        <>
          <p>No results found</p>
        </>
      )}
    </div>
  );
};
export default Products;
