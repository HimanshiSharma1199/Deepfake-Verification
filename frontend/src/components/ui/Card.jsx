import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

export const Card = forwardRef(function Card(
  { className, hover, glass, ...props },
  ref,
) {
  const base = glass
    ? 'glass-card'
    : 'bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-soft dark:shadow-dark-soft';
  return (
    <div
      ref={ref}
      className={cn(base, hover && 'transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-dark-lg hover:-translate-y-0.5', className)}
      {...props}
    />
  );
});

export function CardHeader({ className, ...props }) {
  return <div className={cn('p-6 pb-0', className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-lg font-semibold font-display', className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm text-slate-500 dark:text-slate-400 mt-1', className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-6', className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

export const MotionCard = motion(Card);
