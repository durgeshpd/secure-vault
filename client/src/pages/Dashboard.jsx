import React, { useEffect, useState } from "react";
import { getUserInfo, logoutUser } from "../utils/api";
import { getUser, clearUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getUserInfo();
        console.log("Dashboard user info:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Fetch user info failed:", err);
        setError("Failed to fetch user info. Please log in again.");
        clearUser();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
    }
    clearUser();
    navigate("/login");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.emailId}</p>
        <p><strong>Gender:</strong> {user.gender}</p>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}


export default Dashboard;