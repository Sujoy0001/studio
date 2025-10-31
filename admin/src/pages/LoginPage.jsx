import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, LogIn, Shield, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import userStore from "../store/userStore.js"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { loginuser, isLoading: storeLoading, error: storeError, message: storeMessage } = userStore();
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [localSuccess, setLocalSuccess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);

  // Handle lock timer
  useEffect(() => {
    let timer;
    if (isLocked && lockTime > 0) {
      timer = setInterval(() => {
        setLockTime(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockTime]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (localError) setLocalError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setLocalError(`Account temporarily locked. Please try again in ${lockTime} seconds.`);
      return;
    }

    if (!formData.email || !formData.password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    setLocalError('');
    setLocalSuccess('');

    try {
      // Use the loginuser function from the store
      await loginuser({
        email: formData.email,
        password: formData.password
      });

      // Check if login was successful by looking at store state
      const { isAuthenticated, error } = userStore.getState();
      
      if (isAuthenticated) {
        setLocalSuccess('Login successful! Redirecting...');
        
        // Reset attempts on successful login
        setAttempts(0);
        
        // Redirect to "/" after a short delay
        setTimeout(() => {
          window.location.href = '/index';
        }, 500);

      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setLockTime(300); // 5 minutes lock
          setLocalError('Too many failed attempts. Account locked for 5 minutes.');
        } else {
          setLocalError(error || `Invalid email or password. ${3 - newAttempts} attempts remaining.`);
        }
      }
    } catch (err) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setIsLocked(true);
        setLockTime(300);
        setLocalError('Too many failed attempts. Account locked for 5 minutes.');
      } else {
        setLocalError(err.message || 'An error occurred during login. Please try again.');
      }
    }
  };

  // Effect to handle store errors
  useEffect(() => {
    if (storeError) {
      setLocalError(storeError);
    }
  }, [storeError]);

  // Effect to handle store messages
  useEffect(() => {
    if (storeMessage && storeMessage.includes('success')) {
      setLocalSuccess(storeMessage);
    }
  }, [storeMessage]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="min-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Admin Panel Login
          </h2>
          <p className="text-zinc-400">
            Access your administration dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-zinc-800 rounded-2xl p-8 border border-zinc-700 shadow-2xl">
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={isLocked || storeLoading}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={isLocked || storeLoading}
                  className="w-full pl-11 pr-12 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked || storeLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300 disabled:opacity-50 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {(localError || storeError) && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{localError || storeError}</p>
              </div>
            )}

            {/* Success Message */}
            {(localSuccess || storeMessage) && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">{localSuccess || storeMessage}</p>
              </div>
            )}

            {/* Lock Timer */}
            {isLocked && (
              <div className="text-center p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className="text-orange-400 text-sm">
                  Account locked. Try again in{' '}
                  <span className="font-mono font-bold">{formatTime(lockTime)}</span>
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={storeLoading || isLocked || !formData.email || !formData.password}
              className="w-full flex cursor-pointer items-center justify-center gap-3 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
            >
              {storeLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign in to Admin Panel
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};