import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ScanSearch, ShieldCheck, Zap, Lock, BarChart3, Webhook,
  ArrowRight, Sparkles, CheckCircle2, Play,
} from 'lucide-react';
import { LandingNavbar } from '../layouts/LandingNavbar';
import { Footer } from '../layouts/Footer';
import { Button, Card, Badge, Accordion } from '../components/ui';
import { useCountUp } from '../hooks/useCountUp';
import { FEATURES, STATS_LANDING, STEPS, FAQS } from '../constants/mockData';
import { slideUp, staggerContainer, fadeIn } from '../animations';

const iconMap = { ScanSearch, ShieldCheck, Zap, Lock, BarChart3, Webhook };

function AnimatedStat({ value, suffix, label }) {
  const animated = useCountUp(value, 2000);
  const display = value % 1 !== 0 ? animated.toFixed(1) : Math.round(animated).toLocaleString();
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-bold tracking-tight gradient-text md:text-5xl">
        {display}{suffix}
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      <LandingNavbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-mesh dark:bg-gradient-mesh-dark" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div variants={slideUp} className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary-500" />
              <span className="text-slate-600 dark:text-slate-300">AI-powered forensic media verification</span>
              <Badge tone="primary" variant="solid" className="ml-1">New</Badge>
            </motion.div>

            <motion.h1 variants={slideUp} className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-7xl">
              See through the
              <span className="block gradient-text">fabrication.</span>
            </motion.h1>

            <motion.p variants={slideUp} className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400 text-balance md:text-xl">
              TruthLens AI detects AI-generated and manipulated images, videos, and audio with forensic-grade precision — in seconds.
            </motion.p>

            <motion.div variants={slideUp} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/app/verify">
                <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Start Verifying
                </Button>
              </Link>
              <Link to="/app/dashboard">
                <Button variant="outline" size="lg" leftIcon={<Play className="h-4 w-4" />}>
                  View Dashboard
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={slideUp} className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success-500" /> No credit card</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success-500" /> 500 free scans</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-success-500" /> Zero retention</div>
            </motion.div>
          </motion.div>

          {/* Hero preview */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-16 max-w-5xl"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-2xl" />
              <Card glass className="relative overflow-hidden p-2">
                <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                  {/* Mock dashboard preview */}
                  <div className="grid grid-cols-12 gap-0">
                    {/* Mini sidebar */}
                    <div className="col-span-2 hidden md:flex flex-col gap-3 p-4 border-r border-slate-200/60 dark:border-slate-800/60">
                      {[ScanSearch, ShieldCheck, BarChart3, Zap].map((Icon, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5">
                          <Icon className={`h-4 w-4 ${i === 0 ? 'text-primary-500' : 'text-slate-400'}`} />
                          {i === 0 && <span className="text-xs font-medium">Verify</span>}
                        </div>
                      ))}
                    </div>
                    {/* Main content */}
                    <div className="col-span-12 md:col-span-10 p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                          <div className="mt-2 h-3 w-48 rounded bg-slate-100 dark:bg-slate-800/60" />
                        </div>
                        <div className="h-8 w-24 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500" />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: 'Total Scans', value: '1,247', tone: 'from-primary-500/10' },
                          { label: 'AI Detected', value: '24.8%', tone: 'from-danger-500/10' },
                          { label: 'Confidence', value: '94.3%', tone: 'from-success-500/10' },
                        ].map((stat) => (
                          <div key={stat.label} className={`rounded-xl bg-gradient-to-br ${stat.tone} to-transparent p-3`}>
                            <p className="text-xs text-slate-400">{stat.label}</p>
                            <p className="mt-1 font-display text-xl font-bold">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                      {/* Mock chart */}
                      <div className="flex items-end gap-2 h-24 pt-2">
                        {[40, 65, 45, 80, 55, 90, 70, 60, 85, 50, 75, 95].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                            className="flex-1 rounded-t-md bg-gradient-to-t from-primary-500/40 to-primary-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS_LANDING.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-100px' }} className="mx-auto max-w-2xl text-center">
            <motion.div variants={slideUp}>
              <Badge tone="primary" variant="soft">Features</Badge>
            </motion.div>
            <motion.h2 variants={slideUp} className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl text-balance">
              Everything you need to verify authenticity
            </motion.h2>
            <motion.p variants={slideUp} className="mt-4 text-lg text-slate-600 dark:text-slate-400 text-balance">
              A complete forensic toolkit for the synthetic media era.
            </motion.p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <motion.div key={feature.title} variants={slideUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                  <Card hover className="h-full p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
                      <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-white/50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
            <motion.div variants={slideUp}><Badge tone="secondary" variant="soft">How it works</Badge></motion.div>
            <motion.h2 variants={slideUp} className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl text-balance">
              Three steps to the truth
            </motion.h2>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative"
              >
                <Card glass className="h-full p-8">
                  <span className="font-display text-6xl font-bold gradient-text opacity-20">{step.step}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                </Card>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 z-10 h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full glass">
                    <ArrowRight className="h-4 w-4 text-primary-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-500" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 animate-float" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 animate-float" style={{ animationDelay: '3s' }} />
            <div className="relative px-8 py-16 text-center md:px-16 md:py-20">
              <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl text-balance">
                Start detecting deepfakes today
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/80 text-balance">
                Join newsrooms, governments, and enterprises using TruthLens AI to combat synthetic media.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link to="/app/verify">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-slate-100 hover:shadow-none" rightIcon={<ArrowRight className="h-5 w-5" />}>
                    Get Started Free
                  </Button>
                </Link>
                <Link to="/app/dashboard">
                  <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">
                    Explore Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28 bg-white/50 dark:bg-slate-900/30 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
            <motion.div variants={slideUp}><Badge tone="primary" variant="soft">FAQ</Badge></motion.div>
            <motion.h2 variants={slideUp} className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Frequently asked questions
            </motion.h2>
          </motion.div>
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">
            <Accordion items={FAQS} />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
