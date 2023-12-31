import "./App.css";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import NavBar from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateComp from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import UpdateProduct from "./components/UpdateComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path="/" element={<Products />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Products</h1>} />
            <Route path="/profile" element={<h1>Profile Products</h1>} />
          </Route>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
