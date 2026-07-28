import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe, Check } from 'lucide-react';
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  Button, Input, Badge, Avatar, Breadcrumb, Tabs, TabContent,
} from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { slideUp, staggerContainer } from '../animations';
import { cn } from '../utils';

function ToggleRow({ title, desc, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4">
      <div>
        <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{title}</p>
        <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          on ? 'bg-primary-600' : 'bg-slate-200 dark:bg-slate-700',
        )}
        aria-label={title}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm', on ? 'right-0.5' : 'left-0.5')}
        />
      </button>
    </div>
  );
}

export function SettingsPage() {
  const [tab, setTab] = useState('profile');
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();

  const tabs = [
    { label: 'Profile', value: 'profile', icon: <User className="h-4 w-4" /> },
    { label: 'Notifications', value: 'notifications', icon: <Bell className="h-4 w-4" /> },
    { label: 'Security', value: 'security', icon: <Shield className="h-4 w-4" /> },
    { label: 'Appearance', value: 'appearance', icon: <Palette className="h-4 w-4" /> },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Breadcrumb items={[{ label: 'Settings' }]} />
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your account and preferences.</p>
      </div>

      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <TabContent value="profile" activeValue={tab}>
          <motion.div variants={slideUp}>
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4">
                  <Avatar src={user?.avatar} name={user?.name ?? 'User'} size="lg" />
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="mt-1.5 text-xs text-slate-400">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Full Name" defaultValue={user?.name} />
                  <Input label="Email" defaultValue={user?.email} />
                  <Input label="Role" defaultValue={user?.role} />
                  <Input label="Organization" defaultValue={user?.org} />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="ghost">Cancel</Button>
                  <Button onClick={() => toast({ type: 'success', title: 'Profile updated', description: 'Your changes have been saved.' })}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabContent>

        <TabContent value="notifications" activeValue={tab}>
          <motion.div variants={slideUp}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what alerts you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'High-risk detections', desc: 'Alert me when media is flagged as AI-generated', defaultOn: true },
                  { title: 'Scan completion', desc: 'Notify me when a verification finishes processing', defaultOn: true },
                  { title: 'Weekly reports', desc: 'Email me a weekly summary of all scans', defaultOn: false },
                  { title: 'Quota warnings', desc: 'Alert me when approaching scan limits', defaultOn: true },
                ].map((item) => (
                  <ToggleRow key={item.title} title={item.title} desc={item.desc} defaultOn={item.defaultOn} />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabContent>

        <TabContent value="security" activeValue={tab}>
          <motion.div variants={slideUp}>
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your password and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Current Password" type="password" placeholder="••••••••" />
                  <Input label="New Password" type="password" placeholder="••••••••" />
                </div>
                <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-400 mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <Badge tone="success" variant="soft"><Check className="h-3 w-3" /> Enabled</Badge>
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={() => toast({ type: 'success', title: 'Security settings updated' })}>Update Security</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabContent>

        <TabContent value="appearance" activeValue={tab}>
          <motion.div variants={slideUp}>
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how TruthLens AI looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Theme</p>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    {['light', 'dark'].map((t) => (
                      <button
                        key={t}
                        onClick={() => { if (theme !== t) toggleTheme(); }}
                        className={cn(
                          'relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
                          theme === t
                            ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/30'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
                        )}
                      >
                        <div className={cn(
                          'h-16 w-full rounded-lg',
                          t === 'light' ? 'bg-gradient-to-br from-slate-50 to-slate-100' : 'bg-gradient-to-br from-slate-800 to-slate-950',
                        )}>
                          <div className="flex h-full items-center justify-center">
                            {t === 'light' ? <Globe className="h-6 w-6 text-slate-400" /> : <Globe className="h-6 w-6 text-slate-600" />}
                          </div>
                        </div>
                        <span className="text-sm font-medium capitalize">{t}</span>
                        {theme === t && (
                          <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabContent>
      </motion.div>
    </div>
  );
}
