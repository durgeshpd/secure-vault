import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Checking authentication...</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/profile" : "/auth"} />} />
        <Route path="/auth" element={user ? <Navigate to="/profile" /> : <Auth />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
