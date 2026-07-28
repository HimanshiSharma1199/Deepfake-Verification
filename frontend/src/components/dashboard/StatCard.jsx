import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui';
import { cn } from '../../utils';
import { useCountUp } from '../../hooks/useCountUp';

const toneClasses = {
  primary: 'from-primary-500/10 to-primary-500/5 text-primary-600 dark:text-primary-400',
  secondary: 'from-secondary-500/10 to-secondary-500/5 text-secondary-600 dark:text-secondary-400',
  success: 'from-success-500/10 to-success-500/5 text-success-600 dark:text-success-400',
  warning: 'from-warning-500/10 to-warning-500/5 text-warning-600 dark:text-warning-400',
  danger: 'from-danger-500/10 to-danger-500/5 text-danger-600 dark:text-danger-400',
};

export function StatCard({ label, value, suffix, prefix, icon: Icon, trend, tone = 'primary', decimals = 0 }) {
  const animated = useCountUp(value, 1500);
  const display = decimals > 0 ? animated.toFixed(decimals) : Math.round(animated).toLocaleString();

  return (
    <Card hover className="relative overflow-hidden p-5">
      <div className={cn('absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-60', toneClasses[tone])} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold tracking-tight">
            {prefix}{display}{suffix}
          </p>
        </div>
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br', toneClasses[tone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend !== undefined && (
        <div className="relative mt-3 flex items-center gap-1.5">
          {trend >= 0 ? (
            <TrendingUp className="h-4 w-4 text-success-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-danger-500" />
          )}
          <span className={cn('text-xs font-medium', trend >= 0 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400')}>
            {trend >= 0 ? '+' : ''}{trend}% vs last week
          </span>
        </div>
      )}
    </Card>
  );
}
