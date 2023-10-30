import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    let result = await fetch("http://localhost:1200/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.data.user.name) {
      localStorage.setItem("users", JSON.stringify(result));
      navigate("/");
    }
    console.log("@SN ", result);
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Email"
        value={email}
        onChange={(text) => setEmail(text.target.value)}
      />
      <input
        type="password"
        className="inputBox"
        placeholder="Enter Password"
        value={password}
        onChange={(text) => setPassword(text.target.value)}
      />
      <button className="SignUpbtn" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
export default Login;
