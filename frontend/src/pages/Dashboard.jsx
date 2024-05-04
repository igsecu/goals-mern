import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import NavbarDashboard from "../components/NavbarDashboard";
import LowGoal from "../components/LowGoal";
import MediumGoal from "../components/MediumGoal";
import HighGoal from "../components/HighGoal";
import CompletedGoal from "../components/CompletedGoal";
import Spinner from "../components/Spinner";

import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const {
    user,
    loaded,
    setLoaded,
    low,
    postLow,
    medium,
    postMedium,
    high,
    postHigh,
    completed,
    postCompleted,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLow = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/goals/urgency/low", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const data = await res.json();

        if (data.statusCode === 200) {
          postLow(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchMedium = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/goals/urgency/medium",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        const data = await res.json();

        if (data.statusCode === 200) {
          postMedium(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchHigh = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/goals/urgency/high",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        const data = await res.json();

        if (data.statusCode === 200) {
          postHigh(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCompleted = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/goals/completed", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const data = await res.json();

        if (data.statusCode === 200) {
          postCompleted(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (loaded === false) {
      setLoading(true);
      fetchLow();
      fetchMedium();
      fetchHigh();
      fetchCompleted();
      setLoaded(true);
      setLoading(false);
    }
  }, [
    user.token,
    postCompleted,
    postHigh,
    postLow,
    postMedium,
    loaded,
    setLoaded,
  ]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div style={{ height: "750px" }}>
      <NavbarDashboard />
      <div className="d-flex justify-content-end pe-5 py-3 bg-dark">
        <Link
          to="/create-goal"
          className="d-flex align-items-center btn btn-success"
        >
          <FaPlus className="me-2" /> <span>CREATE NEW GOAL</span>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-fluid bg-dark h-100 p-4">
          <div className="row h-100">
            <div className="col-lg-3 col-md-6 overflow-scroll h-100 d-flex flex-column align-items-center">
              {typeof low === "string" ? (
                <p className="text-white">{low}</p>
              ) : (
                low?.map((g) => <LowGoal key={g._id} goal={g} />)
              )}
            </div>
            <div className="col-lg-3 col-md-6 overflow-scroll h-100">
              {typeof medium === "string" ? (
                <p className="text-white">{medium}</p>
              ) : (
                medium?.map((g) => <MediumGoal key={g._id} goal={g} />)
              )}
            </div>
            <div className="col-lg-3 col-md-6 overflow-scroll h-100">
              {typeof high === "string" ? (
                <p className="text-white">{high}</p>
              ) : (
                high?.map((g) => <HighGoal key={g._id} goal={g} />)
              )}
            </div>
            <div className="col-lg-3 col-md-6 overflow-scroll h-100">
              {typeof completed === "string" ? (
                <p className="text-white">{completed}</p>
              ) : (
                completed?.map((g) => <CompletedGoal key={g._id} goal={g} />)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
