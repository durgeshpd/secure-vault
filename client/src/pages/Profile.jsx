import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineSave } from "react-icons/ai";

const Profile = () => {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    emailId: user.emailId || "",
    gender: user.gender || "Male",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const saveProfile = async () => {
    try {
      const res = await API.patch("/users/me", form);
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 mt-10 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <div className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text font-semibold">First Name</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            disabled={!editing}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Last Name</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            disabled={!editing}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            name="emailId"
            value={form.emailId}
            onChange={handleChange}
            disabled={!editing}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Gender</span>
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            disabled={!editing}
            className="select select-bordered w-full max-w-xs"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          {editing ? (
            <>
              <button
                className="btn btn-success flex items-center gap-2"
                onClick={saveProfile}
              >
                <AiOutlineSave /> Save
              </button>
              <button
                className="btn btn-error"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary flex items-center gap-2"
                onClick={() => setEditing(true)}
              >
                <AiOutlineEdit /> Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;