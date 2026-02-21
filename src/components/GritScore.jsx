import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Target, 
  Flame, 
  Trophy, 
  Calendar,
  Zap,
  Award,
  ChevronRight,
  Share2
} from 'lucide-react';

// Calculate Grit Score based on multiple factors
const calculateGritScore = (data) => {
  const { 
    totalVolume = 0, 
    consistency = 0, 
    prCount = 0, 
    streak = 0,
    workoutCount = 0,
    daysActive = 1
  } = data;

  // Volume component (max 400 points) - logarithmic scale
  const volumeScore = Math.min(400, Math.log10(totalVolume / 1000 + 1) * 100);

  // Consistency component (max 250 points)
  const consistencyScore = Math.min(250, (consistency / 100) * 250);

  // PRs component (max 200 points)
  const prScore = Math.min(200, prCount * 20);

  // Streak component (max 100 points) - diminishing returns
  const streakScore = Math.min(100, streak * 5 + Math.log10(streak + 1) * 20);

  // Activity component (max 50 points)
  const activityScore = Math.min(50, (workoutCount / daysActive) * 50);

  return Math.round(volumeScore + consistencyScore + prScore + streakScore + activityScore);
};

const GritScore = () => {
  const [score, setScore] = useState(0);
  const [scoreData, setScoreData] = useState({
    totalVolume: 125000,
    consistency: 85,
    prCount: 12,
    streak: 8,
    workoutCount: 24,
    daysActive: 30
  });
  const [scoreHistory, setScoreHistory] = useState([]);
  const [breakdown, setBreakdown] = useState([]);
  const [rank, setRank] = useState('Bronze');

  // Calculate score on mount
  useEffect(() => {
    const calculatedScore = calculateGritScore(scoreData);
    setScore(calculatedScore);
    
    // Determine rank
    if (calculatedScore >= 900) setRank('Platinum');
    else if (calculatedScore >= 750) setRank('Gold');
    else if (calculatedScore >= 600) setRank('Silver');
    else setRank('Bronze');

    // Calculate breakdown
    setBreakdown([
      { name: 'Volume', points: Math.min(400, Math.log10(scoreData.totalVolume / 1000 + 1) * 100), max: 400, icon: Activity, color: '#00d4ff' },
      { name: 'Consistency', points: (scoreData.consistency / 100) * 250, max: 250, icon: Calendar, color: '#10b981' },
      { name: 'PRs', points: Math.min(200, scoreData.prCount * 20), max: 200, icon: Trophy, color: '#f59e0b' },
      { name: 'Streak', points: Math.min(100, scoreData.streak * 5 + Math.log10(scoreData.streak + 1) * 20), max: 100, icon: Flame, color: '#ef4444' },
      { name: 'Activity', points: Math.min(50, (scoreData.workoutCount / scoreData.daysActive) * 50), max: 50, icon: Zap, color: '#a855f7' },
    ]);

    // Generate mock history
    const history = [];
    for (let i = 29; i >= 0; i--) {
      const baseScore = calculatedScore - 50 + Math.random() * 30;
      history.push({
        date: new Date(Date.now() - i * 86400000).toISOString(),
        score: Math.round(Math.max(0, Math.min(1000, baseScore)))
      });
    }
    setScoreHistory(history);
  }, [scoreData]);

  const getRankColor = (rank) => {
    switch (rank) {
      case 'Platinum': return '#e5e7eb';
      case 'Gold': return '#fbbf24';
      case 'Silver': return '#9ca3af';
      case 'Bronze': return '#b45309';
      default: return '#6b7280';
    }
  };

  const getRankProgress = () => {
    if (score >= 900) return 100;
    if (score >= 750) return ((score - 750) / 150) * 100;
    if (score >= 600) return ((score - 600) / 150) * 100;
    return (score / 600) * 100;
  };

  const getNextRank = () => {
    if (score >= 900) return 'Max Rank!';
    if (score >= 750) return 'Platinum';
    if (score >= 600) return 'Gold';
    return 'Silver';
  };

  const getPointsToNext = () => {
    if (score >= 900) return 0;
    if (score >= 750) return 900 - score;
    if (score >= 600) return 750 - score;
    return 600 - score;
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
            <Activity size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">The Grit Score</h2>
            <p className="text-zinc-400 text-sm">Your unified fitness metric</p>
          </div>
        </div>
      </div>

      {/* Main Score Card */}
      <div className="exercise-card text-center mb-6">
        <div className="relative w-48 h-48 mx-auto mb-4">
          {/* Outer ring */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke={getRankColor(rank)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(score / 1000) * 552} 552`}
              className="transition-all duration-1000"
            />
          </svg>
          
          {/* Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl font-black text-white">{score}</span>
            <span className="text-zinc-400 text-sm">/ 1000</span>
          </div>
        </div>

        {/* Rank Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold"
          style={{ 
            backgroundColor: `${getRankColor(rank)}20`,
            color: getRankColor(rank),
            border: `2px solid ${getRankColor(rank)}`
          }}
        >
          <Award size={18} />
          {rank} Tier
        </div>

        {/* Progress to next rank */}
        {getPointsToNext() > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-zinc-400">Progress to {getNextRank()}</span>
              <span className="text-white font-medium">{getPointsToNext()} pts needed</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${getRankProgress()}%`,
                  backgroundColor: getRankColor(rank)
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Score Breakdown */}
      <div className="exercise-card mb-6">
        <h3 className="font-semibold text-white mb-4">Score Breakdown</h3>
        <div className="space-y-3">
          {breakdown.map((item) => {
            const Icon = item.icon;
            const percentage = (item.points / item.max) * 100;
            
            return (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon size={16} style={{ color: item.color }} />
                    <span className="text-zinc-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white font-medium text-sm">
                    {Math.round(item.points)} / {item.max}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <Activity size={16} className="text-[#00d4ff]" />
            <span className="text-zinc-400 text-xs">Total Volume</span>
          </div>
          <p className="text-xl font-bold text-white">
            {(scoreData.totalVolume / 1000).toFixed(0)}k
          </p>
          <p className="text-zinc-500 text-xs">lbs lifted</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={16} className="text-[#10b981]" />
            <span className="text-zinc-400 text-xs">Consistency</span>
          </div>
          <p className="text-xl font-bold text-white">{scoreData.consistency}%</p>
          <p className="text-zinc-500 text-xs">workouts completed</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <Trophy size={16} className="text-[#f59e0b]" />
            <span className="text-zinc-400 text-xs">PRs</span>
          </div>
          <p className="text-xl font-bold text-white">{scoreData.prCount}</p>
          <p className="text-zinc-500 text-xs">personal records</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <Flame size={16} className="text-[#ef4444]" />
            <span className="text-zinc-400 text-xs">Streak</span>
          </div>
          <p className="text-xl font-bold text-white">{scoreData.streak}</p>
          <p className="text-zinc-500 text-xs">days</p>
        </div>
      </div>

      {/* Score History Graph */}
      <div className="exercise-card mb-6">
        <h3 className="font-semibold text-white mb-4">30-Day Trend</h3>
        <div className="h-32 flex items-end gap-1">
          {scoreHistory.map((point, idx) => {
            const height = (point.score / 1000) * 100;
            return (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-[#00d4ff] to-[#a855f7] rounded-t transition-all hover:opacity-80"
                style={{ height: `${height}%` }}
                title={`${new Date(point.date).toLocaleDateString()}: ${point.score}`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-zinc-500 mt-2">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* How to Improve */}
      <div className="exercise-card">
        <h3 className="font-semibold text-white mb-4">How to Improve</h3>
        <div className="space-y-3">
          {breakdown
            .sort((a, b) => (a.points / a.max) - (b.points / b.max))
            .slice(0, 3)
            .map((item, idx) => (
              <div key={item.name} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 text-zinc-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <p className="text-white text-sm font-medium">Increase {item.name}</p>
                  <p className="text-zinc-400 text-xs">
                    Current: {Math.round((item.points / item.max) * 100)}% of max points
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Share Button */}
      <button 
        className="w-full mt-6 py-4 rounded-2xl bg-white/5 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'My Grit Score',
              text: `I scored ${score} on The Grit Score! Can you beat me?`,
            });
          }
        }}
      >
        <Share2 size={20} />
        Share My Score
      </button>
    </div>
  );
};

export default GritScore;
