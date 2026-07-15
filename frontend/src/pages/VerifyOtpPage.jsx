import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import toast from "react-hot-toast";
import AuthService from "../services/AuthService";
import RightOTPVerificationImage from "../images/RightOTPVerificationImage.svg";

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract user email passed from signup page navigation state (with safe fallback)
  const email = location.state?.email || "example@gmail.com";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(41); // Initial resend timer: 41s

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const inputRefs = useRef([]);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(leftRef.current, { x: -40, opacity: 0 });
      gsap.set(rightRef.current, { x: 40, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(leftRef.current, { x: 0, opacity: 1, duration: 0.65 })
        .to(rightRef.current, { x: 0, opacity: 1, duration: 0.65 }, "-=0.45");
    });
    return () => ctx.revert();
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Allow numbers only
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Get last typed character
    setOtp(newOtp);
    setError("");

    // Move focus to next input box automatically
    if (index < 5 && element.value !== "") {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Focus previous input box on backspace
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const enteredCode = otp.join("");

    if (enteredCode.length < 6) {
      setError("Please fill in all 6 code boxes.");
      return;
    }

    setLoading(true);
    try {
      await AuthService.verifyOtp(email, enteredCode);
      toast.success("Account verified successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Invalid or expired verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (countdown > 0) return;
    setCountdown(41);
    toast.success("New verification code sent to your email!");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-14 sm:h-16 flex-shrink-0" />

      <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 lg:py-0 gap-8 lg:gap-12 items-center">
        {/* ── LEFT: OTP Card ─────────────────────────────────────────── */}
        <div ref={leftRef} className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-sm text-center">
            
            <h1 className="text-3xl sm:text-[2.6rem] font-bold text-gray-900 tracking-tight leading-tight mb-2">
              Check your email
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 px-2">
              Please enter the six-digit verification code we sent to <br />
              <span className="font-semibold text-gray-800">{email}</span>
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl text-sm mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* OTP Boxes Grid */}
              <div className="flex justify-between items-center gap-2 px-1">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-lg font-semibold bg-gray-100/70 text-gray-900 border-2 border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                ))}
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-500 text-white font-semibold text-sm rounded-full transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Verifying..." : "Confirm"}
              </button>
            </form>

            {/* Resend details */}
            <div className="mt-6 text-sm text-gray-500">
              {countdown > 0 ? (
                <span>Didn’t get the email? Resend in 00:{countdown.toString().padStart(2, "0")}</span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
                >
                  Resend Email Code
                </button>
              )}
            </div>

            {/* Back Navigation Link */}
            <button
              onClick={() => navigate(-1)}
              className="mt-6 text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1.5 mx-auto"
            >
              <ArrowLeft size={16} />
              back
            </button>
          </div>
        </div>

        {/* ── RIGHT: Illustration Card ──────────────────────────────── */}
        <div ref={rightRef} className="hidden lg:flex w-1/2 flex-col items-center justify-center self-stretch my-6">
          <div
            className="w-full h-full flex flex-col items-center justify-center rounded-3xl px-10 py-10"
            style={{
              background: "linear-gradient(145deg, #e0f2fe 0%, #bae6fd 60%, #d1eaff 100%)",
              border: "1px solid rgba(186,230,253,0.8)",
              boxShadow: "0 8px 40px rgba(147,197,253,0.25)",
            }}
          >
            <div className="w-full max-w-xs xl:max-w-sm">
              <img
                src={RightOTPVerificationImage}
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

export default VerifyOtpPage;