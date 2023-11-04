import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const auth = localStorage.getItem("users");
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/signUp");
  };
  return (
    <div>
      <img
        className="logo"
        src="https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?w=740&t=st=1698650757~exp=1698651357~hmac=02f9db276cd60491576a624955d329ea51bafd2292e40cd08f37263ba2c20abc"
        alt="logo"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to="/update">Update Products</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logOut} to="/signUp">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signUp">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
