import { cn } from '../../utils';

const tones = {
  primary: {
    solid: 'bg-primary-600 text-white',
    soft: 'bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300',
    outline: 'border border-primary-300 text-primary-700 dark:border-primary-700 dark:text-primary-300',
  },
  secondary: {
    solid: 'bg-secondary-500 text-white',
    soft: 'bg-secondary-50 text-secondary-700 dark:bg-secondary-950/50 dark:text-secondary-300',
    outline: 'border border-secondary-300 text-secondary-700 dark:border-secondary-700 dark:text-secondary-300',
  },
  success: {
    solid: 'bg-success-500 text-white',
    soft: 'bg-success-50 text-success-700 dark:bg-success-950/50 dark:text-success-300',
    outline: 'border border-success-300 text-success-700 dark:border-success-700 dark:text-success-300',
  },
  warning: {
    solid: 'bg-warning-500 text-white',
    soft: 'bg-warning-50 text-warning-700 dark:bg-warning-950/50 dark:text-warning-300',
    outline: 'border border-warning-300 text-warning-700 dark:border-warning-700 dark:text-warning-300',
  },
  danger: {
    solid: 'bg-danger-500 text-white',
    soft: 'bg-danger-50 text-danger-700 dark:bg-danger-950/50 dark:text-danger-300',
    outline: 'border border-danger-300 text-danger-700 dark:border-danger-700 dark:text-danger-300',
  },
  neutral: {
    solid: 'bg-slate-600 text-white',
    soft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    outline: 'border border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300',
  },
};

export function Badge({ tone = 'neutral', variant = 'soft', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        tones[tone][variant],
        className,
      )}
      {...props}
    />
  );
}

export function Tag({ tone = 'neutral', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium',
        tones[tone].soft,
        className,
      )}
      {...props}
    />
  );
}
