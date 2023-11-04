import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/http/http.config";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleSignUp = async () => {
    console.log(name, email, password);
    let result = await fetch(`${BASE_URL}/register`, {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("users", JSON.stringify(result.data.result));
    localStorage.setItem("token", JSON.stringify(result.token.token));
    console.log(result);
    navigate("/");
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        value={name}
        className="inputBox"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={email}
        className="inputBox"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        className="inputBox"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="SignUpbtn" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
