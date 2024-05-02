import React from "react";

import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../images/goals.png";
import { FaCircleUser } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const NavbarDashboard = () => {
  const { logout, user } = useContext(GlobalContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("user");
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md bg-dark navbar-dark py-3 text-white ">
      <div className="container-fluid">
        <div className="d-flex flex-justify-start align-items-center">
          <img src={logo} alt="logo" style={{ width: "50px" }} />
          <h1 className="mb-0">Goals</h1>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navmenu">
          <ul className="navbar-nav ms-auto">
            <div className="d-block d-md-none border-bottom border-1 p-2 mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link text-white d-flex justify-content-center align-items-center"
                  to=""
                >
                  <FaCircle className="text-success me-2" />
                  <p className="mb-0">Low Urgency Goals</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white d-flex justify-content-center align-items-center"
                  to=""
                >
                  <FaCircle className="text-warning me-2" />
                  <p className="mb-0">Medium Urgency Goals</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white d-flex justify-content-center align-items-center"
                  to=""
                >
                  <FaCircle className="text-danger me-2" />
                  <p className="mb-0">High Urgency Goals</p>
                </Link>
              </li>
            </div>

            <div className="d-none d-md-block d-flex flex-column align-items-center p-2 justify-content-center dropdown">
              <div
                className=" d-flex align-items-center"
                data-bs-toggle="dropdown"
                style={{ cursor: "pointer" }}
              >
                {user.image ? (
                  <img
                    className="rounded-circle"
                    src={user.image}
                    alt="user"
                    style={{ width: "25px", height: "25px" }}
                  />
                ) : (
                  <FaCircleUser
                    style={{ width: "25px", height: "25px" }}
                    className="me-2"
                  />
                )}
                <h5 className="mb-0 ">{user.name}</h5>
              </div>
              <ul className="dropdown-menu border-0 bg-dark rounded-0">
                <li>
                  <Link
                    className="text-white text-decoration-none d-flex align-items-center ps-3 mb-3"
                    to=""
                  >
                    <ImProfile />
                    <p className="mb-0 ms-2">Profile</p>
                  </Link>
                </li>
                <li>
                  <div
                    className="text-white d-flex align-items-center ps-3 pb-2"
                    style={{ cursor: "pointer" }}
                    onClick={logoutUser}
                  >
                    <MdLogout />
                    <p className="mb-0 ms-2">Logout</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="d-block d-md-none d-flex flex-column align-items-center p-2 justify-content-center">
              <div
                className="d-flex align-items-center"
                data-bs-toggle="dropdown"
                style={{ cursor: "pointer" }}
              >
                {user.image ? (
                  <img
                    className="rounded-circle"
                    src={user.image}
                    alt="user"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : (
                  <FaCircleUser
                    style={{ width: "20px", height: "20px" }}
                    className="me-2"
                  />
                )}
                <h5 className="mb-0 ">{user.name}</h5>
              </div>

              <Link
                className="text-white text-decoration-none d-flex justify-content-start align-items-center my-3"
                to=""
              >
                <ImProfile />
                <p className="mb-0 ms-2">Profile</p>
              </Link>

              <div
                className="text-white d-flex justify-content-center align-items-center"
                style={{ cursor: "pointer" }}
                onClick={logoutUser}
              >
                <MdLogout />
                <p className="mb-0 ms-2">Logout</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
