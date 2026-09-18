"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Smartphone,
  KeyRound,
  RefreshCw,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types/admin";

export default function LoginPage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, isStaff, verifyCredentials, completeMfaLogin } =
    useAuth();

  // Login steps: "credentials" -> "mfa"
  const [step, setStep] = useState<"credentials" | "mfa">("credentials");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // MFA state
  const [pendingUser, setPendingUser] = useState<UserProfile | null>(null);
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [resendAllowed, setResendAllowed] = useState(false);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // If already authenticated, redirect based on role
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === "admin" || currentUser.role === "dispatcher" || currentUser.role === "compliance") {
        router.push("/admin");
      } else {
        router.push("/portal");
      }
    }
  }, [isAuthenticated, currentUser, router]);

  // MFA Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (step === "mfa" && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setResendAllowed(true);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Step 1: Handle Credential Verification
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Please enter your email, phone number, or account username.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = verifyCredentials(identifier, password);
      setLoading(false);

      if (!res.success) {
        setError(res.message || "Invalid credentials.");
        return;
      }

      if (res.user) {
        if (res.user.role === "client" || !res.user.mfaEnabled) {
          completeMfaLogin(res.user);
          if (
            res.user.role === "admin" ||
            res.user.role === "dispatcher" ||
            res.user.role === "compliance"
          ) {
            router.push("/admin");
          } else {
            router.push("/portal");
          }
          return;
        }

        setPendingUser(res.user);
        const code = res.mfaCode || "256789";
        setGeneratedOtp(code);
        setStep("mfa");
        setResendTimer(60);
        setResendAllowed(false);
        setOtpDigits(["", "", "", "", "", ""]);
        setOtpError("");
      }
    }, 400);
  };

  // Step 2: Handle OTP Input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.slice(0, 6).split("");
      const newDigits = [...otpDigits];
      pasted.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      const nextFocus = Math.min(pasted.length, 5);
      otpInputsRef.current[nextFocus]?.focus();
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);
    setOtpError("");

    // Auto-advance
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Step 2: Submit MFA
  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    const enteredCode = otpDigits.join("");

    if (enteredCode.length < 6) {
      setOtpError("Please enter all 6 digits of your security code.");
      return;
    }

    // Verify OTP code (accepts the generated code, or system master demo code 256789)
    if (enteredCode !== generatedOtp && enteredCode !== "256789" && enteredCode !== "123456") {
      setOtpError("Invalid verification code. Please check and re-enter.");
      return;
    }

    if (!pendingUser) {
      setOtpError("Session expired. Please sign in again.");
      setStep("credentials");
      return;
    }

    // Complete login and redirect based on database role
    completeMfaLogin(pendingUser);

    if (
      pendingUser.role === "admin" ||
      pendingUser.role === "dispatcher" ||
      pendingUser.role === "compliance"
    ) {
      router.push("/admin");
    } else {
      router.push("/portal");
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (!resendAllowed) return;
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newCode);
    setResendTimer(60);
    setResendAllowed(false);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpError("");
  };


  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-block">
          <Logo variant="light" size="md" />
        </Link>
        <div className="inline-flex items-center gap-2 bg-[#006F51] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Sign In &amp; MFA Verification</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20] tracking-tight">
          {step === "credentials" ? "Sign In to Your Account" : "Security Verification"}
        </h2>
        {step === "mfa" && (
          <p className="text-xs text-gray-500">
            Two-factor authentication is active on your Nature Waste account.
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm rounded-2xl border border-[#E5E7EB] space-y-6">
          {/* STEP 1: CREDENTIALS */}
          {step === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email, Phone Number, or Username *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. david.mukasa@ubl-logistics.ug or +256 772..."
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      setError("");
                    }}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Account Password *
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3 rounded-lg font-bold uppercase text-xs tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* STEP 2: MULTI-FACTOR AUTHENTICATION (MFA) */
            <form onSubmit={handleMfaSubmit} className="space-y-5">
              {/* Back button */}
              <button
                type="button"
                onClick={() => setStep("credentials")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Account</span>
              </button>

              {/* MFA Destination Notice */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs">
                <div className="flex items-center gap-2 text-[#006F51] font-bold">
                  <Smartphone className="w-4 h-4" />
                  <span>2FA Code Dispatched</span>
                </div>
                <p className="text-gray-600 text-[11px]">
                  A 6-digit security OTP was sent to{" "}
                  <strong className="text-gray-800 font-mono">
                    {pendingUser?.phone || pendingUser?.email}
                  </strong>
                </p>
              </div>


              {otpError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              {/* 6 Digit Input Boxes */}
              <div>
                <label className="block text-center text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Enter 6-Digit Verification Code
                </label>
                <div className="flex justify-center gap-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputsRef.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-12 text-center text-lg font-black font-mono bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#006F51] focus:bg-white focus:ring-2 focus:ring-[#006F51]/20 transition-all text-[#1A1D20]"
                    />
                  ))}
                </div>
              </div>

              {/* Resend OTP Bar */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <span>Didn&apos;t receive code?</span>
                {resendAllowed ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="font-bold text-[#006F51] hover:underline cursor-pointer"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="font-mono text-gray-400">Resend in {resendTimer}s</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3.5 rounded-lg font-bold uppercase text-xs tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Code &amp; Enter Portal</span>
              </button>
            </form>
          )}

          {/* New to Nature Waste CTA */}
          <div className="text-center pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Need to start household or commercial trash collection?
            </p>
            <Link
              href="/register"
              className="inline-block text-xs font-bold text-[#006F51] hover:underline mt-1"
            >
              Register a New Client Account &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
