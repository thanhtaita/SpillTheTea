import { Link, Outlet } from "react-router-dom";
import { FaBeer, FaUserCircle } from "react-icons/fa";
const NavBar = () => {
  return (
    <div>
      <h1 className="title">SPILL.THETEA</h1>
      <nav className="navigation-bar">
        <Link to="/newpost">Create A Post</Link>
        <Link to="/">Home</Link>
        <Link>Contact</Link>
        <Link>Setting</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
