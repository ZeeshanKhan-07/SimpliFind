import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import toast from "react-hot-toast";
import useAuth from "../../store/Useauth";
import LoginPageRightImage from "../../images/LoginPageRightImage.svg";

const LoginPage = () => {
  const { login, authLoading, authStatus } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (authStatus) navigate("/find-comments", { replace: true });
  }, [authStatus, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(leftRef.current, { x: -40, opacity: 0 });
      gsap.set(rightRef.current, { x: 40, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(leftRef.current, { x: 0, opacity: 1, duration: 0.65 }).to(
        rightRef.current,
        { x: 0, opacity: 1, duration: 0.65 },
        "-=0.45",
      );

      const fields = formRef.current?.querySelectorAll(".form-item");
      if (fields?.length) {
        gsap.fromTo(
          fields,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.3,
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await login(formData);
      toast.success("Logged in successfully!");
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    /*
          Outer wrapper: full-screen white, column flex.
          On mobile the right panel is hidden so the left panel
          fills the whole screen naturally.
        */
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar spacer */}
      <div className="h-14 sm:h-16 flex-shrink-0" />

      {/*
              Page body.
              - On mobile/tablet (< lg): single column, left panel only,
                centered with comfortable vertical padding.
              - On lg+: side-by-side, left = form, right = illustration card.
                We wrap both inside a max-w container and add horizontal
                padding so neither panel bleeds to the very edge on ultra-wide.
            */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 lg:py-0 gap-8 lg:gap-12 items-center">
        {/* ── LEFT: Form ─────────────────────────────────────────────── */}
        <div
          ref={leftRef}
          className="w-full lg:w-1/2 flex items-center justify-center"
        >
          <div className="w-full max-w-sm" ref={formRef}>
            {/* Heading Section - Completely Centered & Balanced */}
            <div className="form-item mb-7 text-center">
              <h1 className="text-3xl sm:text-[2.6rem] font-bold text-gray-900 leading-tight mb-2">
                Welcome back!
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed px-2">
                Simplify your workflow and boost your productivity with{" "}
                <span className="font-semibold text-gray-700">Simpli</span>
                <span className="font-semibold text-blue-600">Find</span>. Get
                started for free.
              </p>
            </div>

            {/* Inline error */}
            {error && (
              <div className="form-item bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email */}
              <div className="form-item">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={authLoading}
                  placeholder="dustin@gmail.com"
                  className="w-full px-5 py-3 border border-gray-300 rounded-full text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-60 disabled:cursor-not-allowed transition duration-200"
                />
              </div>

              {/* Password */}
              <div className="form-item relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={authLoading}
                  placeholder="password"
                  className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-full text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-60 disabled:cursor-not-allowed transition duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={authLoading}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Forgot password */}
              <div className="form-item flex justify-end -mt-1">
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login button */}
              <div className="form-item">
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-400 text-white font-semibold text-sm rounded-full transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {authLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            {/* Register link */}
            <div className="form-item mt-6 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                map
                to="/signup"
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Register now
              </Link>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Illustration card ──────────────────────────────── */}
        <div
          ref={rightRef}
          className="hidden lg:flex w-1/2 flex-col items-center justify-center self-stretch my-6"
        >
          <div
            className="w-full h-full flex flex-col items-center justify-center rounded-3xl px-10 py-10"
            style={{
              background:
                "linear-gradient(145deg, #e0f2fe 0%, #bae6fd 60%, #d1eaff 100%)",
              border: "1px solid rgba(186,230,253,0.8)",
              boxShadow: "0 8px 40px rgba(147,197,253,0.25)",
            }}
          >
            {/* Illustration */}
            <div className="w-full max-w-xs xl:max-w-sm">
              <img
                src={LoginPageRightImage}
                alt="SimpliFind illustration"
                className="w-full h-auto"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
