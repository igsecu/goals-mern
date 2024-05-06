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
  const [process, setProcess] = useState(0);

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

  useEffect(() => {
    const totalGoals =
      low?.length + medium?.length + high?.length + completed?.length;

    setProcess(((completed?.length * 100) / totalGoals).toFixed(0));
  }, [low, medium, high, completed]);

  return (
    <div style={{ minHeight: "750px" }}>
      <NavbarDashboard />
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center px-5 py-3 bg-dark">
        <div
          className="progress w-75 mb-3 mb-lg-0"
          role="progressbar"
          aria-label="Example with label"
        >
          <div className="progress-bar" style={{ width: `${process}%` }}>
            {process}%
          </div>
        </div>
        <Link
          to="/create-goal"
          className="d-flex align-items-center btn btn-success"
        >
          <FaPlus className="me-2" /> <span>NEW GOAL</span>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-fluid bg-dark h-100 p-4">
          <div className="row h-100">
            <div
              className="col-lg-3 overflow-scroll d-flex flex-column align-items-center"
              style={{ maxHeight: "650px" }}
            >
              {typeof low === "string" ? (
                <p className="text-white">{low}</p>
              ) : (
                low?.map((g) => <LowGoal key={g._id} goal={g} />)
              )}
            </div>
            <div
              className="col-lg-3 overflow-scroll h-100 d-flex flex-column align-items-center"
              style={{ maxHeight: "650px" }}
            >
              {typeof medium === "string" ? (
                <p className="text-white">{medium}</p>
              ) : (
                medium?.map((g) => <MediumGoal key={g._id} goal={g} />)
              )}
            </div>
            <div
              className="col-lg-3 overflow-scroll h-100 d-flex flex-column align-items-center"
              style={{ maxHeight: "650px" }}
            >
              {typeof high === "string" ? (
                <p className="text-white">{high}</p>
              ) : (
                high?.map((g) => <HighGoal key={g._id} goal={g} />)
              )}
            </div>
            <div
              className="col-lg-3 overflow-scroll h-100 d-flex flex-column align-items-center"
              style={{ maxHeight: "650px" }}
            >
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
