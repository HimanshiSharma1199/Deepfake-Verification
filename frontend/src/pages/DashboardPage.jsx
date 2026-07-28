import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ScanLine, ShieldCheck, AlertTriangle, Gauge, Activity, FileText,
  TrendingUp, ArrowRight, Upload, LogIn,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Breadcrumb } from '../components/ui';
import { StatCard } from '../components/dashboard/StatCard';
import { VerificationCard } from '../components/dashboard/VerificationCard';
import { slideUp, staggerContainer } from '../animations';
import {
  STATS, SCAN_TREND, MEDIA_DISTRIBUTION, VERDICT_DISTRIBUTION,
  VERIFICATIONS, ACTIVITY,
} from '../constants/mockData';
import { formatRelativeTime, formatNumber } from '../utils';

const activityIcons = {
  scan: ScanLine,
  upload: Upload,
  alert: AlertTriangle,
  report: FileText,
  login: LogIn,
};

const activityTones = {
  scan: 'text-primary-500 bg-primary-50 dark:bg-primary-950/40',
  upload: 'text-secondary-500 bg-secondary-50 dark:bg-secondary-950/40',
  alert: 'text-danger-500 bg-danger-50 dark:bg-danger-950/40',
  report: 'text-success-500 bg-success-50 dark:bg-success-950/40',
  login: 'text-slate-400 bg-slate-100 dark:bg-slate-800',
};

export function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Breadcrumb items={[{ label: 'Dashboard' }]} />
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Welcome back, Aarav</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Here's your forensic overview for this week.</p>
        </div>
        <Link to="/app/verify">
          <Button leftIcon={<ScanLine className="h-4 w-4" />}>New Verification</Button>
        </Link>
      </div>

      {/* Stat cards */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={slideUp}>
          <StatCard label="Total Scans" value={STATS.totalScans} icon={ScanLine} trend={12} tone="primary" />
        </motion.div>
        <motion.div variants={slideUp}>
          <StatCard label="AI Detected" value={STATS.aiDetectedRate} suffix="%" icon={AlertTriangle} trend={8} tone="danger" decimals={1} />
        </motion.div>
        <motion.div variants={slideUp}>
          <StatCard label="Authentic Rate" value={STATS.authenticRate} suffix="%" icon={ShieldCheck} trend={-3} tone="success" decimals={1} />
        </motion.div>
        <motion.div variants={slideUp}>
          <StatCard label="Avg Confidence" value={STATS.avgConfidence} suffix="%" icon={Gauge} trend={2} tone="secondary" decimals={1} />
        </motion.div>
      </motion.div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Scan trend */}
        <motion.div variants={slideUp} initial="hidden" animate="show" className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Scan Activity</CardTitle>
                <CardDescription>Daily verification volume and AI detections</CardDescription>
              </div>
              <Badge tone="primary" variant="soft"><TrendingUp className="h-3 w-3" /> +12%</Badge>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={SCAN_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="detectGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
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
                      boxShadow: '0 8px 30px -8px rgba(15,23,42,0.12)',
                    }}
                  />
                  <Area type="monotone" dataKey="scans" stroke="#4F46E5" strokeWidth={2} fill="url(#scanGrad)" name="Total Scans" />
                  <Area type="monotone" dataKey="detected" stroke="#EF4444" strokeWidth={2} fill="url(#detectGrad)" name="AI Detected" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Media distribution */}
        <motion.div variants={slideUp} initial="hidden" animate="show">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Media Types</CardTitle>
              <CardDescription>Distribution by format</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={MEDIA_DISTRIBUTION} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4}>
                    {MEDIA_DISTRIBUTION.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255,255,255,0.95)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '12px',
                      fontSize: '13px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {MEDIA_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ background: item.color }} />
                      <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                    </div>
                    <span className="font-medium">{formatNumber(item.value)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Verdict distribution + Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div variants={slideUp} initial="hidden" animate="show" className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Verdict Breakdown</CardTitle>
              <CardDescription>Classification across all scans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {VERDICT_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-xs text-slate-500 dark:text-slate-400">{item.name}</span>
                    </div>
                    <p className="mt-2 font-display text-2xl font-bold">{formatNumber(item.value)}</p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {((item.value / STATS.totalScans) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={VERDICT_DISTRIBUTION} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(148,163,184,0.08)' }}
                    contentStyle={{
                      background: 'rgba(255,255,255,0.95)',
                      border: '1px solid rgba(148,163,184,0.2)',
                      borderRadius: '12px',
                      fontSize: '13px',
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {VERDICT_DISTRIBUTION.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent activity */}
        <motion.div variants={slideUp} initial="hidden" animate="show">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest events</CardDescription>
              </div>
              <Activity className="h-5 w-5 text-slate-400" />
            </CardHeader>
            <CardContent className="space-y-1">
              {ACTIVITY.map((item) => {
                const Icon = activityIcons[item.icon];
                return (
                  <div key={item.id} className="flex items-start gap-3 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activityTones[item.icon]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.action}</p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">{item.detail}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{formatRelativeTime(item.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent verifications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold">Recent Verifications</h2>
          <Link to="/app/history">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>View all</Button>
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {VERIFICATIONS.slice(0, 4).map((record) => (
            <VerificationCard key={record.id} record={record} />
          ))}
        </div>
      </div>
    </div>
  );
}
