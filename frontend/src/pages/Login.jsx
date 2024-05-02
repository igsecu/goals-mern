import logo from "../images/goals.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";

const Login = () => {
  const { register } = useContext(GlobalContext);
  const navigate = useNavigate();

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
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.data, token: data.token })
        );
        register({ ...data.data, token: data.token });
        navigate("/");
      } else {
        setMessage(data.msg);
        setShow(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="vh-100 bg-dark">
      <Navbar />
      <div className="h-75 d-flex justify-content-center align-items-center">
        {loading ? (
          <Spinner />
        ) : (
          <div
            className="bg-dark d-flex align-items-center py-5"
            style={{ maxWidth: "1000px" }}
          >
            <div className="px-0 px-md-5 w-100">
              <h1 className="text-white mb-5 text-center">Login</h1>
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
