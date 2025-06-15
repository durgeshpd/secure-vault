import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { AiOutlineLogin,AiOutlineUserAdd } from "react-icons/ai";

const Auth = () => {
  const { login,signup } = useAuth();
  const [isLogin,setIsLogin] = useState(true);
  const [form,setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name,value } = e.target;
    setForm((prev) => ({ ...prev,[name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && !form.gender) {
      toast.error("Please select a gender");
      return;
    }

    try {
      if (isLogin) {
        await login(form.emailId,form.password);
        toast.success("✅ Login successful");
      } else {
        console.log("Signup form data:",form);
        await signup(form);
        toast.success("✅ Signup successful. Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(`${isLogin ? "Login" : "Signup"} error:`,err.response?.data || err.message);
      toast.error(err.response?.data || `${isLogin ? "Login" : "Signup"} failed. Please check input.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="bg-base-100 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Sign In to Your Account" : "Create a New Account"}
        </h2>


        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="input input-bordered w-full"
                value={form.lastName}
                onChange={handleChange}
              />
              <select
                name="gender"
                className="select select-bordered w-full"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </>
          )}

          <input
            type="email"
            name="emailId"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.emailId}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-full flex items-center justify-center gap-2">
            {isLogin ? <AiOutlineLogin /> : <AiOutlineUserAdd />}
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="text-blue-500 font-semibold hover:underline"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
