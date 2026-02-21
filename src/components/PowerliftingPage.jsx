import React, { useState } from 'react';
import { 
  Activity, 
  Calculator, 
  Target, 
  Trophy,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';
import FeatureButton, { PremiumBadge } from './FeatureButton';
import { powerliftingData } from '../data';

const PowerliftingPage = ({ onUpgradeRequest }) => {
  const { checkAccess, isFree } = useSubscription();
  const hasAccess = checkAccess('POWERLIFTING');
  const [activeTab, setActiveTab] = useState('rpe');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [rpe, setRPE] = useState(8);
  const [selectedFormula, setSelectedFormula] = useState('Epley');
  const [showOneRM, setShowOneRM] = useState(false);

  // If free user, show upgrade CTA
  if (isFree) {
    return (
      <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#ef4444] to-[#dc2626] flex items-center justify-center shadow-lg">
            <Activity size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Powerlifting Suite
          </h2>
          <p className="text-zinc-400">
            Track RPE/RIR, calculate 1RM, build periodization, and prep for competition
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {[
            { icon: Target, title: 'RPE/RIR Tracking', desc: 'Rate every set with precision' },
            { icon: Calculator, title: '1RM Calculator', desc: 'Multiple formulas for accuracy' },
            { icon: TrendingUp, title: 'Periodization Builder', desc: 'Plan your training blocks' },
            { icon: Trophy, title: 'Competition Mode', desc: 'Attempt selection and meet prep' }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ef4444]/20 to-[#dc2626]/20 flex items-center justify-center">
                <feature.icon size={24} className="text-[#ef4444]" />
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
          Unlock Powerlifting Suite
        </FeatureButton>
      </div>
    );
  }

  // Calculate 1RM
  const calculateOneRM = () => {
    const w = parseFloat(weight);
    const r = parseFloat(reps);
    if (!w || !r || r < 1) return null;

    const formulas = powerliftingData.oneRMCalculators;
    const selected = formulas.find(f => f.name === selectedFormula);
    if (selected) {
      return Math.round(selected.formula(w, r));
    }
    return null;
  };

  const oneRM = calculateOneRM();
  const rpeScale = powerliftingData.rpeScale;
  const competitionLifts = powerliftingData.competitionLifts;

  const renderRPESection = () => (
    <div className="space-y-6">
      {/* RPE Scale Reference */}
      <div className="glass-card p-4">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Target size={20} className="text-[#ef4444]" />
          RPE Scale
        </h3>
        <div className="space-y-2">
          {rpeScale.map((item) => (
            <div 
              key={item.value}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: item.color, color: '#fff' }}
              >
                {item.value}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{item.label}</p>
                <p className="text-zinc-500 text-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RPE Calculator */}
      <div className="glass-card p-4">
        <h3 className="font-bold text-white mb-4">Quick RPE Reference</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(powerliftingData.percentageTable).slice(0, 8).map(([pct, data]) => (
            <div key={pct} className="p-3 bg-white/5 rounded-lg text-center">
              <p className="text-2xl font-bold text-white">{pct}%</p>
              <p className="text-zinc-500 text-xs">~{data.reps} reps @ RPE {data.rpe}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOneRMCalculator = () => (
    <div className="glass-card p-6 space-y-4">
      <h3 className="font-bold text-white flex items-center gap-2">
        <Calculator size={20} className="text-[#ef4444]" />
        1RM Calculator
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-zinc-400 text-sm block mb-2">Weight Lifted</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 225"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ef4444]"
            />
            <span className="px-4 py-3 bg-white/5 rounded-xl text-zinc-400">lbs</span>
          </div>
        </div>

        <div>
          <label className="text-zinc-400 text-sm block mb-2">Reps Performed</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="e.g., 5"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-[#ef4444]"
          />
        </div>

        <div>
          <label className="text-zinc-400 text-sm block mb-2">Formula</label>
          <select
            value={selectedFormula}
            onChange={(e) => setSelectedFormula(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ef4444]"
          >
            {powerliftingData.oneRMCalculators.map((f) => (
              <option key={f.name} value={f.name} className="bg-[#12121a]">
                {f.name} ({f.bestFor})
              </option>
            ))}
          </select>
        </div>

        {oneRM && (
          <div className="p-4 bg-gradient-to-r from-[#ef4444]/20 to-[#dc2626]/20 rounded-xl text-center">
            <p className="text-zinc-400 text-sm mb-1">Estimated 1RM</p>
            <p className="text-4xl font-black text-white">{oneRM} <span className="text-2xl">lbs</span></p>
          </div>
        )}

        <button
          onClick={() => setShowOneRM(!showOneRM)}
          className="w-full py-3 bg-white/10 rounded-xl text-white font-medium flex items-center justify-center gap-2 hover:bg-white/15 transition-all"
        >
          View Percentage Chart
          {showOneRM ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showOneRM && oneRM && (
          <div className="mt-4 space-y-2">
            {[95, 90, 85, 80, 75, 70, 65, 60].map((pct) => (
              <div key={pct} className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-zinc-400">{pct}%</span>
                <span className="text-white font-semibold">{Math.round(oneRM * (pct / 100))} lbs</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderCompetition = () => (
    <div className="space-y-4">
      {competitionLifts.map((lift) => (
        <div key={lift.id} className="glass-card p-4">
          <h3 className="font-bold text-white mb-2">{lift.name}</h3>
          <p className="text-zinc-400 text-sm mb-3">{lift.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {lift.muscles.map((muscle, idx) => (
              <span key={idx} className="px-2 py-1 bg-white/10 rounded-full text-xs text-zinc-300">
                {muscle}
              </span>
            ))}
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <p className="text-zinc-500 text-xs">
              <Info size={12} className="inline mr-1" />
              IPF Rule: {lift.federationRules.ipf}
            </p>
          </div>
        </div>
      ))}

      {/* Meet Prep Timeline */}
      <div className="glass-card p-4">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Trophy size={20} className="text-[#f59e0b]" />
          Meet Prep Timeline
        </h3>
        <div className="space-y-3">
          {Object.entries(powerliftingData.meetPrep.weeksOut).map(([weeks, data]) => (
            <div key={weeks} className="flex items-center gap-3">
              <div className="w-12 text-center">
                <span className="text-[#ef4444] font-bold">{weeks}</span>
                <span className="text-zinc-600 text-xs block">wks</span>
              </div>
              <div className="flex-1 p-3 bg-white/5 rounded-lg">
                <p className="font-semibold text-white text-sm">{data.focus}</p>
                <p className="text-zinc-500 text-xs">{data.intensity} • {data.volume} volume</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ef4444] to-[#dc2626] flex items-center justify-center shadow-lg">
          <Activity size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Powerlifting</h2>
          <PremiumBadge tier="premium" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'rpe', label: 'RPE', icon: Target },
          { id: 'onerm', label: '1RM Calc', icon: Calculator },
          { id: 'comp', label: 'Compete', icon: Trophy }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'rpe' && renderRPESection()}
      {activeTab === 'onerm' && renderOneRMCalculator()}
      {activeTab === 'comp' && renderCompetition()}
    </div>
  );
};

export default PowerliftingPage;
