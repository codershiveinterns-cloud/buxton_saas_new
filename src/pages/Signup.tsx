import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hammer, Loader2 } from 'lucide-react';

import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import PasswordInput from '../components/PasswordInput';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Full name must contain only letters';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must contain 8 characters, uppercase, lowercase, number and special character';
        isValid = false;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setErrors((prev) => ({ ...prev, general: '' }));

      try {
        await authService.registerUser(formData.email, formData.password, formData.name);
        toast.success('Signup successful! Please verify your email.');
        
        // Navigate back to login, asking them to verify their email
        navigate('/login');
      } catch (err: any) {
        let errorMessage = err.response?.data?.message || err.message || 'Signup failed';
        if (err.code === 'auth/email-already-in-use') {
          errorMessage = 'Email is already in use by another account.';
        }
        setErrors((prev) => ({ ...prev, general: errorMessage }));
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    
    // Prevent numbers or special characters in the Full Name input field
    if (name === 'name') {
      value = value.replace(/[^A-Za-z\s]/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Real-time validation clear
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
              <Hammer className="w-7 h-7 text-white" />
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create your account
          </h2>
          <p className="text-gray-600">
            Start managing your scaffolding projects today
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-medium">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Full name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <PasswordInput
              id="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min. 8 characters)"
              error={errors.password}
            />

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-colors ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'
              }`}
            >
              {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-gray-900 hover:text-gray-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <Link to="/policy" className="text-gray-900 hover:text-gray-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/policy" className="text-gray-900 hover:text-gray-700">
              Privacy Policy
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
