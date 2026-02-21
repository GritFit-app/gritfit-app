import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Share2, 
  Trophy, 
  Flame, 
  Plus,
  X,
  ChevronRight,
  MessageSquare,
  Target
} from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';

const GymBuddy = () => {
  const { isPremium } = useSubscription();
  const [buddies, setBuddies] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [messages, setMessages] = useState([]);

  // Load data
  useEffect(() => {
    const savedBuddies = localStorage.getItem('gritfit_buddies');
    if (savedBuddies) setBuddies(JSON.parse(savedBuddies));
    
    const savedChallenge = localStorage.getItem('gritfit_challenge');
    if (savedChallenge) setActiveChallenge(JSON.parse(savedChallenge));
  }, []);

  const inviteBuddy = () => {
    if (!inviteEmail) return;
    const newInvite = {
      id: Date.now(),
      email: inviteEmail,
      status: 'pending',
      sent: new Date().toISOString()
    };
    setPendingInvites([...pendingInvites, newInvite]);
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const createChallenge = (type, duration, goal) => {
    const challenge = {
      id: Date.now(),
      type,
      duration,
      goal,
      startDate: new Date().toISOString(),
      participants: buddies.map(b => ({ ...b, progress: 0 })),
      status: 'active'
    };
    setActiveChallenge(challenge);
    localStorage.setItem('gritfit_challenge', JSON.stringify(challenge));
  };

  const shareWorkout = (workout) => {
    const share = {
      id: Date.now(),
      type: 'workout',
      data: workout,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, share]);
  };

  const BuddyCard = ({ buddy }) => (
    <div className="exercise-card flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center text-white font-bold text-lg">
        {buddy.name?.charAt(0) || '?'}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-white">{buddy.name}</p>
        <div className="flex items-center gap-2 text-sm">
          <Flame size={14} className="text-orange-500" />
          <span className="text-zinc-400">{buddy.streak || 0} day streak</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-[#00d4ff]">{buddy.score || 0}</p>
        <p className="text-zinc-500 text-xs">Grit Score</p>
      </div>
    </div>
  );

  const ChallengeCard = () => {
    if (!activeChallenge) return null;
    
    const daysLeft = Math.ceil(
      (new Date(activeChallenge.startDate).getTime() + activeChallenge.duration * 86400000 - Date.now()) / 86400000
    );

    return (
      <div className="exercise-card bg-gradient-to-br from-[#f59e0b]/20 to-[#ef4444]/20">
        <div className="flex items-center gap-3 mb-4">
          <Trophy size={24} className="text-[#f59e0b]" />
          <div>
            <h3 className="font-bold text-white">Active Challenge</h3>
            <p className="text-zinc-400 text-sm">{daysLeft} days remaining</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-white font-medium">{activeChallenge.type}</p>
          <p className="text-zinc-400 text-sm">Goal: {activeChallenge.goal}</p>
        </div>

        {/* Leaderboard */}
        <div className="space-y-2">
          {activeChallenge.participants
            .sort((a, b) => b.progress - a.progress)
            .map((participant, idx) => (
              <div key={participant.id} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  idx === 0 ? 'bg-[#f59e0b] text-black' :
                  idx === 1 ? 'bg-zinc-400 text-black' :
                  idx === 2 ? 'bg-[#cd7f32] text-black' :
                  'bg-white/10 text-zinc-400'
                }`}>
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-white text-sm">{participant.name}</p>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7]"
                      style={{ width: `${participant.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-[#00d4ff] font-bold">{participant.progress}%</span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center">
            <Users size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Gym Buddy</h2>
            <p className="text-zinc-400 text-sm">Train together, stay accountable</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-[#00d4ff]">{buddies.length}</p>
          <p className="text-xs text-zinc-400">Buddies</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-[#f59e0b]">
            {activeChallenge ? '1' : '0'}
          </p>
          <p className="text-xs text-zinc-400">Active Challenges</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-[#10b981]">
            {buddies.reduce((sum, b) => sum + (b.streak || 0), 0)}
          </p>
          <p className="text-xs text-zinc-400">Combined Streak</p>
        </div>
      </div>

      {/* Active Challenge */}
      {activeChallenge && <ChallengeCard />}

      {/* Quick Actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-medium flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Buddy
        </button>
        <button
          onClick={() => createChallenge('Workout Streak', 30, '30 workouts in 30 days')}
          className="flex-1 py-3 rounded-xl bg-white/5 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10"
        >
          <Trophy size={18} />
          New Challenge
        </button>
      </div>

      {/* My Buddies */}
      <h3 className="text-lg font-semibold text-white mb-4">My Buddies</h3>
      
      {buddies.length === 0 ? (
        <div className="text-center py-8">
          <Users size={48} className="text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400 mb-4">No buddies yet</p>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-medium"
          >
            Invite Your First Buddy
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {buddies.map(buddy => (
            <BuddyCard key={buddy.id} buddy={buddy} />
          ))}
        </div>
      )}

      {/* Sample Buddies for Demo */}
      {buddies.length === 0 && (
        <>
          <p className="text-zinc-500 text-sm mb-4">Suggested buddies</p>
          <div className="space-y-3 opacity-50">
            <BuddyCard buddy={{ name: 'Alex', streak: 15, score: 725 }} />
            <BuddyCard buddy={{ name: 'Jordan', streak: 8, score: 650 }} />
          </div>
        </>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl w-full max-w-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Invite Buddy</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-zinc-400 text-sm mb-4">
              Enter your friend's email to send them an invite
            </p>
            
            <input
              type="email"
              placeholder="friend@example.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white mb-4 focus:border-[#00d4ff] outline-none"
            />
            
            <button
              onClick={inviteBuddy}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-semibold"
            >
              Send Invite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymBuddy;
