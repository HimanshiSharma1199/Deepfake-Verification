import { forwardRef, useId, useState } from 'react';
import { cn } from '../../utils';

export const Input = forwardRef(function Input(
  { label, error, success, leftIcon, rightIcon, hint, className, id, onFocus, onBlur, ...props },
  ref,
) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            'h-11 w-full rounded-xl border bg-white dark:bg-slate-900 px-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200 focus-ring',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error
              ? 'border-danger-400 dark:border-danger-600'
              : success
                ? 'border-success-400 dark:border-success-600'
                : focused
                  ? 'border-primary-500 dark:border-primary-400'
                  : 'border-slate-300 dark:border-slate-700',
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            {rightIcon}
          </span>
        )}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-danger-600 dark:text-danger-400">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
});
