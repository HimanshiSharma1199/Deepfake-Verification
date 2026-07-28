import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Circle, Upload, ScanLine, AudioLines, FileSearch, FileBarChart } from 'lucide-react';
import { cn, formatRelativeTime } from '../../utils';
import { ANALYSIS_TIMELINE } from '../../constants/mockData';

const statusConfig = {
  complete: { icon: CheckCircle2, className: 'text-success-500 bg-success-50 dark:bg-success-950/40' },
  processing: { icon: Loader2, className: 'text-primary-500 bg-primary-50 dark:bg-primary-950/40', animate: true },
  pending: { icon: Circle, className: 'text-slate-300 bg-slate-100 dark:bg-slate-800' },
};

const stepIcons = [Upload, ScanLine, AudioLines, FileSearch, FileBarChart, Loader2];

export function AnalysisTimeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-800" />

      <div className="space-y-5">
        {ANALYSIS_TIMELINE.map((event, i) => {
          const config = statusConfig[event.status];
          const Icon = config.icon;
          const StepIcon = stepIcons[i] ?? Circle;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="relative flex gap-4"
            >
              <div className={cn('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full', config.className)}>
                {config.animate ? (
                  <Icon className="h-5 w-5 animate-spin" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{event.step}</p>
                  <span className="text-xs text-slate-400">{formatRelativeTime(event.timestamp)}</span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{event.detail}</p>
                {event.status === 'complete' && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-success-600 dark:text-success-400">
                    <StepIcon className="h-3.5 w-3.5" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
