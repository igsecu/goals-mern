import { GlobalContext } from "../context/GlobalState";
import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import NavbarDashboard from "../components/NavbarDashboard";

const Dashboard = () => {
  const { user } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <NavbarDashboard />
    </div>
  );
};

export default Dashboard;
