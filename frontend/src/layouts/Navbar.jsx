import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, Bell, Sun, Moon, Command, ChevronDown, LogOut, Settings, User as UserIcon, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { NOTIFICATIONS } from '../constants/mockData';
import { Avatar, Badge, Button } from '../components/ui';
import { cn, formatRelativeTime } from '../utils';
import { APP_NAME } from '../constants/navigation';

const notifIcons = {
  info: 'text-primary-500 bg-primary-50 dark:bg-primary-950/40',
  success: 'text-success-500 bg-success-50 dark:bg-success-950/40',
  warning: 'text-warning-500 bg-warning-50 dark:bg-warning-950/40',
  danger: 'text-danger-500 bg-danger-50 dark:bg-danger-950/40',
};

export function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-20 glass-nav">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="rounded-lg p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link to="/" className="flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-500">
                <ShieldCheck className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold">{APP_NAME}</span>
            </Link>

            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 px-3.5 py-2 text-sm text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 transition-colors w-64 lg:w-80"
            >
              <Search className="h-4 w-4" />
              <span>Search media, reports...</span>
              <kbd className="ml-auto flex items-center gap-0.5 rounded-md border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 text-xs">
                <Command className="h-3 w-3" />K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="relative rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-danger-500" />
                  </span>
                )}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 glass-card overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4 border-b border-slate-200/60 dark:border-slate-800/60">
                      <p className="font-semibold font-display">Notifications</p>
                      <Badge tone="primary" variant="soft">{unreadCount} new</Badge>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {NOTIFICATIONS.map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            'flex gap-3 p-4 border-b border-slate-100 dark:border-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer',
                            !n.read && 'bg-primary-50/40 dark:bg-primary-950/20',
                          )}
                        >
                          <div className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', notifIcons[n.type])}>
                            <Bell className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{n.title}</p>
                            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{n.message}</p>
                            <p className="mt-1 text-xs text-slate-400">{formatRelativeTime(n.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-200/60 dark:border-slate-800/60">
                      <Button variant="ghost" size="sm" className="w-full">View all notifications</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative ml-1">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 rounded-xl p-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
              >
                <Avatar src={user?.avatar} name={user?.name ?? 'User'} size="sm" />
                <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform', profileOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-60 glass-card overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/60">
                      <p className="font-medium text-sm">{user?.name}</p>
                      <p className="text-xs text-slate-400">{user?.email}</p>
                      <Badge tone="primary" variant="soft" className="mt-2">{user?.plan} Plan</Badge>
                    </div>
                    <div className="p-2">
                      <button onClick={() => navigate('/app/settings')} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <UserIcon className="h-4 w-4" /> Profile
                      </button>
                      <button onClick={() => navigate('/app/settings')} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Settings className="h-4 w-4" /> Settings
                      </button>
                      <button onClick={() => { signOut(); navigate('/'); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-950/40 transition-colors">
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Command palette search */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-32">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-xl glass-card overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-slate-200/60 dark:border-slate-800/60">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  autoFocus
                  placeholder="Search media, reports, settings..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
                <kbd className="rounded-md border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 text-xs text-slate-400">ESC</kbd>
              </div>
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-slate-400">Quick actions</p>
                <button onClick={() => { setSearchOpen(false); navigate('/app/verify'); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Search className="h-4 w-4 text-slate-400" /> New verification
                </button>
                <button onClick={() => { setSearchOpen(false); navigate('/app/history'); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Search className="h-4 w-4 text-slate-400" /> View history
                </button>
                <button onClick={() => { setSearchOpen(false); navigate('/app/analytics'); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <Search className="h-4 w-4 text-slate-400" /> Open analytics
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
