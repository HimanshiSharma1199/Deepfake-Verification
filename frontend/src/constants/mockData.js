const now = Date.now();
const ago = (min) => new Date(now - min * 60000).toISOString();

export const USER_PROFILE = {
  name: 'Aarav Mehta',
  email: 'aarav.mehta@truthlens.ai',
  role: 'Forensics Analyst',
  avatar: 'https://images.pexels.com/photos/220817/pexels-photo-220817.jpeg?auto=compress&cs=tinysrgb&w=200',
  plan: 'Enterprise',
  scansUsed: 1247,
  scansLimit: 5000,
  joinedAt: '2025-01-15',
  org: 'TruthLens Defense Labs',
};

export const STATS = {
  totalScans: 1247,
  authenticRate: 61.2,
  aiDetectedRate: 24.8,
  manipulatedRate: 14.0,
  avgConfidence: 94.3,
  activeThreats: 8,
  responseTime: 1.4,
  teamMembers: 12,
};

export const SCAN_TREND = [
  { day: 'Mon', scans: 42, detected: 12 },
  { day: 'Tue', scans: 58, detected: 18 },
  { day: 'Wed', scans: 71, detected: 22 },
  { day: 'Thu', scans: 65, detected: 15 },
  { day: 'Fri', scans: 89, detected: 31 },
  { day: 'Sat', scans: 34, detected: 9 },
  { day: 'Sun', scans: 28, detected: 7 },
];

export const MEDIA_DISTRIBUTION = [
  { name: 'Images', value: 642, color: '#4F46E5' },
  { name: 'Videos', value: 384, color: '#06B6D4' },
  { name: 'Audio', value: 221, color: '#10B981' },
];

export const VERDICT_DISTRIBUTION = [
  { name: 'Authentic', value: 762, color: '#10B981' },
  { name: 'Suspicious', value: 178, color: '#F59E0B' },
  { name: 'Likely Manipulated', value: 156, color: '#06B6D4' },
  { name: 'AI-Generated', value: 151, color: '#EF4444' },
];

export const CONFIDENCE_TREND = [
  { week: 'W1', confidence: 88, accuracy: 91 },
  { week: 'W2', confidence: 90, accuracy: 93 },
  { week: 'W3', confidence: 92, accuracy: 94 },
  { week: 'W4', confidence: 93, accuracy: 95 },
  { week: 'W5', confidence: 94, accuracy: 96 },
  { week: 'W6', confidence: 94, accuracy: 96 },
];

export const DETECTION_RADAR = [
  { metric: 'Faces', value: 92 },
  { metric: 'Artifacts', value: 88 },
  { metric: 'Noise', value: 85 },
  { metric: 'Metadata', value: 95 },
  { metric: 'Frequency', value: 79 },
  { metric: 'Texture', value: 90 },
];

export const VERIFICATIONS = [
  {
    id: 'vrf_8a3f21',
    fileName: 'press_briefing_clip.mp4',
    mediaType: 'video',
    thumbnailUrl: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=400',
    score: 87,
    verdict: 'manipulated',
    fileSize: '24.3 MB',
    duration: '0:42',
    uploadedAt: ago(12),
    processedIn: '1.2s',
    flags: ['Voice clone detected', 'Lip-sync anomaly', 'Frame interpolation'],
  },
  {
    id: 'vrf_2b9d14',
    fileName: 'ceo_announcement.jpg',
    mediaType: 'image',
    thumbnailUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    score: 14,
    verdict: 'authentic',
    fileSize: '3.1 MB',
    uploadedAt: ago(48),
    processedIn: '0.8s',
    flags: [],
  },
  {
    id: 'vrf_5c1e87',
    fileName: 'leaked_audio_call.wav',
    mediaType: 'audio',
    thumbnailUrl: 'https://images.pexels.com/photos/4144/city-music.jpg?auto=compress&cs=tinysrgb&w=400',
    score: 63,
    verdict: 'likelyManipulated',
    fileSize: '8.7 MB',
    duration: '2:15',
    uploadedAt: ago(95),
    processedIn: '1.6s',
    flags: ['Synthetic voice signature', 'Background noise mismatch'],
  },
  {
    id: 'vrf_7f2a09',
    fileName: 'satellite_imagery_north.png',
    mediaType: 'image',
    thumbnailUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
    score: 38,
    verdict: 'suspicious',
    fileSize: '12.4 MB',
    uploadedAt: ago(180),
    processedIn: '1.1s',
    flags: ['Edge artifact cluster', 'Metadata timestamp gap'],
  },
  {
    id: 'vrf_9d4c33',
    fileName: 'interview_response.mov',
    mediaType: 'video',
    thumbnailUrl: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=400',
    score: 91,
    verdict: 'manipulated',
    fileSize: '156 MB',
    duration: '3:28',
    uploadedAt: ago(320),
    processedIn: '2.4s',
    flags: ['Deepfake face swap', 'Audio desync', 'GAN fingerprint'],
  },
  {
    id: 'vrf_1e8b47',
    fileName: 'product_launch_photo.jpg',
    mediaType: 'image',
    thumbnailUrl: 'https://images.pexels.com/photos/3182836/pexels-photo-3182836.jpeg?auto=compress&cs=tinysrgb&w=400',
    score: 8,
    verdict: 'authentic',
    fileSize: '5.2 MB',
    uploadedAt: ago(480),
    processedIn: '0.7s',
    flags: [],
  },
  {
    id: 'vrf_6a3f92',
    fileName: 'podcast_episode.mp3',
    mediaType: 'audio',
    thumbnailUrl: 'https://images.pexels.com/photos/4087996/pexels-photo-4087996.jpeg?auto=compress&cs=tinysrgb&w=400',
    score: 72,
    verdict: 'likelyManipulated',
    fileSize: '34.1 MB',
    duration: '47:22',
    uploadedAt: ago(720),
    processedIn: '1.9s',
    flags: ['Cloned voiceprint', 'Unnatural prosody'],
  },
  {
    id: 'vrf_3b7d15',
    fileName: 'news_broadcast.mp4',
    mediaType: 'video',
    thumbnailUrl: 'https://images.pexels.com/photos/2773282/pexels-photo-2773282.jpeg?auto=compress&cs=tinysrgb&w=400',
    score: 21,
    verdict: 'authentic',
    fileSize: '89 MB',
    duration: '1:15',
    uploadedAt: ago(1440),
    processedIn: '1.3s',
    flags: [],
  },
];

export const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'High-risk detection',
    message: 'Video "press_briefing_clip.mp4" flagged as AI-generated with 87% confidence.',
    type: 'danger',
    timestamp: ago(12),
    read: false,
  },
  {
    id: 'n2',
    title: 'Scan complete',
    message: 'Image "ceo_announcement.jpg" verified as authentic.',
    type: 'success',
    timestamp: ago(48),
    read: false,
  },
  {
    id: 'n3',
    title: 'Weekly report ready',
    message: 'Your forensics summary for this week is available for download.',
    type: 'info',
    timestamp: ago(180),
    read: true,
  },
  {
    id: 'n4',
    title: 'Quota approaching',
    message: 'You have used 1,247 of 5,000 monthly scans.',
    type: 'warning',
    timestamp: ago(300),
    read: true,
  },
  {
    id: 'n5',
    title: 'New team member',
    message: 'Priya Sharma joined your organization as an analyst.',
    type: 'info',
    timestamp: ago(720),
    read: true,
  },
];

export const ACTIVITY = [
  { id: 'a1', action: 'Verification completed', detail: 'press_briefing_clip.mp4 — AI-Generated (87%)', timestamp: ago(12), icon: 'scan' },
  { id: 'a2', action: 'Media uploaded', detail: 'ceo_announcement.jpg (3.1 MB)', timestamp: ago(48), icon: 'upload' },
  { id: 'a3', action: 'Alert triggered', detail: 'High-risk deepfake detected in queue', timestamp: ago(95), icon: 'alert' },
  { id: 'a4', action: 'Report exported', detail: 'Weekly forensics summary — PDF', timestamp: ago(180), icon: 'report' },
  { id: 'a5', action: 'Session started', detail: 'Signed in from Mumbai, IN', timestamp: ago(320), icon: 'login' },
  { id: 'a6', action: 'Verification completed', detail: 'interview_response.mov — AI-Generated (91%)', timestamp: ago(340), icon: 'scan' },
];

export const ANALYSIS_TIMELINE = [
  { id: 't1', step: 'Upload received', status: 'complete', detail: 'File integrity verified, 24.3 MB', timestamp: ago(13) },
  { id: 't2', step: 'Preprocessing', status: 'complete', detail: 'Decoded 42 frames at 1080p, extracted audio track', timestamp: ago(12) },
  { id: 't3', step: 'Frame-level analysis', status: 'complete', detail: 'Analyzed facial landmarks across 42 frames', timestamp: ago(12) },
  { id: 't4', step: 'Audio forensics', status: 'complete', detail: 'Detected synthetic voiceprint signature', timestamp: ago(12) },
  { id: 't5', step: 'Metadata audit', status: 'complete', detail: 'EXIF stripped, encoding pipeline traced', timestamp: ago(12) },
  { id: 't6', step: 'Generating report', status: 'processing', detail: 'Compiling forensic evidence package...', timestamp: ago(0) },
];

export const FAQS = [
  {
    q: 'How does TruthLens AI detect manipulated media?',
    a: 'Our engine combines multi-modal deep learning models that analyze facial landmarks, audio spectrograms, pixel-level artifacts, metadata, and GAN fingerprints. Each signal is weighted to produce a confidence score from 0 to 100.',
  },
  {
    q: 'What media types are supported?',
    a: 'TruthLens AI currently supports images (JPEG, PNG, WebP), videos (MP4, MOV, WebM), and audio files (WAV, MP3, FLAC). We continuously expand our supported formats with each release.',
  },
  {
    q: 'How accurate is the detection?',
    a: 'Our models achieve 94.3% average confidence on benchmark datasets, with sub-2-second processing for most files. Accuracy improves continuously as our training corpus grows.',
  },
  {
    q: 'Is my uploaded media stored?',
    a: 'Files are processed in-memory and permanently deleted after analysis. We never retain, train on, or share your media. All processing is encrypted end-to-end.',
  },
  {
    q: 'Can I integrate TruthLens AI into my own platform?',
    a: 'Yes. Our REST API and webhook system let you embed forensic verification into any workflow. Enterprise plans include dedicated API keys, batch processing, and SLA guarantees.',
  },
  {
    q: 'What pricing plans are available?',
    a: 'We offer Starter (500 scans/mo), Pro (2,000 scans/mo), and Enterprise (unlimited) plans. All plans include core detection, with advanced features like batch API and custom models on higher tiers.',
  },
];

export const FEATURES = [
  {
    icon: 'ScanSearch',
    title: 'Multi-Modal Detection',
    description: 'Analyze images, video, and audio through a single unified pipeline. Our models inspect every frame and waveform for synthetic artifacts.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Forensic-Grade Evidence',
    description: 'Every verdict ships with a tamper-proof evidence package — heatmap overlays, frequency analysis, and a complete chain of custody.',
  },
  {
    icon: 'Zap',
    title: 'Real-Time Verdicts',
    description: 'Sub-2-second processing on average. Stream live media for continuous verification with instant alerts on high-risk detections.',
  },
  {
    icon: 'Lock',
    title: 'Zero-Retention Privacy',
    description: 'Files are processed in-memory and permanently purged. Your media is never stored, trained on, or shared with third parties.',
  },
  {
    icon: 'BarChart3',
    title: 'Analytics Dashboard',
    description: 'Track detection trends, confidence trajectories, and threat distribution with interactive, exportable visualizations.',
  },
  {
    icon: 'Webhook',
    title: 'API & Webhooks',
    description: 'Embed verification into any workflow with our REST API. Trigger automated responses via webhooks on high-risk detections.',
  },
];

export const STATS_LANDING = [
  { value: 94.3, suffix: '%', label: 'Detection Confidence' },
  { value: 1.4, suffix: 's', label: 'Avg. Processing Time' },
  { value: 2.1, suffix: 'M+', label: 'Media Files Scanned' },
  { value: 180, suffix: '+', label: 'Countries Protected' },
];

export const STEPS = [
  {
    step: '01',
    title: 'Upload Media',
    description: 'Drag in an image, video, or audio file. We accept all major formats up to 2 GB.',
  },
  {
    step: '02',
    title: 'AI Forensic Analysis',
    description: 'Our multi-modal engine inspects pixels, frames, waveforms, and metadata for synthetic signatures.',
  },
  {
    step: '03',
    title: 'Receive Verdict',
    description: 'Get a confidence score, evidence heatmap, and a downloadable forensic report in seconds.',
  },
];
