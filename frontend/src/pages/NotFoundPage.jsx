import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="section text-center bg-dark">
      <div className="container vh-100 d-flex flex-column align-items-center justify-content-center">
        <FaExclamationTriangle className="text-warning fs-1 mb-1" />
        <h1 style={{ fontSize: "48px" }} className="text-white">
          404 Not Found
        </h1>
        <p className="fw-bold text-white">This page does not exist!</p>
        <Link to="/" className="btn btn-success">
          Go Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
