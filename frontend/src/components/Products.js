import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:1200/products", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setProducts(result);
  };

  console.log("@SN ", products);
  const handleDelete = async (id) => {
    let result = await fetch(`http://localhost:1200/products/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      alert("product deleted");
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1>Products List</h1>
      <ul>
        <li>Sr.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Action</li>
      </ul>
      {products.map((item, index) => {
        return (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              {" "}
              <button onClick={() => handleDelete(item._id)}>
                Delete
              </button>{" "}
            </li>
          </ul>
        );
      })}
    </div>
  );
};
export default Products;
