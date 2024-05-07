import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import NavbarDashboard from "../components/NavbarDashboard";
import LowGoal from "../components/LowGoal";
import MediumGoal from "../components/MediumGoal";
import HighGoal from "../components/HighGoal";
import CompletedGoal from "../components/CompletedGoal";
import Spinner from "../components/Spinner";
import NoFound from "../components/NoFound";
import NoFoundUrgency from "../components/NoFoundUrgency";
import Footer from "../components/Footer";

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

  const [loading, setLoading] = useState(true);
  const [process, setProcess] = useState(0);
  const [showLow, setShowLow] = useState(true);
  const [showMedium, setShowMedium] = useState(true);
  const [showHigh, setShowHigh] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [totalGoals, setTotalGoals] = useState(0);
  const [showGoals, setShowGoals] = useState(false);

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
      if (user !== null) {
        fetchLow();
        fetchMedium();
        fetchHigh();
        fetchCompleted();
        setLoaded(true);
      }
    }
  }, [
    user,
    user?.token,
    postCompleted,
    postHigh,
    postLow,
    postMedium,
    loaded,
    setLoaded,
  ]);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setTotalGoals(
      low?.length + medium?.length + high?.length + completed?.length
    );

    if (totalGoals > 0) {
      setShowGoals(true);
      setProcess(((completed?.length * 100) / totalGoals).toFixed(0));
    } else {
      setShowGoals(false);
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [totalGoals, low, medium, high, completed]);

  useEffect(() => {
    if (width < 992) {
      setShowLow(true);
      setShowMedium(false);
      setShowHigh(false);
      setShowCompleted(false);
    }
    const handleResize = () => {
      setWidth(window.innerWidth);

      if (width < 992) {
        setShowLow(true);
        setShowMedium(false);
        setShowHigh(false);
        setShowCompleted(false);
      }

      if (width > 992) {
        setShowLow(true);
        setShowMedium(true);
        setShowHigh(true);
        setShowCompleted(true);
      }
    };
    window.addEventListener("resize", handleResize);
  }, [width]);

  return (
    <div style={{ minHeight: "750px" }}>
      <NavbarDashboard
        setShowLow={setShowLow}
        setShowMedium={setShowMedium}
        setShowHigh={setShowHigh}
        setShowCompleted={setShowCompleted}
      />
      {loading ? (
        <Spinner />
      ) : showGoals ? (
        <>
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center px-5 py-3 bg-dark">
            <div className="d-flex flex-column flex-lg-row align-items-center w-75">
              <p className="text-white mb-3 mb-lg-0 fw-bold w-50 text-center">
                Completed Goals Progress
              </p>
              <div
                className="progress w-100 mb-3 mb-lg-0"
                role="progressbar"
                aria-label="Example with label"
              >
                <div
                  className={`progress-bar ${
                    process === "100" ? "bg-success" : "bg-info"
                  }`}
                  style={{ width: `${process}%` }}
                >
                  {process}%
                </div>
              </div>
            </div>
            <Link
              to="/create-goal"
              className="d-flex align-items-center btn btn-success"
            >
              <FaPlus className="me-2" /> <span>NEW GOAL</span>
            </Link>
          </div>

          <div
            className="container-fluid bg-dark p-4 overflow-scroll"
            style={{ height: "650px" }}
          >
            <div className="row">
              {showLow ? (
                <div
                  className="col-lg-3 overflow-scroll d-flex flex-column align-items-center"
                  style={{ maxHeight: "600px" }}
                >
                  {low?.length === 0 &&
                  !showMedium &&
                  !showHigh &&
                  !showCompleted ? (
                    <NoFoundUrgency text={"low"} />
                  ) : (
                    low?.map((g) => <LowGoal key={g._id} goal={g} />)
                  )}
                </div>
              ) : (
                <></>
              )}
              {showMedium ? (
                <div
                  className="col-lg-3 overflow-scroll d-flex flex-column align-items-center"
                  style={{ maxHeight: "600px" }}
                >
                  {medium?.length === 0 &&
                  !showLow &&
                  !showHigh &&
                  !showCompleted ? (
                    <NoFoundUrgency text={"medium"} />
                  ) : (
                    medium?.map((g) => <MediumGoal key={g._id} goal={g} />)
                  )}
                </div>
              ) : (
                <></>
              )}
              {showHigh ? (
                <div
                  className="col-lg-3 overflow-scroll d-flex flex-column align-items-center"
                  style={{ maxHeight: "600px" }}
                >
                  {high?.length === 0 &&
                  !showLow &&
                  !showMedium &&
                  !showCompleted ? (
                    <NoFoundUrgency text={"high"} />
                  ) : (
                    high?.map((g) => <HighGoal key={g._id} goal={g} />)
                  )}
                </div>
              ) : (
                <></>
              )}
              {showCompleted ? (
                <div
                  className="col-lg-3 overflow-scroll d-flex flex-column align-items-center"
                  style={{ maxHeight: "600px" }}
                >
                  {completed?.length === 0 &&
                  !showLow &&
                  !showMedium &&
                  !showHigh ? (
                    <NoFoundUrgency text={"completed"} />
                  ) : (
                    completed?.map((g) => (
                      <CompletedGoal key={g._id} goal={g} />
                    ))
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <NoFound />
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;
