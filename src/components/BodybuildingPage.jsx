import React, { useState } from 'react';
import { 
  Dumbbell, 
  TrendingUp, 
  Camera, 
  Activity,
  ChevronRight,
  Target,
  Flame,
  Calendar
} from 'lucide-react';
import { useSubscription, FEATURES } from '../context/SubscriptionContext';
import FeatureButton, { PremiumOverlay, PremiumBadge } from './FeatureButton';
import { bodybuildingData } from '../data';

const BodybuildingPage = ({ onUpgradeRequest }) => {
  const { checkAccess, isFree } = useSubscription();
  const hasAccess = checkAccess('BODYBUILDING');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [pumpRating, setPumpRating] = useState(3);
  const [weeklyVolume, setWeeklyVolume] = useState({
    chest: 14,
    back: 16,
    shoulders: 12,
    biceps: 10,
    triceps: 10,
    quads: 14,
    hamstrings: 10
  });

  // If free user, show upgrade CTA
  if (isFree) {
    return (
      <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center shadow-lg">
            <Dumbbell size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Bodybuilding Pro
          </h2>
          <p className="text-zinc-400">
            Track volume per muscle, log pump ratings, and access 200+ exercise variations
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {[
            { icon: TrendingUp, title: 'Volume Tracking', desc: 'Track sets per muscle group weekly' },
            { icon: Dumbbell, title: 'Exercise Database', desc: '200+ exercises with proper form cues' },
            { icon: Camera, title: 'Progress Photos', desc: 'Visual progress tracking with comparisons' },
            { icon: Flame, title: 'Pump Ratings', desc: 'Log and track your best pumps' }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#ef4444]/20 flex items-center justify-center">
                <feature.icon size={24} className="text-[#f59e0b]" />
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
          Unlock Bodybuilding Pro
        </FeatureButton>
      </div>
    );
  }

  // Premium user content
  const muscleGroups = bodybuildingData.muscleGroups;
  const volumeTargets = bodybuildingData.volumeTargets;
  const pumpRatings = bodybuildingData.pumpRatings;

  const getVolumeColor = (muscle, current) => {
    const target = volumeTargets[muscle];
    if (!target) return 'bg-zinc-600';
    if (current < target.min) return 'bg-red-500';
    if (current > target.max) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Volume Tracker */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white flex items-center gap-2">
            <TrendingUp size={20} className="text-[#f59e0b]" />
            Weekly Volume
          </h3>
          <span className="text-xs text-zinc-500">Sets per muscle</span>
        </div>

        <div className="space-y-3">
          {Object.entries(weeklyVolume).map(([muscle, sets]) => {
            const target = volumeTargets[muscle];
            const maxSets = target ? target.max * 1.5 : 30;
            const percentage = (sets / maxSets) * 100;
            const colorClass = getVolumeColor(muscle, sets);
            
            return (
              <div key={muscle} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-300 capitalize">{muscle}</span>
                  <span className="text-zinc-400">
                    {sets} / {target?.optimal || '?'}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${colorClass} transition-all duration-500`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-center">
          <Camera size={24} className="mx-auto mb-2 text-[#a855f7]" />
          <span className="text-white font-medium text-sm">Progress Photo</span>
        </button>
        <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all text-center">
          <Activity size={24} className="mx-auto mb-2 text-[#ec4899]" />
          <span className="text-white font-medium text-sm">Log Pump</span>
        </button>
      </div>
    </div>
  );

  const renderExercises = () => (
    <div className="space-y-4">
      {muscleGroups.map((group) => (
        <div key={group.id} className="glass-card p-4">
          <h3 className="font-bold text-white mb-2">{group.name}</h3>
          <p className="text-zinc-500 text-xs mb-3">{group.frequency}</p>
          <div className="flex flex-wrap gap-2">
            {group.exercises.map((exercise, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-white/10 rounded-full text-xs text-zinc-300"
              >
                {exercise}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPumpTracker = () => (
    <div className="glass-card p-6">
      <h3 className="font-bold text-white mb-4 flex items-center gap-2">
        <Flame size={20} className="text-[#ef4444]" />
        Rate Your Pump
      </h3>

      <div className="space-y-3 mb-6">
        {pumpRatings.map((rating) => (
          <button
            key={rating.value}
            onClick={() => setPumpRating(rating.value)}
            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
              pumpRating === rating.value
                ? 'bg-white/10 border border-white/20'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: rating.color }}
            >
              {rating.value}
            </div>
            <div className="text-left">
              <p className="font-semibold text-white text-sm">{rating.label}</p>
              <p className="text-zinc-500 text-xs">{rating.description}</p>
            </div>
          </button>
        ))}
      </div>

      <button className="w-full py-3 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white font-semibold rounded-xl">
        Log Pump Rating
      </button>
    </div>
  );

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center shadow-lg">
          <Dumbbell size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Bodybuilding</h2>
          <PremiumBadge tier="premium" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: Target },
          { id: 'exercises', label: 'Exercises', icon: Dumbbell },
          { id: 'pump', label: 'Pump', icon: Flame }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'exercises' && renderExercises()}
      {activeTab === 'pump' && renderPumpTracker()}
    </div>
  );
};

export default BodybuildingPage;
