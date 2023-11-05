import { useState } from "react";
import { BASE_URL } from "../config/http/http.config";

const AddProduct = () => {
  const [proName, setProName] = useState("");
  const [proPrice, setPrice] = useState("");
  const [proCategory, setCategory] = useState("");
  const [proCompany, setCompany] = useState("");
  const [error, setError] = useState(false);

  const addProducts = async () => {
    let user = localStorage.getItem("users");
    let userId = JSON.parse(user)._id;

    if (!proName || !proPrice || !proCategory || !proCompany) {
      setError(true);
      return;
    }

    let result = await fetch(`${BASE_URL}/add-product`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify({
        name: proName,
        price: proPrice,
        company: proCompany,
        category: proCategory,
        userId: userId,
      }),
    });
    result = await result.json();
    if (result) {
      alert("product added successfully");
      setProName("");
      setCategory("");
      setCompany("");
      setPrice("");
    }
    console.log(result);
  };
  return (
    <div className="product">
      <h1>Add product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={proName}
        onChange={(e) => setProName(e.target.value)}
      />
      {error && !proName && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={proPrice}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !proPrice && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={proCompany}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !proCompany && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={proCategory}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !proCategory && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <button className="SignUpbtn" onClick={addProducts}>
        Add product
      </button>
    </div>
  );
};
export default AddProduct;
