import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BASE_URL } from "../config/config";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/send-registration-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('OTP sent to email');
        setOtpSent(true);
      } else {
        toast.error('Failed to send OTP');
      }
    } catch (error) {
      toast.error('Error sending OTP');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        toast.success('Registration successful');
        navigate('/');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Error during registration');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-4 rounded"
      />
      {!otpSent ? (
        <button
          onClick={sendOtp}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
          />
          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </>
      )}
    </div>
  );
};

export default Register;