import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, LogIn, Shield, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

// Pre-saved email and password combinations
const validCredentials = [
  { email: 'admin@revoxstudio.com', password: 'Admin@123' },
  { email: 'sujoy@revoxstudio.com', password: 'Sujoy@2024' },
  { email: 'manager@revoxstudio.com', password: 'Manager@456' }
];

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn');
    const loginTime = localStorage.getItem('loginTime');
    
    if (savedLogin && loginTime) {
      const timeDiff = Date.now() - parseInt(loginTime);
      // Auto logout after 24 hours
      if (timeDiff < 24 * 60 * 60 * 1000) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loginTime');
      }
    }
  }, []);

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
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Account temporarily locked. Please try again in ${lockTime} seconds.`);
      return;
    }

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const isValid = validCredentials.some(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (isValid) {
        setSuccess('Login successful! Redirecting to admin panel...');
        
        // Save login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginTime', Date.now().toString());
        
        // Reset attempts on successful login
        setAttempts(0);
        
        // Set logged in state
        setTimeout(() => {
          setIsLoggedIn(true);
        }, 1000);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setLockTime(300); // 5 minutes lock
          setError('Too many failed attempts. Account locked for 5 minutes.');
        } else {
          setError(`Invalid email or password. ${3 - newAttempts} attempts remaining.`);
        }
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoNumber) => {
    const demoCred = validCredentials[demoNumber - 1];
    setFormData({
      email: demoCred.email,
      password: demoCred.password
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginTime');
    setIsLoggedIn(false);
    setFormData({ email: '', password: '' });
    setError('');
    setSuccess('');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // If user is logged in, show admin panel
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Admin Panel Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Admin Panel
                </h1>
                <p className="text-zinc-400">
                  Welcome to your administration dashboard
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <LogIn className="w-4 h-4 rotate-180" />
              Logout
            </button>
          </div>

          {/* Admin Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Stats Cards */}
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">Total Projects</h3>
              <p className="text-3xl font-bold text-blue-400">12</p>
              <p className="text-zinc-400 text-sm mt-2">Active projects in portfolio</p>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">Team Members</h3>
              <p className="text-3xl font-bold text-green-400">8</p>
              <p className="text-zinc-400 text-sm mt-2">Active team members</p>
            </div>
            
            <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
              <h3 className="text-lg font-semibold text-white mb-2">Messages</h3>
              <p className="text-3xl font-bold text-yellow-400">5</p>
              <p className="text-zinc-400 text-sm mt-2">Unread messages</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                Manage Projects
              </button>
              <button className="p-4 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors">
                Manage Team
              </button>
              <button className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors">
                View Analytics
              </button>
              <button className="p-4 bg-orange-600 hover:bg-orange-700 rounded-lg text-white transition-colors">
                Settings
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700 mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Project Updated', item: 'Dokhra E-commerce', time: '2 hours ago' },
                { action: 'New Member Added', item: 'John Doe', time: '5 hours ago' },
                { action: 'Project Created', item: 'Mobile Banking App', time: '1 day ago' },
                { action: 'Settings Updated', item: 'Site Configuration', time: '2 days ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-zinc-700/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-zinc-400 text-sm">{activity.item}</p>
                  </div>
                  <span className="text-zinc-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login Form
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
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
                  disabled={isLocked || isLoading}
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
                  disabled={isLocked || isLoading}
                  className="w-full pl-11 pr-12 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked || isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300 disabled:opacity-50 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm">{success}</p>
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
              disabled={isLoading || isLocked || !formData.email || !formData.password}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
            >
              {isLoading ? (
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

            {/* Demo Accounts Section */}
            <div className="border-t border-zinc-700 pt-6">
              <h3 className="text-sm font-medium text-zinc-400 mb-4 text-center">
                Demo Accounts
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleDemoLogin(num)}
                    disabled={isLocked || isLoading}
                    className="py-2 px-3 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-600 rounded-lg text-zinc-300 text-xs font-medium transition-colors"
                  >
                    Demo {num}
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-500 text-center mt-3">
                Click to auto-fill demo credentials
              </p>
            </div>
          </div>
        </form>

        {/* Credentials Info */}
        <div className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700">
          <h4 className="text-sm font-medium text-zinc-300 mb-3 text-center">
            Available Credentials
          </h4>
          <div className="space-y-2">
            {validCredentials.map((cred, index) => (
              <div key={index} className="text-xs text-zinc-400">
                <span className="font-medium">Demo {index + 1}:</span>{' '}
                {cred.email} / {cred.password}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;