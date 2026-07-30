import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Image as ImageIcon, Video, Music, ScanSearch,
  FileCheck2, AlertTriangle, Download, RotateCcw, Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, ProgressRing, Breadcrumb } from '../components/ui';
import { AnalysisTimeline } from '../components/dashboard/AnalysisTimeline';
import { useToast } from '../components/ui/Toast';
import { MEDIA_TYPES, VERDICT, getVerdict } from '../constants/navigation';
import { verifyImage, verifyVideo } from '../services/api';
import { cn } from '../utils';
import { slideUp, staggerContainer } from '../animations';

const verdictTone = {
  authentic: 'success',
  suspicious: 'warning',
  likelyManipulated: 'secondary',
  manipulated: 'danger',
};

export function VerifyPage() {
  const [mediaType, setMediaType] = useState('image');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [phase, setPhase] = useState('idle');
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const { toast } = useToast();

  const handleFile = useCallback((f) => {
    setFile(f);
    setPhase('idle');
    setResult(null);
    if (f.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(f));
    } else {
      setPreviewUrl(null);
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

 const handleAnalyze = async () => {
  if (!file) return;

  setPhase("analyzing");

  try {
    let res;

    if (mediaType === "image") {
      res = await verifyImage(file);
    } else if (mediaType === "video") {
      res = await verifyVideo(file);
    } else {
      throw new Error("Media type not supported yet.");
    }

    const isReal = res.prediction.toUpperCase() === "REAL";

    const score = Number(res.confidence.toFixed(2));

        setResult({
      score,
      confidence: res.confidence,
      verdict: isReal ? "success" : "danger",
      flags: [],
      processedIn: "1.2 sec",
      fakeFrames: res.fake_frames ?? 0,
      realFrames: res.real_frames ?? 0,
      analyzedFrames: res.analyzed_frames ?? 0,
      totalFrames: res.total_frames ?? 0,
    });
    setPhase("result");

    toast({
      type: "success",
      title: "Analysis Complete",
      description: `${res.prediction} (${res.confidence}%)`,
    });

  } catch (err) {
  console.error("FULL ERROR:", err);
  console.log("Response:", err.response);
  console.log("Data:", err.response?.data);

  setPhase("idle");

  toast({
    type: "error",
    title: "Analysis Failed",
    description:
      err.response?.data?.detail ||
      err.message ||
      "Unknown Error",
  });
}
};

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setPhase('idle');
    setResult(null);
  };

  const mediaIcons = { image: ImageIcon, video: Video, audio: Music };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <Breadcrumb items={[{ label: 'New Verification' }]} />
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Verify Media</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Upload an image, video, or audio file for AI forensic analysis.</p>
      </div>

      {/* Media type selector */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-3 gap-3">
        {Object.keys(MEDIA_TYPES).map((key) => {
          const Icon = mediaIcons[key];
          const config = MEDIA_TYPES[key];
          return (
            <motion.button
              key={key}
              variants={slideUp}
              onClick={() => setMediaType(key)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all',
                mediaType === key
                  ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
              )}
            >
              <div className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                mediaType === key ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500',
              )}>
                <Icon className="h-5 w-5" />
              </div>
              <span className={cn('text-sm font-medium', mediaType === key ? 'text-primary-700 dark:text-primary-300' : 'text-slate-600 dark:text-slate-400')}>
                {config.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upload zone */}
        <motion.div variants={slideUp} initial="hidden" animate="show">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upload Media</CardTitle>
              <CardDescription>Drag & drop or browse — max 2 GB</CardDescription>
            </CardHeader>
            <CardContent>
              {!file ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-input')?.click()}
                  className={cn(
                    'relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 transition-all',
                    dragging
                      ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/30 scale-[1.02]'
                      : 'border-slate-300 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-600',
                  )}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept={MEDIA_TYPES[mediaType].accept}
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                  <motion.div
                    animate={{ y: dragging ? -8 : 0 }}
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10"
                  >
                    <Upload className="h-8 w-8 text-primary-500" />
                  </motion.div>
                  <div className="text-center">
                    <p className="font-medium text-slate-700 dark:text-slate-300">
                      Drop your {MEDIA_TYPES[mediaType].label.toLowerCase()} here
                    </p>
                    <p className="mt-1 text-sm text-slate-400">or click to browse</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Preview */}
                  <div className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                    {previewUrl ? (
                      <img src={previewUrl} alt={file.name} className="h-48 w-full object-cover" />
                    ) : (
                      <div className="flex h-48 flex-col items-center justify-center gap-3">
                        {(() => {
                          const Icon = mediaIcons[mediaType];
                          return <Icon className="h-10 w-10 text-slate-400" />;
                        })()}
                        <p className="text-sm text-slate-500">No preview available</p>
                      </div>
                    )}
                    <button
                      onClick={handleReset}
                      className="absolute right-2 top-2 rounded-lg bg-white/90 dark:bg-slate-900/90 p-1.5 text-slate-500 hover:text-danger-500 transition-colors"
                      aria-label="Remove file"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>

                  {/* File info */}
                  <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-3 space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">File name</span>
                      <span className="font-medium truncate ml-2 max-w-[200px]">{file.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Size</span>
                      <span className="font-medium">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Type</span>
                      <span className="font-medium capitalize">{mediaType}</span>
                    </div>
                  </div>

                  {phase === 'idle' && (
                    <Button className="w-full" size="lg" onClick={handleAnalyze} leftIcon={<ScanSearch className="h-5 w-5" />}>
                      Analyze Media
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Analysis / Result */}
        <motion.div variants={slideUp} initial="hidden" animate="show">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Analysis</CardTitle>
              <CardDescription>
                {phase === 'analyzing' ? 'Running forensic models...' : phase === 'result' ? 'Verdict & evidence' : 'Upload a file to begin'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {phase === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                      <Sparkles className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-400">Your forensic report will appear here</p>
                  </motion.div>
                )}

                {phase === 'analyzing' && (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <AnalysisTimeline />
                  </motion.div>
                )}

                {phase === 'result' && result && (
                  <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                    {/* Score */}
                    <div className="flex flex-col items-center gap-3 py-2">
                      <ProgressRing
                        value={result.score}
                        size={140}
                        strokeWidth={12}
                        tone={result.verdict === "success" ? "success" : "danger"}
                        label={`${result.score}%`}
                        sublabel={result.verdict === "success" ? "authenticity score": "manipulation score"}
                      />
                      <Badge tone={result.verdict === "success" ? "success" : "danger"} variant="solid" className="text-sm px-4 py-1">
                        {result.verdict === "success" ? <FileCheck2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                        {result.verdict === "success" ? "Authentic": "Likely Manipulated"}
                      </Badge>
                    </div>

                    {/* Flags */}
                    {result.flags.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Detected Signals</p>
                        <div className="flex flex-wrap gap-2">
                          {result.flags.map((flag, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="rounded-lg bg-danger-50 dark:bg-danger-950/40 px-3 py-1.5 text-xs font-medium text-danger-700 dark:text-danger-300"
                            >
                              {flag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Meta */}
                    <div className="rounded-xl border border-slate-200/60 dark:border-slate-800/60 p-3 space-y-1.5">
                      <div className="flex justify-between text-sm"><span className="text-slate-400">Processing time</span><span className="font-medium">{result.processedIn}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-slate-400">Verdict</span><span className="font-medium">{result.verdict === "success" ? "Authentic": "Likely Manipulated"}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-slate-400">Confidence</span><span className={`font-medium ${ result.verdict === "success"? "text-success-600": "text-danger-600"}`}>{Number(result.confidence).toFixed(2)}% </span></div>
                      {mediaType === "video" && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Analyzed Frames</span>
                          <span className="font-medium">{result.analyzedFrames}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Real Frames</span>
                          <span className="font-medium text-green-600">
                            {result.realFrames}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Fake Frames</span>
                          <span className="font-medium text-red-600">
                            {result.fakeFrames}
                          </span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Total Frames</span>
                          <span className="font-medium">
                            {result.totalFrames}
                          </span>
                        </div>
                      </>
                    )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1" leftIcon={<Download className="h-4 w-4" />}>Download Report</Button>
                      <Button variant="ghost" onClick={handleReset} leftIcon={<RotateCcw className="h-4 w-4" />}>New Scan</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
