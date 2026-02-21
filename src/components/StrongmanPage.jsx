import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Timer, 
  Target, 
  Flame,
  Play,
  Pause,
  RotateCcw,
  Info
} from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';
import FeatureButton, { PremiumBadge } from './FeatureButton';
import { strongmanData } from '../data';

const StrongmanPage = ({ onUpgradeRequest }) => {
  const { checkAccess, isFree } = useSubscription();
  const [activeTab, setActiveTab] = useState('implements');
  
  // Tacky Timer State
  const [tackyTime, setTackyTime] = useState(0);
  const [tackyActive, setTackyActive] = useState(false);
  const [tackyPhase, setTackyPhase] = useState('prep'); // prep, applied, expired

  // If free user, show upgrade CTA
  if (isFree) {
    return (
      <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center shadow-lg">
            <Trophy size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Strongman Training
          </h2>
          <p className="text-zinc-400">
            Master implements, build medleys, use the tacky timer, and track event performance
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {[
            { icon: Trophy, title: 'Implement Database', desc: '30+ strongman implements with technique guides' },
            { icon: Target, title: 'Medley Builder', desc: 'Create custom event combinations' },
            { icon: Timer, title: 'Tacky Timer', desc: 'Know when your tacky is optimal' },
            { icon: Flame, title: 'Distance/Time Tracking', desc: 'Log carries, loads, and reps' }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7]/20 to-[#7c3aed]/20 flex items-center justify-center">
                <feature.icon size={24} className="text-[#a855f7]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <FeatureButton
          featureKey={null}
          onClick={onUpgradeRequest}
          variant="primary"
          size="lg"
          className="w-full"
        >
          <PremiumBadge tier="premium" />
          Unlock Strongman Training
        </FeatureButton>
      </div>
    );
  }

  const strongmanImplements = strongmanData.implements;
  const medleys = strongmanData.medleys;

  // Tacky Timer Logic
  useEffect(() => {
    let interval;
    if (tackyActive) {
      interval = setInterval(() => {
        setTackyTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= 60 && tackyPhase === 'prep') {
            setTackyPhase('applied');
          }
          if (newTime >= 80 && tackyPhase === 'applied') {
            setTackyPhase('expired');
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [tackyActive, tackyPhase]);

  const resetTackyTimer = () => {
    setTackyTime(0);
    setTackyActive(false);
    setTackyPhase('prep');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTackyStatus = () => {
    if (tackyPhase === 'prep') return { color: 'text-yellow-500', text: 'Applying Tacky...' };
    if (tackyPhase === 'applied') return { color: 'text-green-500', text: 'Tacky Optimal!' };
    return { color: 'text-red-500', text: 'Tacky Fading...' };
  };

  const renderImplements = () => (
    <div className="space-y-4">
      {strongmanImplements.slice(0, 8).map((imp) => (
        <div key={imp.id} className="glass-card p-4">
          <h3 className="font-bold text-white mb-1">{imp.name}</h3>
          <p className="text-zinc-400 text-sm mb-3">{imp.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {imp.muscles.map((muscle, idx) => (
              <span key={idx} className="px-2 py-1 bg-white/10 rounded-full text-xs text-zinc-300">
                {muscle}
              </span>
            ))}
          </div>

          {imp.worldRecord && (
            <p className="text-xs text-[#f59e0b]">
              WR: {imp.worldRecord}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  const renderMedleys = () => (
    <div className="space-y-4">
      {medleys.map((medley, idx) => (
        <div key={idx} className="glass-card p-4">
          <h3 className="font-bold text-white mb-2">{medley.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <Timer size={14} className="text-zinc-500" />
            <span className="text-zinc-400 text-sm">{medley.timeLimit}</span>
          </div>
          <div className="space-y-2 mb-3">
            {medley.implements.map((imp, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs text-zinc-400">
                  {i + 1}
                </span>
                <span className="text-zinc-300 text-sm">{imp}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 bg-white/5 p-2 rounded">
            Strategy: {medley.strategy}
          </p>
        </div>
      ))}
    </div>
  );

  const renderTackyTimer = () => {
    const status = getTackyStatus();
    const progress = Math.min((tackyTime / 80) * 100, 100);

    return (
      <div className="glass-card p-6 text-center">
        <h3 className="font-bold text-white mb-6 flex items-center justify-center gap-2">
          <Flame size={20} className="text-[#a855f7]" />
          Tacky Timer
        </h3>

        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* Circular progress */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="12"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke={tackyPhase === 'applied' ? '#10b981' : tackyPhase === 'expired' ? '#ef4444' : '#a855f7'}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-white">{formatTime(tackyTime)}</span>
            <span className={`text-sm font-medium ${status.color}`}>{status.text}</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setTackyActive(!tackyActive)}
            className="px-6 py-3 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white rounded-xl font-semibold flex items-center gap-2"
          >
            {tackyActive ? <Pause size={18} /> : <Play size={18} />}
            {tackyActive ? 'Pause' : tackyTime === 0 ? 'Start' : 'Resume'}
          </button>
          <button
            onClick={resetTackyTimer}
            className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-white/15"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        <div className="mt-6 text-left space-y-2">
          <p className="text-xs text-zinc-400 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            0-60s: Applying tacky
          </p>
          <p className="text-xs text-zinc-400 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            60-80s: Optimal tackiness
          </p>
          <p className="text-xs text-zinc-400 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            80s+: Tacky fading
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center shadow-lg">
          <Trophy size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Strongman</h2>
          <PremiumBadge tier="premium" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'implements', label: 'Implements', icon: Trophy },
          { id: 'medleys', label: 'Medleys', icon: Target },
          { id: 'tacky', label: 'Tacky', icon: Timer }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'implements' && renderImplements()}
      {activeTab === 'medleys' && renderMedleys()}
      {activeTab === 'tacky' && renderTackyTimer()}
    </div>
  );
};

export default StrongmanPage;
