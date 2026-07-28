import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatCompact(value) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

export function formatPercent(value, digits = 1) {
  return `${value.toFixed(digits)}%`;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(date),
  );
}

export function formatRelativeTime(date) {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(date);
}

export function getScoreColor(score) {
  if (score >= 75) return 'text-danger-500';
  if (score >= 50) return 'text-warning-500';
  if (score >= 25) return 'text-secondary-500';
  return 'text-success-500';
}

export function getScoreBg(score) {
  if (score >= 75) return 'bg-danger-500';
  if (score >= 50) return 'bg-warning-500';
  if (score >= 25) return 'bg-secondary-500';
  return 'bg-success-500';
}
