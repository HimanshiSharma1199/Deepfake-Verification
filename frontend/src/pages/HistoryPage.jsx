import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Image as ImageIcon, Video, Music, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, Button, Badge, Input, Breadcrumb, Table, Pagination, Tabs } from '../components/ui';
import { VerificationCard } from '../components/dashboard/VerificationCard';
import { VERIFICATIONS } from '../constants/mockData';
import { VERDICT } from '../constants/navigation';
import { slideUp, staggerContainer } from '../animations';

const verdictTone = {
  authentic: 'success',
  suspicious: 'warning',
  likelyManipulated: 'secondary',
  manipulated: 'danger',
};

const mediaIcons = { image: ImageIcon, video: Video, audio: Music };

export function HistoryPage() {
  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return VERIFICATIONS.filter((v) => {
      if (filter !== 'all' && v.verdict !== filter) return false;
      if (search && !v.fileName.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filter, search]);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Breadcrumb items={[{ label: 'History' }]} />
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Verification History</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{filtered.length} records found</p>
        </div>
        <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Export CSV</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <Input
              placeholder="Search by filename..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
              className="max-w-xs"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Tabs
              value={filter}
              onChange={setFilter}
              tabs={[
                { label: 'All', value: 'all' },
                { label: 'Authentic', value: 'authentic' },
                { label: 'Suspicious', value: 'suspicious' },
                { label: 'Manipulated', value: 'manipulated' },
              ]}
            />
            <Tabs
              value={view}
              onChange={(v) => setView(v)}
              tabs={[
                { label: 'Grid', value: 'grid' },
                { label: 'Table', value: 'table' },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {view === 'grid' ? (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((record) => (
            <motion.div key={record.id} variants={slideUp}>
              <VerificationCard record={record} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={slideUp} initial="hidden" animate="show">
          <Card>
            <Table
              data={filtered}
              columns={[
                {
                  key: 'fileName',
                  header: 'File',
                  render: (row) => (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                        {(() => {
                          const Icon = mediaIcons[row.mediaType];
                          return <Icon className="h-4 w-4 text-slate-500" />;
                        })()}
                      </div>
                      <span className="font-medium">{row.fileName}</span>
                    </div>
                  ),
                },
                {
                  key: 'mediaType',
                  header: 'Type',
                  render: (row) => <span className="capitalize text-slate-500">{row.mediaType}</span>,
                },
                {
                  key: 'score',
                  header: 'Score',
                  render: (row) => <span className="font-mono font-medium">{row.score}%</span>,
                },
                {
                  key: 'verdict',
                  header: 'Verdict',
                  render: (row) => (
                    <Badge tone={verdictTone[row.verdict]} variant="soft">
                      {row.verdict === 'authentic' ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      {VERDICT[row.verdict].label}
                    </Badge>
                  ),
                },
                {
                  key: 'fileSize',
                  header: 'Size',
                },
                {
                  key: 'processedIn',
                  header: 'Processed',
                },
              ]}
            />
          </Card>
        </motion.div>
      )}

      {/* Pagination */}
      {filtered.length > 0 && (
        <Pagination page={page} totalPages={Math.ceil(filtered.length / 8) || 1} onPageChange={setPage} />
      )}
    </div>
  );
}
