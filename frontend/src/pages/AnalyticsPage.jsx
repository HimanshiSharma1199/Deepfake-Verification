import { motion } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { ScanLine, ShieldCheck, AlertTriangle, Gauge } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Breadcrumb } from '../components/ui';
import { StatCard } from '../components/dashboard/StatCard';
import {
  SCAN_TREND, CONFIDENCE_TREND, DETECTION_RADAR, STATS,
} from '../constants/mockData';
import { slideUp, staggerContainer } from '../animations';

export function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div>
        <Breadcrumb items={[{ label: 'Analytics' }]} />
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Deep dive into detection trends and model performance.</p>
      </div>

      {/* Stat cards */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={slideUp}>
          <StatCard label="Total Scans" value={STATS.totalScans} icon={ScanLine} trend={12} tone="primary" />
        </motion.div>
        <motion.div variants={slideUp}>
          <StatCard label="Avg Confidence" value={STATS.avgConfidence} suffix="%" icon={Gauge} trend={2} tone="secondary" decimals={1} />
        </motion.div>
        <motion.div variants={slideUp}>
          <StatCard label="AI Detected" value={STATS.aiDetectedRate} suffix="%" icon={AlertTriangle} trend={8} tone="danger" decimals={1} />
        </motion.div>
        <motion.div variants={slideUp}>
          <StatCard label="Authentic Rate" value={STATS.authenticRate} suffix="%" icon={ShieldCheck} trend={-3} tone="success" decimals={1} />
        </motion.div>
      </motion.div>

      {/* Confidence trend */}
      <motion.div variants={slideUp} initial="hidden" animate="show">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Confidence & Accuracy Trend</CardTitle>
              <CardDescription>Model performance over the last 6 weeks</CardDescription>
            </div>
            <Badge tone="success" variant="soft">Improving</Badge>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={CONFIDENCE_TREND} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(148,163,184,0.2)',
                    borderRadius: '12px',
                    fontSize: '13px',
                  }}
                />
                <Line type="monotone" dataKey="confidence" stroke="#4F46E5" strokeWidth={2.5} dot={{ r: 4 }} name="Confidence %" />
                <Line type="monotone" dataKey="accuracy" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 4 }} name="Accuracy %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scan trend + Detection radar */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div variants={slideUp} initial="hidden" animate="show">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Weekly Scan Volume</CardTitle>
              <CardDescription>Scans vs AI detections per day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={SCAN_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255,255,255,0.95)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '12px',
                      fontSize: '13px',
                    }}
                  />
                  <Area type="monotone" dataKey="scans" stroke="#4F46E5" strokeWidth={2} fill="url(#aGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={slideUp} initial="hidden" animate="show">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Detection Capabilities</CardTitle>
              <CardDescription>Per-signal analysis strength</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={DETECTION_RADAR}>
                  <PolarGrid className="stroke-slate-200 dark:stroke-slate-800" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <Radar dataKey="value" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.25} strokeWidth={2} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255,255,255,0.95)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '12px',
                      fontSize: '13px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
