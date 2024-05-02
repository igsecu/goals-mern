import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { GlobalProvider } from "./context/GlobalState";

import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <>
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/login" element={<Login />} />{" "}
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Router>
      </GlobalProvider>
    </>
  );
}

export default App;
