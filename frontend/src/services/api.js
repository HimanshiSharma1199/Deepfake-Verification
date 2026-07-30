import axios from 'axios';
import { VERIFICATIONS, STATS, NOTIFICATIONS, ACTIVITY } from '../constants/mockData';
import { getVerdict } from '../constants/navigation';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 120000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tl-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('[API Error]', error?.message);
    return Promise.reject(error);
  },
);

export default api;

export async function mockVerifyMedia(file, mediaType) {
  await new Promise((r) => setTimeout(r, 2000));
  const score = Math.floor(Math.random() * 100);
  const verdict = getVerdict(score);

  const flagsPool = [
    'GAN fingerprint detected',
    'Voice clone signature',
    'Lip-sync anomaly',
    'Edge artifact cluster',
    'Metadata timestamp gap',
    'Synthetic texture pattern',
    'Frequency domain anomaly',
    'Frame interpolation detected',
  ];
  const numFlags = score >= 50 ? 3 : score >= 25 ? 2 : 0;
  const flags = numFlags > 0
    ? [...flagsPool].sort(() => Math.random() - 0.5).slice(0, numFlags)
    : [];

  return {
    id: `vrf_${Math.random().toString(36).slice(2, 8)}`,
    fileName: file.name,
    mediaType,
    thumbnailUrl: '',
    score,
    verdict,
    fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    uploadedAt: new Date().toISOString(),
    processedIn: `${(1 + Math.random()).toFixed(1)}s`,
    flags,
  };
}

export const mockApi = {
  getDashboardStats: async () => {
    await new Promise((r) => setTimeout(r, 500));
    return STATS;
  },
  getVerifications: async () => {
    await new Promise((r) => setTimeout(r, 500));
    return VERIFICATIONS;
  },
  getNotifications: async () => {
    await new Promise((r) => setTimeout(r, 300));
    return NOTIFICATIONS;
  },
  getActivity: async () => {
    await new Promise((r) => setTimeout(r, 300));
    return ACTIVITY;
  },
};
export async function verifyImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    "/predict/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
export async function verifyVideo(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    "/predict/video",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}