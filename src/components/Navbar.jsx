import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home, GraduationCap, Briefcase, BookOpen, User, LogOut,
  ClipboardList, FileText, Map, TrendingUp, Users, ChevronDown, Zap, Menu, X,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const mainNavItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/bursaries', label: 'Bursaries', icon: GraduationCap },
  { to: '/funding', label: 'Funding', icon: Briefcase },
  { to: '/courses', label: 'Free Courses', icon: BookOpen },
  { to: '/learnerships', label: 'Learnerships', icon: Map },
  { to: '/profile', label: 'My Profile', icon: User },
];

const toolsItems = [
  { to: '/job-tracker', label: 'Job Tracker', icon: ClipboardList, desc: 'Track every application', color: 'text-blue-500' },
  { to: '/cv-builder', label: 'AI CV Builder', icon: FileText, desc: 'ATS feedback & rewrite', color: 'text-violet-500' },
  { to: '/skills-roadmaps', label: 'Roadmaps', icon: TrendingUp, desc: 'Step-by-step career paths', color: 'text-emerald-500' },
  { to: '/mentorship', label: 'Mentorship', icon: Users, desc: 'Connect with professionals', color: 'text-coral' },
];

const allMobileItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/bursaries', label: 'Bursaries', icon: GraduationCap },
  { to: '/funding', label: 'Funding', icon: Briefcase },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/learnerships', label: 'Learnerships', icon: Map },
  { to: '/job-tracker', label: 'Job Tracker', icon: ClipboardList },
  { to: '/cv-builder', label: 'AI CV', icon: FileText },
  { to: '/skills-roadmaps', label: 'Roadmaps', icon: TrendingUp },
  { to: '/mentorship', label: 'Mentorship', icon: Users },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Navbar() {
  const { isLoggedIn, logout, user } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  const isToolsActive = toolsItems.some((item) => location.pathname === item.to);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_10px_30px_-15px_rgba(59,31,82,0.35)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <NavLink to="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-sunrise text-base font-bold text-white shadow-[0_4px_14px_-4px_rgba(124,58,237,0.55)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <span className="relative z-10 font-[var(--font-display)]">Y</span>
            <span className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-white/25 blur-[2px]" />
          </div>
          <span className="font-[var(--font-display)] text-lg font-bold tracking-tight text-[var(--color-plum)]">
            Youth<span className="text-sunrise">Rise</span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {isLoggedIn && (
            <>
              {mainNavItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-sunrise text-white shadow-[0_4px_14px_-4px_rgba(124,58,237,0.55)]'
                        : 'text-[var(--color-plum)]/70 hover:bg-[var(--color-mist)] hover:text-[var(--color-plum)]'
                    }`
                  }
                >
                  <Icon size={14} strokeWidth={2.25} />
                  {label}
                </NavLink>
              ))}

              {/* Tools Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen((v) => !v)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all duration-200 ${
                    isToolsActive || open
                      ? 'bg-sunrise text-white shadow-[0_4px_14px_-4px_rgba(124,58,237,0.55)]'
                      : 'text-[var(--color-plum)]/70 hover:bg-[var(--color-mist)] hover:text-[var(--color-plum)]'
                  }`}
                >
                  <Zap size={14} strokeWidth={2.25} />
                  Tools
                  <ChevronDown size={12} strokeWidth={2.5} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      className="absolute left-0 top-full mt-2 w-60 rounded-2xl border border-black/5 bg-white/95 p-1.5 shadow-xl backdrop-blur-md"
                    >
                      <div className="absolute -top-1.5 left-5 h-3 w-3 rotate-45 rounded-sm border-l border-t border-black/5 bg-white" />
                      <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-plum)]/40">
                        Career Tools
                      </p>
                      {toolsItems.map(({ to, label, icon: Icon, desc, color }) => {
                        const isActive = location.pathname === to;
                        return (
                          <NavLink
                            key={to}
                            to={to}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                              isActive ? 'bg-[var(--color-mist)]' : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 ${color}`}>
                              <Icon size={15} strokeWidth={2.2} />
                            </div>
                            <div>
                              <p className={`text-sm font-semibold ${isActive ? 'text-[var(--color-violet)]' : 'text-gray-800'}`}>
                                {label}
                              </p>
                              <p className="text-xs text-gray-400">{desc}</p>
                            </div>
                          </NavLink>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-[var(--color-ink)]">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                aria-label="Log out"
                title="Log out"
                className="rounded-full p-2 text-gray-400 transition-all duration-200 hover:scale-105 hover:bg-red-50 hover:text-red-600 active:scale-95"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="hidden rounded-full px-4 py-2 text-sm font-medium text-[var(--color-plum)]/70 transition-colors hover:bg-[var(--color-mist)] sm:inline-flex"
              >
                Log in
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="inline-flex rounded-full bg-sunrise px-4 py-2 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(124,58,237,0.55)] transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                Sign up
              </button>
            </>
          )}

          {isLoggedIn && (
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="rounded-full p-2 text-[var(--color-plum)] transition-colors hover:bg-[var(--color-mist)] md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav — slide down sheet */}
      {isLoggedIn && (
        <>
          <nav className="flex items-center gap-1 overflow-x-auto border-t border-black/5 px-3 py-2 md:hidden">
            {allMobileItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive ? 'bg-sunrise text-white shadow-sm' : 'text-[var(--color-plum)]/70 hover:bg-[var(--color-mist)]'
                  }`
                }
              >
                <Icon size={14} strokeWidth={2.25} />
                {label}
              </NavLink>
            ))}
          </nav>
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-black/5 bg-white/95 backdrop-blur-md md:hidden"
              >
                <p className="px-4 pb-1 pt-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-plum)]/40">
                  Career Tools
                </p>
                <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                  {toolsItems.map(({ to, label, icon: Icon, color }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm font-medium text-[var(--color-ink)] shadow-sm active:scale-95"
                    >
                      <Icon size={15} className={color} />
                      {label}
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </header>
  );
}
