import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed');
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => setError('Google login coming soon');

  return (
    <AuthLayout eyebrow="Welcome back" title="Log in to your account" subtitle="Pick up right where you left off.">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 flex items-center gap-2 overflow-hidden rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <AlertCircle size={15} className="shrink-0" /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99]"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <text x="0" y="20" fontSize="20" fill="currentColor" fontWeight="bold">G</text>
        </svg>
        Continue with Google
      </button>

      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="text-xs text-gray-400">OR</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3.5 text-sm text-gray-900 placeholder-gray-400 transition-shadow focus:border-[var(--color-violet-light)] focus:outline-none focus:ring-4 focus:ring-[var(--color-violet)]/10"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-shadow focus:border-[var(--color-violet-light)] focus:outline-none focus:ring-4 focus:ring-[var(--color-violet)]/10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="text-right">
          <a href="#" className="text-xs font-medium text-[var(--color-violet)] hover:text-[var(--color-plum)]">
            Forgot password?
          </a>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-sunrise px-4 py-2.5 font-medium text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.6)] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Logging in…' : 'Log in'}
        </motion.button>
      </form>

      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500">Don't have an account? </span>
        <Link to="/signup" className="text-sm font-medium text-[var(--color-violet)] hover:text-[var(--color-plum)]">
          Create one
        </Link>
      </div>
    </AuthLayout>
  );
}
