import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X, ChevronLeft, Sparkles } from 'lucide-react';
import { NAV_ITEMS, SECONDARY_NAV, APP_NAME } from '../constants/navigation';
import { cn } from '../utils';
import { useAuth } from '../context/AuthContext';
import { Avatar, Button } from '../components/ui';

export function Sidebar({ open, onClose, collapsed, onToggleCollapse }) {
  const { user } = useAuth();

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
        className={cn(
          'fixed lg:sticky top-0 z-40 h-screen shrink-0 glass-nav flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 shadow-glow">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <span className="font-display text-lg font-bold tracking-tight">{APP_NAME}</span>
            )}
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-1">
          {!collapsed && (
            <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Workspace
            </p>
          )}
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                  collapsed && 'justify-center',
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary-600"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn('h-5 w-5 shrink-0', isActive && 'text-primary-600 dark:text-primary-400')} />
                  {!collapsed && <span>{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}

          {!collapsed && (
            <p className="px-3 pt-5 pb-2 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Resources
            </p>
          )}
          {(collapsed ? SECONDARY_NAV.slice(0, 1) : SECONDARY_NAV).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                  collapsed && 'justify-center',
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60',
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Upgrade card */}
        {!collapsed && (
          <div className="px-3 pb-3">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500 p-4">
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" />
              <div className="absolute -bottom-6 -left-2 h-12 w-12 rounded-full bg-white/10" />
              <Sparkles className="h-5 w-5 text-white" />
              <p className="mt-2 text-sm font-semibold text-white">Enterprise Plan</p>
              <p className="mt-0.5 text-xs text-white/80">{user?.scansUsed.toLocaleString()} / {user?.scansLimit.toLocaleString()} scans</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${((user?.scansUsed ?? 0) / (user?.scansLimit ?? 1)) * 100}%` }}
                />
              </div>
              <Button variant="ghost" size="sm" className="mt-3 w-full bg-white/10 text-white hover:bg-white/20">
                Manage Plan
              </Button>
            </div>
          </div>
        )}

        {/* User */}
        <div className="border-t border-slate-200/60 dark:border-slate-800/60 p-3">
          <div className={cn('flex items-center gap-3 rounded-xl p-2', collapsed && 'justify-center')}>
            <Avatar src={user?.avatar} name={user?.name ?? 'User'} size="sm" />
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{user?.name}</p>
                <p className="truncate text-xs text-slate-400">{user?.role}</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        className="fixed top-20 z-30 hidden lg:flex h-6 w-6 items-center justify-center rounded-full glass-nav shadow-soft dark:shadow-dark-soft text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all"
        style={{ left: collapsed ? 80 : 280 }}
        aria-label="Toggle sidebar"
      >
        <ChevronLeft className={cn('h-4 w-4 transition-transform', collapsed && 'rotate-180')} />
      </button>
    </>
  );
}
