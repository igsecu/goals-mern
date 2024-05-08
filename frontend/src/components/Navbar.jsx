import logo from "../images/goals.png";

const Navbar = () => {
  return (
    <nav className="navbar p-3 text-white bg-dark">
      <div className="d-flex flex-justify-start align-items-center">
        <img src={logo} alt="logo" style={{ width: "40px" }} />
        <h2 className="mb-0">
          Goals<span className="text-danger">Manager</span>
        </h2>
      </div>
    </nav>
  );
};

export default Navbar;
