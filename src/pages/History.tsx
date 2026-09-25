import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { sessionService } from '../services/sessionService';
import { PitchSession } from '../types/session';
import {
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  FileText
} from 'lucide-react';

export const History: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<PitchSession[]>([]);
  const [search, setSearch] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const data = await sessionService.getAllSessions();
      setSessions(data);
      setIsLoading(false);
    };
    load();
  }, []);

  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      s.startupContext.name.toLowerCase().includes(search.toLowerCase()) ||
      s.startupContext.oneLinePitch.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = filterDifficulty === 'all' || s.difficulty === filterDifficulty;
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="w-full min-h-screen bg-surface font-sans text-on-surface pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14 flex flex-col gap-10">
        {/* Header Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-outline uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(68,226,205,0.6)]" />
              <span>Historical Telemetry Log</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-primary font-normal tracking-tight">
              Pitch Trajectory & Records
            </h1>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              Track pitch defensibility, scores, and readiness across iterative practice runs.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/session/new')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary text-sm font-medium hover:bg-white transition-all active:scale-[0.99] self-start sm:self-auto cursor-pointer shadow-sm"
          >
            <span>Start New Simulation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Trajectory Scoreboard Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface-container-low/70 backdrop-blur-xl rounded-xl p-5 border border-surface-container-high/40 flex flex-col justify-between">
            <span className="font-mono text-xs text-outline uppercase tracking-wider">
              Average Readiness
            </span>
            <div className="font-display text-4xl text-primary font-light mt-2">82.4%</div>
            <div className="text-xs text-secondary mt-2 flex items-center gap-1.5 font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14% since first mock pitch</span>
            </div>
          </div>

          <div className="bg-surface-container-low/70 backdrop-blur-xl rounded-xl p-5 border border-surface-container-high/40 flex flex-col justify-between">
            <span className="font-mono text-xs text-outline uppercase tracking-wider">
              Total Diligence Time
            </span>
            <div className="font-display text-4xl text-primary font-light mt-2">2h 45m</div>
            <span className="font-mono text-xs text-outline mt-2">
              Across 14 partner meetings
            </span>
          </div>

          <div className="bg-surface-container-low/70 backdrop-blur-xl rounded-xl p-5 border border-surface-container-high/40 flex flex-col justify-between">
            <span className="font-mono text-xs text-outline uppercase tracking-wider">
              Cohort Standing
            </span>
            <div className="font-display text-4xl text-secondary font-light mt-2">Top 8%</div>
            <div className="text-xs text-secondary mt-2 flex items-center gap-1.5 font-mono">
              <Shield className="w-3.5 h-3.5" />
              <span>E-Cell Incubator Fall '26</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search startup name or thesis..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container-lowest text-primary placeholder:text-outline text-xs outline-none border border-surface-container-high/40 focus:border-secondary/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-outline" />
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-xs outline-none border border-surface-container-high/40 focus:border-secondary/50"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* History List */}
        <div className="flex flex-col gap-3">
          {filteredSessions.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="bg-surface-container-low/60 hover:bg-surface-container-low/90 rounded-xl p-5 border border-surface-container-high/30 hover:border-secondary/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-display text-base font-medium text-primary">
                    {s.startupContext.name}
                  </span>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-surface-container-high text-secondary border border-secondary/20">
                    {s.investorMode.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded-full bg-surface-container-highest text-outline">
                    {s.difficulty}
                  </span>
                </div>

                <p className="text-xs text-on-surface-variant line-clamp-1 max-w-2xl leading-relaxed">
                  {s.startupContext.oneLinePitch}
                </p>

                <div className="flex items-center gap-3 text-xs text-outline font-mono pt-1">
                  <span>{s.report?.date || '24 Sep 2026'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-on-surface-variant">
                    <Clock className="w-3 h-3 text-secondary" />
                    <span>18 min</span>
                  </span>
                  <span>•</span>
                  <span className="text-secondary flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                </div>
              </div>

              {/* Score & Actions */}
              <div className="flex items-center gap-5 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-surface-container-high/30">
                <div className="text-right">
                  <div className="font-display text-2xl text-primary font-light leading-none">
                    {s.report?.overallScore || 84}
                    <span className="text-xs text-outline font-normal"> /100</span>
                  </div>
                  <div className="font-mono text-[10px] text-outline uppercase tracking-wider mt-1">
                    Readiness
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/session/${s.id}/report`}
                    className="px-3.5 py-2 rounded-full bg-surface-container-high hover:bg-surface-bright text-primary text-xs font-medium flex items-center gap-1.5 transition-colors border border-surface-container-highest/40"
                  >
                    <FileText className="w-3.5 h-3.5 text-secondary" />
                    <span>View Dossier</span>
                  </Link>

                  <button
                    onClick={() => navigate('/session/new')}
                    className="p-2 rounded-full text-outline hover:text-primary hover:bg-surface-container-high transition-colors"
                    title="Practice Again"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
