import React, { useState } from "react";
import { FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../pages/Loader";
import { showToast } from "../../pages/Toast";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (!email || !password) {
        showToast("Email and password are required", "error");
        setIsSubmitting(false);
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/login`,
        { email, password },
      );

      localStorage.setItem("token", res.data.token);

      showToast(`Welcome back, ${email.split("@")[0]}!`, "success");

      navigate("/admin", { replace: true });
    } catch (error) {
      if (error.response?.data?.message === "Invalid email or password") {
        return showToast("Invalid email or password.", "error");
      }

      showToast(
        error?.response?.data?.message || error?.message || "Admin Error",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1120] px-5 py-10 text-white sm:px-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-700/60 bg-[#111827] p-7 shadow-2xl sm:p-9">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
            <FiLock className="text-2xl text-[#60A5FA]" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to manage your portfolio
          </p>
        </div>

        {/* LOGIN FORM */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email Address
            </label>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-[#0B1120] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60A5FA] focus:ring-2 focus:ring-blue-400/10"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-[#0B1120] py-3 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60A5FA] focus:ring-2 focus:ring-blue-400/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-500 transition hover:text-[#60A5FA]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-lg py-3 text-sm font-semibold transition duration-300 active:scale-[0.98]
    ${
      isSubmitting
        ? "cursor-not-allowed bg-slate-700 text-slate-400 shadow-none"
        : "cursor-pointer bg-[#60A5FA] text-[#0B1120] hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
    }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size="sm" />
                Logging in...
              </span>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 border-t border-slate-700/60 pt-5 text-center">
          <p className="text-xs text-slate-500">
            <FiLock className="mr-1 inline-block" />
            Restricted access · Authorized admin only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
