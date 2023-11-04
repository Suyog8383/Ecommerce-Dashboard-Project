import { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { BASE_URL } from "../config/http/http.config";

const UpdateProduct = () => {
  const [proName, setProName] = useState("");
  const [proPrice, setPrice] = useState("");
  const [proCategory, setCategory] = useState("");
  const [proCompany, setCompany] = useState("");
  //   const [error, setError] = useState(false);
  const param = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch(`${BASE_URL}/updateProduct/${param.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log("@SN ", result);
    setProName(result.name);
    setCategory(result.category);
    setCompany(result.company);
    setPrice(result.price);
  };

  const updateProducts = async () => {
    let result = await fetch(`${BASE_URL}/product/${param.id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify({
        name: proName,
        price: proPrice,
        company: proCompany,
        category: proCategory,
      }),
    });
    result = await result.json();
    if (result) {
      alert("product updated successfully");
      navigation("/");
      setProName("");
      setCategory("");
      setCompany("");
      setPrice("");
    }
    console.log(result);
  };
  return (
    <div className="product">
      <h1>Update product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={proName}
        onChange={(e) => setProName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={proPrice}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={proCompany}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={proCategory}
        onChange={(e) => setCategory(e.target.value)}
      />

      <button className="SignUpbtn" onClick={updateProducts}>
        Update product
      </button>
    </div>
  );
};
export default UpdateProduct;
