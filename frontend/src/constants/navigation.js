import {
  LayoutDashboard,
  ScanSearch,
  History,
  BarChart3,
  Settings,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Dashboard', to: '/app/dashboard', icon: LayoutDashboard },
  { label: 'New Verification', to: '/app/verify', icon: ScanSearch },
  { label: 'History', to: '/app/history', icon: History },
  { label: 'Analytics', to: '/app/analytics', icon: BarChart3 },
  { label: 'Settings', to: '/app/settings', icon: Settings },
];

export const SECONDARY_NAV = [
  { label: 'Trust Center', to: '/app/trust', icon: ShieldCheck },
  { label: 'Help & Support', to: '/app/help', icon: HelpCircle },
];

export const APP_NAME = 'TruthLens AI';
export const APP_TAGLINE = 'Detect AI-generated & manipulated media';

export const MEDIA_TYPES = {
  image: { label: 'Image', accept: 'image/*', color: 'primary' },
  video: { label: 'Video', accept: 'video/*', color: 'secondary' },
  audio: { label: 'Audio', accept: 'audio/*', color: 'success' },
};

export const VERDICT = {
  authentic: { label: 'Authentic', color: 'success', threshold: [0, 25] },
  suspicious: { label: 'Suspicious', color: 'warning', threshold: [25, 50] },
  likelyManipulated: { label: 'Likely Manipulated', color: 'secondary', threshold: [50, 75] },
  manipulated: { label: 'AI-Generated', color: 'danger', threshold: [75, 101] },
};

export function getVerdict(score) {
  if (score >= 75) return 'manipulated';
  if (score >= 50) return 'likelyManipulated';
  if (score >= 25) return 'suspicious';
  return 'authentic';
}
