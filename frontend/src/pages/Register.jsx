import logo from "../images/goals.png";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";

const Register = () => {
  const { register } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      password2,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (data.statusCode === 201) {
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
              <h1 className="text-white mb-5 text-center">Sign Up</h1>
              <form onSubmit={onSubmit}>
                <div className="mb-3 d-flex align-items-center">
                  <FaUser className="text-white me-3 fs-3" />
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <MdEmail className="text-white me-3 fs-3" />
                  <input
                    type="text"
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
                <div className="mb-3 d-flex align-items-center">
                  <FaKey className="text-white me-3 fs-3" />
                  <input
                    type="password"
                    className="form-control bg-dark text-white"
                    placeholder="Repeat your password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
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
                    Register
                  </button>

                  <Link
                    to="/login"
                    className="text-decoration-none text-white mt-3 border-top border-1 w-100 pt-2 text-center"
                  >
                    <small className="fw-bold">Already have an account?</small>
                  </Link>
                </div>
              </form>
            </div>
            <div>
              <img
                className="d-none d-md-block"
                src={logo}
                alt=""
                style={{ width: "300px" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
