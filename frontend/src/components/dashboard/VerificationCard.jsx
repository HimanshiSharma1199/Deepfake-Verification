import { motion } from 'framer-motion';
import { Image, Video, Music, AlertTriangle, CheckCircle2, Clock, FileText } from 'lucide-react';
import { Card, Badge, ProgressRing, Button } from '../ui';
import { VERDICT } from '../../constants/navigation';
import { cn, formatRelativeTime } from '../../utils';

const mediaIcons = {
  image: Image,
  video: Video,
  audio: Music,
};

const verdictTone = {
  authentic: 'success',
  suspicious: 'warning',
  likelyManipulated: 'secondary',
  manipulated: 'danger',
};

export function VerificationCard({ record, onClick }) {
  const Icon = mediaIcons[record.mediaType];
  const verdict = VERDICT[record.verdict];
  const tone = verdictTone[record.verdict];

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
      <Card hover className="overflow-hidden cursor-pointer" onClick={onClick}>
        {/* Thumbnail */}
        <div className="relative h-36 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img src={record.thumbnailUrl} alt={record.fileName} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <div className="flex items-center gap-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 text-xs font-medium">
              <Icon className="h-3.5 w-3.5" />
              <span className="capitalize">{record.mediaType}</span>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="truncate text-xs font-medium text-white drop-shadow">{record.fileName}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <Badge tone={tone} variant="soft">
              {record.verdict === 'authentic' ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
              {verdict.label}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(record.uploadedAt)}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <ProgressRing value={record.score} size={64} strokeWidth={6} label={`${record.score}`} sublabel="score" />
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">File size</span>
                <span className="font-medium">{record.fileSize}</span>
              </div>
              {record.duration && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Duration</span>
                  <span className="font-medium">{record.duration}</span>
                </div>
              )}
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Processed in</span>
                <span className="font-medium">{record.processedIn}</span>
              </div>
            </div>
          </div>

          {record.flags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {record.flags.slice(0, 2).map((flag, i) => (
                <span key={i} className={cn('rounded-md px-2 py-0.5 text-xs', tone === 'danger' ? 'bg-danger-50 text-danger-700 dark:bg-danger-950/40 dark:text-danger-300' : tone === 'secondary' ? 'bg-secondary-50 text-secondary-700 dark:bg-secondary-950/40 dark:text-secondary-300' : 'bg-warning-50 text-warning-700 dark:bg-warning-950/40 dark:text-warning-300')}>
                  {flag}
                </span>
              ))}
              {record.flags.length > 2 && (
                <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs text-slate-500">
                  +{record.flags.length - 2} more
                </span>
              )}
            </div>
          )}

          <Button variant="outline" size="sm" className="mt-4 w-full" leftIcon={<FileText className="h-3.5 w-3.5" />}>
            View Report
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export function MediaPreviewCard({ type, fileName, thumbnailUrl }) {
  const Icon = mediaIcons[type];
  return (
    <Card className="relative aspect-video overflow-hidden">
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt={fileName} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
            <Icon className="h-7 w-5 text-primary-500" />
          </div>
          <p className="text-sm font-medium text-slate-500">{fileName}</p>
        </div>
      )}
    </Card>
  );
}
