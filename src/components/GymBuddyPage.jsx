import React, { useState } from 'react';
import { Users, Trophy, Share2, Flame, Target, Crown } from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';
import FeatureButton, { PremiumBadge } from './FeatureButton';

const GymBuddyPage = ({ onUpgradeRequest }) => {
  const { isFree } = useSubscription();
  const [buddyCode, setBuddyCode] = useState('');

  // If free user, show upgrade CTA
  if (isFree) {
    return (
      <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#00d4ff] flex items-center justify-center shadow-lg">
            <Users size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Gym Buddy Mode
          </h2>
          <p className="text-zinc-400">
            Partner workouts, accountability sharing, and streak competitions with friends
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {[
            { icon: Users, title: 'Partner Workouts', desc: 'Sync workouts with your training partner' },
            { icon: Share2, title: 'Accountability', desc: 'Share progress and hold each other accountable' },
            { icon: Flame, title: 'Streak Competition', desc: 'Compete on workout streaks and volume' },
            { icon: Trophy, title: 'Buddy Challenges', desc: 'Complete challenges together for rewards' }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981]/20 to-[#00d4ff]/20 flex items-center justify-center">
                <feature.icon size={24} className="text-[#10b981]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6 mb-6">
          <h3 className="font-bold text-white mb-4">Find Your Gym Buddy</h3>
          <p className="text-zinc-400 text-sm mb-4">
            Enter a buddy code to connect with a friend, or upgrade to generate your own code.
          </p>
          <input
            type="text"
            placeholder="Enter buddy code..."
            value={buddyCode}
            onChange={(e) => setBuddyCode(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 mb-3 focus:outline-none focus:border-[#10b981]"
          />
          <FeatureButton
            featureKey={null}
            onClick={onUpgradeRequest}
            variant="primary"
            size="md"
            className="w-full"
          >
            <PremiumBadge tier="premium" />
            Unlock Gym Buddy Mode
          </FeatureButton>
        </div>
      </div>
    );
  }

  // Premium user content
  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#00d4ff] flex items-center justify-center shadow-lg">
          <Users size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Gym Buddy</h2>
          <PremiumBadge tier="premium" />
        </div>
      </div>

      {/* Your Buddy Code */}
      <div className="glass-card p-6 mb-6 text-center">
        <p className="text-zinc-400 text-sm mb-2">Your Buddy Code</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <code className="px-6 py-3 bg-white/10 rounded-xl text-2xl font-mono text-[#00d4ff] tracking-wider">
            GRIT-7X9K2M
          </code>
          <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
            <Share2 size={20} className="text-white" />
          </button>
        </div>
        <p className="text-zinc-500 text-xs">Share this code with friends to connect</p>
      </div>

      {/* Connected Buddies */}
      <div className="glass-card p-4 mb-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Users size={18} className="text-[#10b981]" />
          Your Buddies
        </h3>
        <div className="space-y-3">
          {[
            { name: 'Mike T.', streak: 15, lastWorkout: '2 hours ago', status: 'active' },
            { name: 'Sarah K.', streak: 8, lastWorkout: 'Yesterday', status: 'offline' }
          ].map((buddy, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center text-white font-bold">
                {buddy.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white text-sm">{buddy.name}</p>
                <p className="text-zinc-500 text-xs">{buddy.lastWorkout}</p>
              </div>
              <div className="flex items-center gap-1 text-orange-500">
                <Flame size={14} />
                <span className="text-sm font-bold">{buddy.streak}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Competition */}
      <div className="glass-card p-4">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Trophy size={18} className="text-[#f59e0b]" />
          This Week's Competition
        </h3>
        <div className="space-y-2">
          {[
            { name: 'You', streak: 12, position: 1 },
            { name: 'Mike T.', streak: 8, position: 2 },
            { name: 'Sarah K.', streak: 5, position: 3 }
          ].map((entry, idx) => (
            <div 
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                entry.name === 'You' ? 'bg-gradient-to-r from-[#00d4ff]/20 to-[#a855f7]/20 border border-[#00d4ff]/30' : 'bg-white/5'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                entry.position === 1 ? 'bg-[#f59e0b] text-black' :
                entry.position === 2 ? 'bg-zinc-400 text-black' :
                entry.position === 3 ? 'bg-[#a855f7] text-white' :
                'bg-white/10 text-zinc-400'
              }`}>
                {entry.position}
              </span>
              <span className="flex-1 text-white font-medium">{entry.name}</span>
              <div className="flex items-center gap-1 text-orange-500">
                <Flame size={14} />
                <span className="font-bold">{entry.streak}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymBuddyPage;
