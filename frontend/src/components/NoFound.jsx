import { FaExclamation, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const NoFound = ({ text }) => {
  return (
    <div
      className="text-center bg-dark d-flex flex-column align-items-center justify-content-center"
      style={{ height: "650px" }}
    >
      <FaExclamation className="text-danger fs-1 mb-1" />
      <h5 className="text-white">You do not have goals yet!</h5>
      <p className="fw-bold">{text}</p>
      <Link
        to="/create-goal"
        className="d-flex align-items-center btn btn-success"
      >
        <FaPlus className="me-2" /> <span>NEW GOAL</span>
      </Link>
    </div>
  );
};

export default NoFound;
