import { GlobalContext } from "../context/GlobalState";
import { useContext, useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import NavbarDashboard from "../components/NavbarDashboard";
import Spinner from "../components/Spinner";

import { FaArrowLeft } from "react-icons/fa";

const CreateGoal = () => {
  const { user, setLoaded } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("");

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const goal = {
      title,
      description,
      urgency,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(goal),
      });

      const data = await res.json();

      if (data.statusCode === 201) {
        setLoaded(false);
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
    <div style={{ height: "750px" }}>
      <NavbarDashboard />
      <div className="d-flex justify-content-center align-items-start bg-dark h-100">
        {loading ? (
          <Spinner />
        ) : (
          <div
            className="bg-dark d-flex flex-column w-100 mt-5"
            style={{ maxWidth: "1000px" }}
          >
            <Link
              to="/"
              className="d-none d-md-block d-flex align-items-center text-decoration-none text-dark ms-5"
            >
              <FaArrowLeft className="me-2 text-white fs-5" />
              <span className="text-white fs-5">Back to DashBoard</span>
            </Link>
            <div className="p-5">
              <div className="w-100">
                <h1 className="text-white mb-3 text-center">Create New Goal</h1>
                <form onSubmit={onSubmit}>
                  <div className="mb-3 d-flex flex-column">
                    <label className="form-label text-white fw-bold">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white fw-bold">
                      Description
                    </label>
                    <textarea
                      className="form-control bg-dark text-white"
                      rows="5"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="mt-3">
                    <select className="form-select text-white bg-dark fw-bold">
                      <option value="" id="temperament_title">
                        Choose Urgency
                      </option>

                      <option onClick={() => setUrgency("LOW")}>LOW</option>
                      <option onClick={() => setUrgency("MEDIUM")}>
                        MEDIUM
                      </option>
                      <option onClick={() => setUrgency("HIGH")}>HIGH</option>
                    </select>
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
                      Create Goal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGoal;
