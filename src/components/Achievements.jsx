import React from 'react';
import { 
  Trophy, 
  Flame, 
  Target, 
  Zap, 
  Star,
  Crown,
  Medal,
  Award,
  TrendingUp,
  Dumbbell,
  Calendar,
  Clock
} from 'lucide-react';

const Achievements = ({ userStats }) => {
  const defaultStats = {
    totalWorkouts: 47,
    currentStreak: 12,
    longestStreak: 28,
    totalVolume: 125000, // kg
    prsThisMonth: 7,
    perfectWeeks: 3,
    consistency: 85, // percentage
  };

  const stats = userStats || defaultStats;

  const achievements = [
    {
      id: 'first_workout',
      title: 'First Steps',
      description: 'Complete your first workout',
      icon: Dumbbell,
      unlocked: true,
      rarity: 'common',
      color: '#71717a'
    },
    {
      id: 'week_warrior',
      title: 'Week Warrior',
      description: 'Work out 7 days in a row',
      icon: Flame,
      unlocked: stats.currentStreak >= 7,
      rarity: 'common',
      color: '#f59e0b',
      progress: Math.min(stats.currentStreak / 7 * 100, 100)
    },
    {
      id: 'month_master',
      title: 'Month Master',
      description: '30 day streak',
      icon: Calendar,
      unlocked: stats.currentStreak >= 30,
      rarity: 'rare',
      color: '#a855f7',
      progress: Math.min(stats.currentStreak / 30 * 100, 100)
    },
    {
      id: 'volume_king',
      title: 'Volume King',
      description: 'Lift 100,000 kg total',
      icon: TrendingUp,
      unlocked: stats.totalVolume >= 100000,
      rarity: 'rare',
      color: '#00d4ff',
      progress: Math.min(stats.totalVolume / 100000 * 100, 100)
    },
    {
      id: 'pr_machine',
      title: 'PR Machine',
      description: 'Set 10 personal records',
      icon: Trophy,
      unlocked: stats.prsThisMonth >= 10,
      rarity: 'epic',
      color: '#fbbf24',
      progress: Math.min(stats.prsThisMonth / 10 * 100, 100)
    },
    {
      id: ' consistency_champion',
      title: 'Consistency Champion',
      description: '90% workout consistency for a month',
      icon: Target,
      unlocked: stats.consistency >= 90,
      rarity: 'epic',
      color: '#10b981',
      progress: Math.min(stats.consistency / 90 * 100, 100)
    },
    {
      id: 'iron_legend',
      title: 'Iron Legend',
      description: '100 workouts completed',
      icon: Crown,
      unlocked: stats.totalWorkouts >= 100,
      rarity: 'legendary',
      color: '#ef4444',
      progress: Math.min(stats.totalWorkouts / 100 * 100, 100)
    },
    {
      id: 'unstoppable',
      title: 'Unstoppable',
      description: '60 day streak',
      icon: Zap,
      unlocked: stats.currentStreak >= 60,
      rarity: 'legendary',
      color: '#ec4899',
      progress: Math.min(stats.currentStreak / 60 * 100, 100)
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-zinc-600 bg-zinc-800/50';
      case 'rare': return 'border-[#00d4ff] bg-[#00d4ff]/10';
      case 'epic': return 'border-[#a855f7] bg-[#a855f7]/10';
      case 'legendary': return 'border-[#fbbf24] bg-[#fbbf24]/10';
      default: return 'border-zinc-600';
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = (unlockedCount / totalCount) * 100;

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="section-header">Achievements</h2>
        <p className="text-zinc-400 text-sm">Unlock badges by crushing your goals</p>
      </div>

      {/* Progress Overview */}
      <div className="glass-card p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-zinc-400 text-sm">Collection Progress</p>
            <p className="text-3xl font-bold gradient-text">{unlockedCount}/{totalCount}</p>
          </div>
          <div className="text-right">
            <p className="text-zinc-400 text-sm">Completion</p>
            <p className="text-2xl font-bold text-white">{completionPercentage.toFixed(0)}%</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-[#00d4ff] to-[#a855f7] h-3 rounded-full transition-all duration-500"
            style={{width: `${completionPercentage}%`}}
          />
        </div>

        {/* Rarity Counts */}
        <div className="flex gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-zinc-600" />
            <span className="text-zinc-500">Common</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#00d4ff]" />
            <span className="text-zinc-500">Rare</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#a855f7]" />
            <span className="text-zinc-500">Epic</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#fbbf24]" />
            <span className="text-zinc-500">Legendary</span>
          </div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          
          return (
            <div
              key={achievement.id}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                achievement.unlocked 
                  ? `${getRarityColor(achievement.rarity)} glow-primary` 
                  : 'border-zinc-800 bg-zinc-900/30 opacity-60'
              }`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br shadow-lg' 
                  : 'bg-zinc-800'
              }`}
              style={{
                background: achievement.unlocked 
                  ? `linear-gradient(135deg, ${achievement.color}40, ${achievement.color}20)` 
                  : undefined,
                boxShadow: achievement.unlocked 
                  ? `0 4px 20px ${achievement.color}30` 
                  : undefined
              }}
              >
                <Icon 
                  size={24} 
                  style={{ color: achievement.unlocked ? achievement.color : '#71717a' }}
                />
              </div>

              {/* Content */}
              <h3 className={`font-bold text-sm mb-1 ${
                achievement.unlocked ? 'text-white' : 'text-zinc-500'
              }`}>
                {achievement.title}
              </h3>
              <p className="text-xs text-zinc-500 mb-2">{achievement.description}</p>

              {/* Progress Bar (if not unlocked) */}
              {!achievement.unlocked && achievement.progress !== undefined && (
                <div className="mt-2">
                  <div className="w-full bg-zinc-800 rounded-full h-1.5">
                    <div 
                      className="bg-zinc-600 h-1.5 rounded-full transition-all"
                      style={{width: `${achievement.progress}%`}}
                    />
                  </div>
                  <p className="text-xs text-zinc-600 mt-1">{achievement.progress.toFixed(0)}%</p>
                </div>
              )}

              {/* Unlocked Badge */}
              {achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <Star size={14} className="text-[#fbbf24] fill-[#fbbf24]" />
                </div>
              )}

              {/* Rarity Label */}
              <div className="absolute bottom-2 right-2">
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  achievement.rarity === 'common' ? 'bg-zinc-700 text-zinc-400' :
                  achievement.rarity === 'rare' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' :
                  achievement.rarity === 'epic' ? 'bg-[#a855f7]/20 text-[#a855f7]' :
                  'bg-[#fbbf24]/20 text-[#fbbf24]'
                }`}>
                  {achievement.rarity}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivation Card */}
      <div className="mt-6 glass-card p-6 text-center">
        <Medal size={40} className="mx-auto mb-3 text-[#fbbf24]" />
        <h3 className="font-bold text-white mb-2">Keep Pushing!</h3>
        <p className="text-zinc-400 text-sm">
          {unlockedCount === 0 
            ? "Complete your first workout to earn your first badge!"
            : `You've unlocked ${unlockedCount} achievements. ${totalCount - unlockedCount} more to go!`
          }
        </p>
      </div>
    </div>
  );
};

export default Achievements;
