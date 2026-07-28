import { motion } from 'framer-motion';
import { cn } from '../../utils';

export function ProgressRing({ value, size = 120, strokeWidth = 10, className, label, sublabel }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const colorClass =
    value >= 75 ? 'text-danger-500' : value >= 50 ? 'text-warning-500' : value >= 25 ? 'text-secondary-500' : 'text-success-500';

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-slate-200 dark:stroke-slate-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={cn(colorClass, 'transition-colors')}
          stroke="currentColor"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className={cn('text-2xl font-bold font-display', colorClass)}>{label}</span>}
        {sublabel && <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
}

const toneClasses = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
};

export function ProgressBar({ value, className, tone = 'primary', height = 'h-2' }) {
  return (
    <div className={cn('w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800', height, className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn('h-full rounded-full', toneClasses[tone])}
      />
    </div>
  );
}
