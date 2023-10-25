import "./App.css";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import NavBar from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>Products</h1>} />
          <Route path="/add" element={<h1>Add Products</h1>} />
          <Route path="/update" element={<h1>Update Products</h1>} />
          <Route path="/logout" element={<h1>Logout Products</h1>} />
          <Route path="/profile" element={<h1>Profile Products</h1>} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
