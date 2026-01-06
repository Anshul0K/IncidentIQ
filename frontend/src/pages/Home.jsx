import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import IQLogo from "../assets/IQ_logo.png";

const Home = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("login"); // login | signup

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openModal = (type) => {
    setMode(type);
    setIsModalOpen(true);
    setError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint =
        mode === "login" ? "/auth/login" : "/auth/register";

      const payload =
        mode === "login"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : {
              name: formData.name,
              email: formData.email,
              password: formData.password,
            };

      const res = await api.post(endpoint, payload);

      // Save token
      localStorage.setItem("token", res.data.token);

      closeModal();
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 relative">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-3">
          <img src={IQLogo} alt="IncidentIQ Logo" className="h-10" />
          <span className="text-2xl font-semibold text-slate-800">
            Incident<span className="text-blue-600">IQ</span>
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => openModal("login")}
            className="px-5 py-2 text-blue-700 border border-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            Login
          </button>
          <button
            onClick={() => openModal("signup")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero */}
      <main
        className={`flex flex-col items-center justify-center text-center mt-28 transition-all ${
          isModalOpen ? "blur-sm scale-[0.99]" : ""
        }`}
      >
        <img src={IQLogo} alt="IncidentIQ" className="w-36 mb-8 opacity-90" />

        <h1 className="text-5xl font-bold text-slate-900 mb-5 leading-tight">
          Turn Incidents into <br />
          <span className="text-blue-600">Organizational Learning</span>
        </h1>

        <p className="text-slate-600 max-w-xl text-lg">
          IncidentIQ helps teams document failures, understand root causes,
          and prevent repeating the same mistakes again.
        </p>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20">
          <div className="bg-white rounded-2xl w-[420px] p-8 relative shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <h3 className="text-2xl font-semibold text-slate-800 mb-4 text-center">
              {mode === "login" ? "Welcome Back" : "Create your account"}
            </h3>

            {error && (
              <p className="text-red-600 text-sm text-center mb-3">
                {error}
              </p>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {mode === "signup" && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Login"
                  : "Sign Up"}
              </button>
            </form>

            <p className="text-sm text-center text-slate-500 mt-5">
              {mode === "login" ? (
                <>
                  New here?{" "}
                  <span
                    onClick={() => setMode("signup")}
                    className="text-blue-600 cursor-pointer font-medium"
                  >
                    Create an account
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    onClick={() => setMode("login")}
                    className="text-blue-600 cursor-pointer font-medium"
                  >
                    Login instead
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
