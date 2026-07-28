import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils';

export function Tabs({ tabs, value, onChange, className }) {
  return (
    <div className={cn('inline-flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 p-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className="relative rounded-lg px-4 py-1.5 text-sm font-medium transition-colors focus-ring"
        >
          {value === tab.value && (
            <motion.div
              layoutId="tab-active"
              className="absolute inset-0 rounded-lg bg-white dark:bg-slate-700 shadow-soft dark:shadow-dark-soft"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span
            className={cn(
              'relative z-10 flex items-center gap-1.5',
              value === tab.value
                ? 'text-primary-600 dark:text-primary-300'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
            )}
          >
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export function TabContent({ value, activeValue, children }) {
  return (
    <AnimatePresence mode="wait">
      {value === activeValue && (
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="glass-card overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between p-5 text-left focus-ring"
            aria-expanded={open === i}
          >
            <span className="font-medium text-slate-900 dark:text-slate-100">{item.q}</span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-slate-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </motion.span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
