//*******without otp************** */

// "use client";

// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Signup() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Check if password has been pwned using Have I Been Pwned API
//   async function checkPasswordBreach(pass) {
//     if (!pass) return false;
//     const sha1 = await crypto.subtle.digest(
//       "SHA-1",
//       new TextEncoder().encode(pass)
//     );
//     const hash = Array.from(new Uint8Array(sha1))
//       .map((b) => b.toString(16).padStart(2, "0"))
//       .join("")
//       .toUpperCase();

//     const prefix = hash.slice(0, 5);
//     const suffix = hash.slice(5);
//     try {
//       const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
//       if (!res.ok) return false;
//       const text = await res.text();
//       return text.split("\n").some(line => line.split(":")[0] === suffix);
//     } catch {
//       return false;
//     }
//   }

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (password.length < 8) {
//       alert("Password must be at least 8 characters.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const breached = await checkPasswordBreach(password);
//       if (breached) {
//         alert(
//           "This password has been found in a data breach. Please choose a different one."
//         );
//         return;
//       }

//       // Call your own signup API
//       const { data } = await axios.post("/api/signup", {
//         name,
//         email,
//         password,
//       });

//       if (data.success) {
//         alert("Signup successful! Please log in.");
//         router.push("/login");
//       } else {
//         alert(data.message || "Signup failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Signup error:", err);
//       alert(err.response?.data?.error || "Unexpected error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="max-w-md mx-auto mt-24 p-8 bg-white rounded-lg shadow-md font-sans text-center">
//       <h2 className="text-2xl font-semibold mb-8 text-gray-800">
//         Create an Account
//       </h2>

//       <form
//         onSubmit={handleSignup}
//         className="flex flex-col gap-6 text-left"
//         noValidate
//       >
//         <label className="text-sm font-medium text-gray-700">
//           Full Name
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="mt-1 block w-full rounded-md border px-4 py-2"
//             placeholder="Your name"
//           />
//         </label>

//         <label className="text-sm font-medium text-gray-700">
//           Email Address
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="mt-1 block w-full rounded-md border px-4 py-2"
//             placeholder="you@example.com"
//           />
//         </label>

//         <label className="text-sm font-medium text-gray-700">
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="mt-1 block w-full rounded-md border px-4 py-2"
//             placeholder="••••••••"
//           />
//           <span className="text-xs text-gray-500">Minimum 8 characters</span>
//         </label>

//         <button
//           type="submit"
//           disabled={loading || !name || !email || password.length < 8}
//           className={`mt-4 w-full rounded-md px-4 py-3 font-semibold text-white transition ${
//             loading || !name || !email || password.length < 8
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Processing..." : "Sign Up"}
//         </button>
//       </form>

//       <p className="mt-6 text-sm text-gray-600">
//         Already have an account?{" "}
//         <Link href="/login" className="text-blue-600 hover:underline">
//           Log in
//         </Link>
//       </p>
//     </main>
//   );
// }


// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function SignUp() {
//   const router = useRouter();

//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const [phase, setPhase] = useState('collect');
//   const [otp, setOtp] = useState('');
//   const [otpError, setOtpError] = useState('');
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [resendVisible, setResendVisible] = useState(false);

//   useEffect(() => {
//     if (phase === 'collect') {
//       setOtp('');
//       setOtpError('');
//       setResendVisible(false);
//     }
//   }, [phase]);

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = 'Name is required';
//     if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
//     if (!form.password || form.password.length < 6) e.password = 'Min 6 chars';
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleChange = (e) => {
//     setForm(f => ({ ...f, [e.target.name]: e.target.value }));
//     setErrors(err => ({ ...err, [e.target.name]: '' }));
//   };

//   const sendOtp = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setIsLoading(true);
//     try {
//       const res = await fetch('/api/send-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: form.email }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error || 'Failed to send OTP');
//       }
//       setPhase('verify');
//       setResendVisible(true);
//     } catch (err) {
//       setErrors({ submit: err.message || 'Failed to send OTP' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     if (!otp.trim()) {
//       setOtpError('Enter the OTP');
//       return;
//     }
//     setOtpLoading(true);
//     try {
//       const res1 = await fetch('/api/verify-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: form.email, otp }),
//       });
//       if (!res1.ok) {
//         const data = await res1.json();
//         throw new Error(data.error || 'OTP verification failed');
//       }

//       const res2 = await fetch('/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });
//       if (!res2.ok) {
//         const data = await res2.json();
//         throw new Error(data.error || 'Signup failed');
//       }

//       router.push('/login');
//     } catch (err) {
//       setOtpError(err.message || 'OTP verification failed');
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const resend = async () => {
//     setOtpLoading(true);
//     try {
//       const res = await fetch('/api/send-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: form.email }),
//       });
//       if (!res.ok) throw new Error('Resend failed');
//     } catch {
//       setOtpError('Resend failed');
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   if (phase === 'verify') {
//     return (
//       <div className="max-w-md mx-auto p-8">
//         <h2 className="mb-4 text-xl">Verify {form.email}</h2>
//         <form onSubmit={verifyOtp} className="space-y-4">
//           <input
//             value={otp}
//             onChange={e => { setOtp(e.target.value); setOtpError(''); }}
//             placeholder="Enter OTP"
//             className="w-full px-4 py-2 border rounded"
//           />
//           {otpError && <p className="text-red-600">{otpError}</p>}

//           <button
//             type="submit"
//             disabled={otpLoading}
//             className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
//           >
//             {otpLoading ? 'Verifying…' : 'Verify'}
//           </button>

//           {resendVisible && (
//             <button
//               type="button"
//               onClick={resend}
//               disabled={otpLoading}
//               className="mt-2 text-sm text-blue-600 underline"
//             >
//               {otpLoading ? 'Resending…' : 'Resend Code'}
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={() => setPhase('collect')}
//             className="mt-4 text-sm text-gray-600"
//           >
//             ← Back
//           </button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-md mx-auto p-8">
//       <h2 className="mb-4 text-xl">Create Account</h2>
//       <form onSubmit={sendOtp} className="space-y-4">
//         {errors.submit && <p className="text-red-600">{errors.submit}</p>}

//         {['name', 'email', 'password'].map(field => (
//           <div key={field}>
//             <label className="block mb-1 capitalize">{field}</label>
//             <input
//               name={field}
//               type={field === 'password' ? 'password' : 'text'}
//               value={form[field]}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded"
//             />
//             {errors[field] && <p className="text-red-600 text-sm">{errors[field]}</p>}
//           </div>
//         ))}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-green-600 text-white p-2 rounded disabled:opacity-50"
//         >
//           {isLoading ? 'Sending OTP…' : 'Send OTP'}
//         </button>

//         <p className="mt-4 text-sm">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-600 underline">
//             Sign In
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }


'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [phase, setPhase] = useState('collect');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendVisible, setResendVisible] = useState(false);

  useEffect(() => {
    if (phase === 'collect') {
      setOtp('');
      setOtpError('');
      setResendVisible(false);
    }
  }, [phase]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.password || form.password.length < 6) e.password = 'Min 6 chars';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send OTP');
      }
      setPhase('verify');
      setResendVisible(true);
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to send OTP' });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setOtpError('Enter the OTP');
      return;
    }
    setOtpLoading(true);
    try {
      const res1 = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      });
      if (!res1.ok) {
        const data = await res1.json();
        throw new Error(data.error || 'OTP verification failed');
      }

      const res2 = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res2.ok) {
        const data = await res2.json();
        throw new Error(data.error || 'Signup failed');
      }

      router.push('/login');
    } catch (err) {
      setOtpError(err.message || 'OTP verification failed');
    } finally {
      setOtpLoading(false);
    }
  };

  const resend = async () => {
    setOtpLoading(true);
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });
      if (!res.ok) throw new Error('Resend failed');
    } catch {
      setOtpError('Resend failed');
    } finally {
      setOtpLoading(false);
    }
  };

  if (phase === 'verify') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
              <p className="text-gray-600 text-sm">
                We've sent a verification code to<br />
                <span className="font-semibold text-indigo-600">{form.email}</span>
              </p>
            </div>

            <form onSubmit={verifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <input
                  value={otp}
                  onChange={e => { setOtp(e.target.value); setOtpError(''); }}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-center text-lg font-mono tracking-widest"
                  maxLength={6}
                />
                {otpError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {otpError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={otpLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {otpLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </div>
                ) : (
                  'Verify & Create Account'
                )}
              </button>

              {resendVisible && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
                  <button
                    type="button"
                    onClick={resend}
                    disabled={otpLoading}
                    className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
                  >
                    Resend Code
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => setPhase('collect')}
                className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm font-medium transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600 text-sm">Join us and get started in seconds</p>
          </div>

          <form onSubmit={sendOtp} className="space-y-6">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-800 text-sm">{errors.submit}</span>
                </div>
              </div>
            )}

            {[
              { field: 'name', label: 'Full Name', type: 'text', icon: '👤' },
              { field: 'email', label: 'Email Address', type: 'email', icon: '✉️' },
              { field: 'password', label: 'Password', type: 'password', icon: '🔒' }
            ].map(({ field, label, type, icon }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {label}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-lg">{icon}</span>
                  </div>
                  <input
                    name={field}
                    type={type}
                    value={form[field]}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                      errors[field] ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                  />
                </div>
                {errors[field] && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors[field]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span>Continue with Email</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a 
                  href="/login" 
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
