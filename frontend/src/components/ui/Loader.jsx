import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils';

export function Loader({ className, size = 24 }) {
  return <Loader2 className={cn('animate-spin text-primary-500', className)} style={{ width: size, height: size }} />;
}

export function FullPageLoader({ label = 'Loading...' }) {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4">
      <div className="relative">
        <motion.div
          className="h-12 w-12 rounded-full border-2 border-primary-200 dark:border-primary-900"
          style={{ borderTopColor: '#4F46E5' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500" />
        </div>
      </div>
      <p className="text-sm text-slate-400 dark:text-slate-500">{label}</p>
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={cn('shimmer rounded-lg', className)} />;
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-2 w-3/4" />
    </div>
  );
}

export function CircularLoader({ size = 40 }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-transparent"
        style={{ borderTopColor: '#4F46E5', borderRightColor: '#06B6D4' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
