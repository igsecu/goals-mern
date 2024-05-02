import logo from "../images/goals.png";

const Navbar = () => {
  return (
    <nav className="navbar p-3 text-white bg-dark">
      <div className="d-flex flex-justify-start align-items-center">
        <img src={logo} alt="logo" style={{ width: "50px" }} />
        <h1 className="mb-0">Goals</h1>
      </div>
    </nav>
  );
};

export default Navbar;
