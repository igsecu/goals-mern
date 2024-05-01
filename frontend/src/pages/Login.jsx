import logo from "../images/goals.png";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="vh-100 bg-black">
      <Navbar />
      <div className="h-75 d-flex justify-content-center align-items-center">
        {loading ? (
          <Spinner />
        ) : (
          <div className="border border-2 rounded border-secondary bg-dark d-flex align-items-center py-5">
            <div className="px-5">
              <h1 className="text-white mb-5 text-center">Log in</h1>
              <form onSubmit={onSubmit}>
                <div className="mb-3 d-flex align-items-center">
                  <MdEmail className="text-white me-3 fs-3" />
                  <input
                    type="email"
                    className="form-control bg-dark text-white"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <RiLockPasswordFill className="text-white me-3 fs-3 " />
                  <input
                    type="password"
                    className="form-control bg-dark text-white"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                  {show ? (
                    <div
                      className="alert alert-danger text-center p-1 w-100"
                      role="alert"
                    >
                      {message}!
                    </div>
                  ) : (
                    <></>
                  )}
                  <button type="submit" className="btn btn-success w-100">
                    Log In
                  </button>

                  <Link
                    to="/register"
                    className="text-decoration-none text-white mt-3 border-top border-1 w-100 pt-2 text-center"
                  >
                    <small className="fw-bold">
                      You do not have an account?
                    </small>
                  </Link>
                </div>
              </form>
            </div>
            <div>
              <img className="d-none d-lg-block" src={logo} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
