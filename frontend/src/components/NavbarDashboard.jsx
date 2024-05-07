import React from "react";

import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../images/goals.png";
import { FaCircle, FaCheck } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const NavbarDashboard = ({
  setShowLow,
  setShowMedium,
  setShowHigh,
  setShowCompleted,
}) => {
  const {
    logout,
    user,
    setLoaded,
    postLow,
    postMedium,
    postHigh,
    postCompleted,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logoutUser = () => {
    localStorage.removeItem("user");
    logout();
    setLoaded(false);
    postLow([]);
    postMedium([]);
    postHigh([]);
    postCompleted([]);
    navigate("/login");
  };

  const showLowGoals = () => {
    setShowLow(true);
    setShowMedium(false);
    setShowHigh(false);
    setShowCompleted(false);
  };
  const showMediumGoals = () => {
    setShowLow(false);
    setShowMedium(true);
    setShowHigh(false);
    setShowCompleted(false);
  };
  const showHighGoals = () => {
    setShowLow(false);
    setShowMedium(false);
    setShowHigh(true);
    setShowCompleted(false);
  };
  const showCompletedGoals = () => {
    setShowLow(false);
    setShowMedium(false);
    setShowHigh(false);
    setShowCompleted(true);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 text-white">
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

        <div className="collapse navbar-collapse" id="navmenu">
          <div className="navbar-nav ms-auto">
            {location.pathname !== "/create-goal" && (
              <div className="d-block d-lg-none border-bottom border-1 p-2 mb-2">
                <li className="nav-item">
                  <div
                    className="nav-link text-white d-flex justify-content-center align-items-center"
                    onClick={showLowGoals}
                    style={{ cursor: "pointer" }}
                  >
                    <FaCircle className="text-success me-2" />
                    <p className="mb-0">Low Urgency Goals</p>
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link text-white d-flex justify-content-center align-items-center"
                    onClick={showMediumGoals}
                    style={{ cursor: "pointer" }}
                  >
                    <FaCircle className="text-warning me-2" />
                    <p className="mb-0">Medium Urgency Goals</p>
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link text-white d-flex justify-content-center align-items-center"
                    onClick={showHighGoals}
                    style={{ cursor: "pointer" }}
                  >
                    <FaCircle className="text-danger me-2" />
                    <p className="mb-0">High Urgency Goals</p>
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link text-white d-flex justify-content-center align-items-center"
                    onClick={showCompletedGoals}
                    style={{ cursor: "pointer" }}
                  >
                    <FaCheck className="text-primary me-2" />
                    <p className="mb-0">Completed Goals</p>
                  </div>
                </li>
              </div>
            )}

            <div className="d-none d-lg-block d-flex align-items-center p-2 dropdown">
              <div
                className="d-flex align-items-center"
                data-bs-toggle="dropdown"
                style={{ cursor: "pointer" }}
              >
                <h5 className="mb-0 ">Hello, {user?.name}!</h5>
              </div>
              <div className="dropdown-menu border-0 rounded-0 bg-dark dropmenu">
                <div
                  className="text-white d-flex align-items-center ps-3"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={logoutUser}
                >
                  <MdLogout />
                  <span className="mb-0 ms-2">Logout</span>
                </div>
              </div>
            </div>

            <div className="d-block d-lg-none d-flex flex-column align-items-center p-2 justify-content-center">
              <div
                className="d-flex align-items-center"
                data-bs-toggle="dropdown"
                style={{ cursor: "pointer" }}
              >
                <h5 className="mb-0 ">Hello, {user?.name}!</h5>
              </div>

              <div
                className="mt-3 text-white d-flex justify-content-center align-items-center"
                style={{ cursor: "pointer" }}
                onClick={logoutUser}
              >
                <MdLogout />
                <p className="mb-0 ms-2">Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
