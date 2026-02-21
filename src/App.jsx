import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Dumbbell, 
  Trophy, 
  Activity, 
  Zap,
  Crown,
  Users,
  Camera,
  MapPin,
  Target,
  Calculator,
  ChevronRight
} from 'lucide-react';
import { SubscriptionProvider, useSubscription } from './context/SubscriptionContext';
import RestTimer from './components/RestTimer';
import Achievements from './components/Achievements';
import ProgressPhotos from './components/ProgressPhotos';
import PlateCalculator from './components/PlateCalculator';
import ExerciseLibrary from './components/ExerciseLibrary';
import AuthScreen from './components/AuthScreen';
import PremiumGate from './components/PremiumGate';
import UpgradeModal from './components/UpgradeModal';
import FeatureButton, { PremiumBadge } from './components/FeatureButton';

// Premium Features
import BodybuildingPage from './components/BodybuildingPage';
import PowerliftingPage from './components/PowerliftingPage';
import StrongmanPage from './components/StrongmanPage';
import GymBuddyPage from './components/GymBuddyPage';
import AIFormCoach from './components/AIFormCoach';
import GymHeatMap from './components/GymHeatMap';
import GritScore from './components/GritScore';
import PlateMathScanner from './components/PlateMathScanner';

// Navigation Component
const Navigation = ({ activeTab, setActiveTab }) => {
  const { isPremium } = useSubscription();
  
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'disciplines', label: 'Train', icon: Zap },
    { id: 'premium', label: 'Premium', icon: Crown, isPremiumTab: true },
    { id: 'progress', label: 'Progress', icon: Activity },
    { id: 'tools', label: 'Tools', icon: Calculator },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#12121a] border-t border-white/10 px-4 py-3 z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${
                isActive ? 'text-[#00d4ff]' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 relative ${
                isActive 
                  ? 'bg-gradient-to-br from-[#00d4ff] to-[#a855f7] shadow-lg shadow-[#00d4ff]/30' 
                  : ''
              }`}>
                <Icon size={20} className={isActive ? 'text-white' : ''} />
                {item.isPremiumTab && !isPremium && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#f59e0b] rounded-full border-2 border-[#12121a]" />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// Dashboard Component
const Dashboard = ({ setActiveTab, onLogout }) => {
  const { isPremium, isFree, subscription } = useSubscription();
  const [streak, setStreak] = useState(12);
  const [weeklyVolumeKg, setWeeklyVolumeKg] = useState(12927);
  const [weightUnit, setWeightUnit] = useState(() => {
    return localStorage.getItem('gritfit_unit') || 'lbs';
  });

  const toggleUnit = () => {
    const newUnit = weightUnit === 'kg' ? 'lbs' : 'kg';
    setWeightUnit(newUnit);
    localStorage.setItem('gritfit_unit', newUnit);
  };

  const displayWeight = (kg) => {
    if (weightUnit === 'kg') {
      return Math.round(kg).toLocaleString();
    }
    return Math.round(kg * 2.20462).toLocaleString();
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text">GritFit</h1>
          <p className="text-zinc-400 text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-2">
          {isPremium ? (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-black text-xs font-bold">
              <Crown size={12} />
              PREMIUM
            </div>
          ) : (
            <button 
              onClick={() => setActiveTab('premium')}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-[#fbbf24] text-xs font-bold hover:bg-white/20 transition-all"
            >
              <Crown size={12} />
              UPGRADE
            </button>
          )}
          <div className="flex items-center gap-1 bg-[#1a1a24] px-3 py-1.5 rounded-full border border-white/5">
            <span className="text-lg">🔥</span>
            <span className="font-bold text-orange-500">{streak}</span>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-zinc-500 hover:text-white transition-colors"
            title="Logout"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Grit Score Preview (Premium) */}
      {isPremium && (
        <div 
          onClick={() => setActiveTab('gritscore')}
          className="glass-card p-4 mb-6 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <p className="text-zinc-400 text-xs">Your Grit Score</p>
              <p className="text-2xl font-black text-white">642 <span className="text-sm text-zinc-500">/ 1000</span></p>
            </div>
          </div>
          <ChevronRight size={20} className="text-zinc-500" />
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#00d4ff]/10 rounded-lg">
                <Activity size={20} className="text-[#00d4ff]" />
              </div>
              <span className="text-zinc-400 text-sm">Volume</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-bold text-white">{displayWeight(weeklyVolumeKg)}</p>
            <button 
              onClick={toggleUnit}
              className="text-xs text-zinc-500 hover:text-white transition-colors"
            >
              {weightUnit}
            </button>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#a855f7]/10 rounded-lg">
              <Trophy size={20} className="text-[#a855f7]" />
            </div>
            <span className="text-zinc-400 text-sm">PRs</span>
          </div>
          <p className="text-2xl font-bold text-white">7</p>
          <p className="text-xs text-zinc-500">this month</p>
        </div>
      </div>

      {/* Training Disciplines */}
      <h3 className="text-lg font-semibold text-white mb-4">Training Disciplines</h3>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <DisciplineCard 
          name="Bodybuilding"
          icon="💪"
          color="from-[#f59e0b] to-[#ef4444]"
          onClick={() => setActiveTab('bodybuilding')}
        />
        <DisciplineCard 
          name="Powerlifting"
          icon="🏋️"
          color="from-[#ef4444] to-[#dc2626]"
          onClick={() => setActiveTab('powerlifting')}
        />
        <DisciplineCard 
          name="Strongman"
          icon="🏆"
          color="from-[#a855f7] to-[#7c3aed]"
          onClick={() => setActiveTab('strongman')}
        />
      </div>

      {/* Next Workout Card */}
      <div className="glass-card p-6 mb-6 glow-primary">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-zinc-400 text-sm mb-1">Next Workout</p>
            <h2 className="text-xl font-bold text-white">Push Day - Chest & Triceps</h2>
          </div>
          <div className="p-3 bg-gradient-to-br from-[#00d4ff] to-[#a855f7] rounded-xl">
            <Dumbbell size={24} className="text-white" />
          </div>
        </div>
        
        <button 
          onClick={() => setActiveTab('workouts')}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          Start Workout
          <span>→</span>
        </button>
      </div>

      {/* Premium Features Teaser (Free users) */}
      {isFree && (
        <>
          <h3 className="text-lg font-semibold text-white mb-4">Premium Features</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <PremiumTeaserCard 
              title="AI Coach"
              icon={Camera}
              description="Form feedback"
              onClick={() => setActiveTab('aicoach')}
            />
            <PremiumTeaserCard 
              title="Gym Buddy"
              icon={Users}
              description="Train together"
              onClick={() => setActiveTab('gymbuddy')}
            />
            <PremiumTeaserCard 
              title="Heat Map"
              icon={MapPin}
              description="Best gym times"
              onClick={() => setActiveTab('heatmap')}
            />
            <PremiumTeaserCard 
              title="Grit Score"
              icon={Target}
              description="Fitness score"
              onClick={() => setActiveTab('gritscore')}
            />
          </div>
        </>
      )}

      {/* Quick Tools */}
      <h3 className="text-lg font-semibold text-white mb-4">Quick Tools</h3>
      <div className="grid grid-cols-2 gap-3">
        <ToolCard 
          title="Plate Scanner"
          icon="📷"
          description="Photo → Weight"
          isPremium={true}
          onClick={() => setActiveTab('platescanner')}
        />
        <ToolCard 
          title="Plate Calc"
          icon="🧮"
          description="Quick math"
          onClick={() => setActiveTab('tools')}
        />
      </div>
    </div>
  );
};

const DisciplineCard = ({ name, icon, color, onClick }) => (
  <button 
    onClick={onClick}
    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-center group"
  >
    <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
      <span className="text-2xl">{icon}</span>
    </div>
    <span className="text-white text-sm font-medium">{name}</span>
  </button>
);

const PremiumTeaserCard = ({ title, icon: Icon, description, onClick }) => (
  <button 
    onClick={onClick}
    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-center relative overflow-hidden group"
  >
    <div className="absolute top-2 right-2">
      <div className="w-4 h-4 rounded-full bg-[#f59e0b] flex items-center justify-center">
        <Crown size={10} className="text-black" />
      </div>
    </div>
    <Icon size={24} className="mx-auto mb-2 text-[#f59e0b]" />
    <h4 className="font-semibold text-white text-sm">{title}</h4>
    <p className="text-xs text-zinc-500 mt-1">{description}</p>
  </button>
);

const ToolCard = ({ title, icon, description, isPremium, onClick }) => (
  <div 
    onClick={onClick}
    className="exercise-card hover-lift cursor-pointer text-center relative"
  >
    {isPremium && (
      <div className="absolute top-2 right-2">
        <Crown size={12} className="text-[#f59e0b]" />
      </div>
    )}
    <div className="text-3xl mb-2">{icon}</div>
    <h4 className="font-semibold text-white text-sm">{title}</h4>
    <p className="text-xs text-zinc-500 mt-1">{description}</p>
  </div>
);

// Main App Component with Freemium Gating
const AppContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [premiumGateConfig, setPremiumGateConfig] = useState({ isOpen: false, featureName: '' });
  
  const { isFree, checkAccess } = useSubscription();

  // Check auth on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('gritfit_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // Handle premium feature access
  const handlePremiumFeature = (featureKey, featureName) => {
    if (isFree) {
      setPremiumGateConfig({ isOpen: true, featureName });
      return false;
    }
    return true;
  };

  // Tab change handler with freemium gating
  const handleTabChange = (tab) => {
    // Define premium-only tabs
    const premiumTabs = {
      'bodybuilding': 'Bodybuilding Pro',
      'powerlifting': 'Powerlifting Suite',
      'strongman': 'Strongman Training',
      'gymbuddy': 'Gym Buddy Mode',
      'aicoach': 'AI Form Coach',
      'heatmap': 'Gym Heat Map',
      'gritscore': 'The Grit Score',
      'platescanner': 'Plate Math Scanner'
    };

    if (premiumTabs[tab] && isFree) {
      setPremiumGateConfig({ isOpen: true, featureName: premiumTabs[tab] });
      return;
    }

    setActiveTab(tab);
  };

  const handleLogin = (userData) => {
    localStorage.setItem('gritfit_auth', 'true');
    localStorage.setItem('gritfit_user', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('gritfit_auth');
    localStorage.removeItem('gritfit_user');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#00f5d4] to-[#00d4ff] bg-clip-text text-transparent">
              GRIT
            </span>
            <span className="text-white">FIT</span>
          </h1>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Main Content */}
      {activeTab === 'dashboard' && <Dashboard setActiveTab={handleTabChange} onLogout={handleLogout} />}
      {activeTab === 'disciplines' && (
        <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Training Disciplines</h2>
          <div className="space-y-4">
            <DisciplineRow 
              name="Bodybuilding"
              description="Volume tracking, exercise database, pump ratings"
              icon="💪"
              color="from-[#f59e0b] to-[#ef4444]"
              onClick={() => handleTabChange('bodybuilding')}
            />
            <DisciplineRow 
              name="Powerlifting"
              description="RPE tracking, 1RM calculator, periodization"
              icon="🏋️"
              color="from-[#ef4444] to-[#dc2626]"
              onClick={() => handleTabChange('powerlifting')}
            />
            <DisciplineRow 
              name="Strongman"
              description="Implements, medleys, tacky timer"
              icon="🏆"
              color="from-[#a855f7] to-[#7c3aed]"
              onClick={() => handleTabChange('strongman')}
            />
          </div>
        </div>
      )}
      {activeTab === 'premium' && (
        <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Premium</h2>
          <p className="text-zinc-400 mb-6">Unlock your full potential</p>
          
          <div className="space-y-4">
            <PremiumFeatureRow 
              name="AI Form Coach"
              description="Real-time form feedback"
              icon={Camera}
              onClick={() => handleTabChange('aicoach')}
            />
            <PremiumFeatureRow 
              name="Gym Buddy Mode"
              description="Partner workouts & accountability"
              icon={Users}
              onClick={() => handleTabChange('gymbuddy')}
            />
            <PremiumFeatureRow 
              name="Gym Heat Map"
              description="Best times to train"
              icon={MapPin}
              onClick={() => handleTabChange('heatmap')}
            />
            <PremiumFeatureRow 
              name="Grit Score"
              description="Your fitness score (0-1000)"
              icon={Target}
              onClick={() => handleTabChange('gritscore')}
            />
            <PremiumFeatureRow 
              name="Plate Scanner"
              description="Photo barbell → instant weight"
              icon={Camera}
              onClick={() => handleTabChange('platescanner')}
            />
          </div>

          {isFree && (
            <div className="mt-8 p-6 glass-card text-center">
              <h3 className="font-bold text-white mb-2">Ready to upgrade?</h3>
              <p className="text-zinc-400 text-sm mb-4">Get all premium features for $9.99/month</p>
              <FeatureButton
                featureKey={null}
                onClick={() => setShowUpgradeModal(true)}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Upgrade Now
              </FeatureButton>
            </div>
          )}
        </div>
      )}
      
      {/* Free Features */}
      {activeTab === 'workouts' && <WorkoutsPlaceholder />}
      {activeTab === 'progress' && <ProgressPhotos />}
      {activeTab === 'achievements' && <Achievements />}
      {activeTab === 'tools' && <ToolsPlaceholder />}
      
      {/* Premium Features (gated) */}
      {activeTab === 'bodybuilding' && <BodybuildingPage onUpgradeRequest={() => setShowUpgradeModal(true)} />}
      {activeTab === 'powerlifting' && <PowerliftingPage onUpgradeRequest={() => setShowUpgradeModal(true)} />}
      {activeTab === 'strongman' && <StrongmanPage onUpgradeRequest={() => setShowUpgradeModal(true)} />}
      {activeTab === 'gymbuddy' && <GymBuddyPage onUpgradeRequest={() => setShowUpgradeModal(true)} />}
      {activeTab === 'aicoach' && <AIFormCoach onUpgradeRequest={() => setShowUpgradeModal(true)} />}
      {activeTab === 'heatmap' && <GymHeatMap onUpgradeRequest={() => setShowUpgradeModal(true)} />}
      {activeTab === 'gritscore' && <GritScore onUpgradeRequest={() => setShowUpgradeModal(true)} />}
      {activeTab === 'platescanner' && <PlateMathScanner onUpgradeRequest={() => setShowUpgradeModal(true)} />}
      
      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={handleTabChange} />
      
      {/* Premium Gate Modal */}
      <PremiumGate
        isOpen={premiumGateConfig.isOpen}
        onClose={() => setPremiumGateConfig({ ...premiumGateConfig, isOpen: false })}
        featureName={premiumGateConfig.featureName}
        onUpgrade={() => {
          setPremiumGateConfig({ ...premiumGateConfig, isOpen: false });
          setShowUpgradeModal(true);
        }}
      />
      
      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </div>
  );
};

const DisciplineRow = ({ name, description, icon, color, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full glass-card p-4 flex items-center gap-4 hover:bg-white/5 transition-all text-left"
  >
    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg flex-shrink-0`}>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-white">{name}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
    <ChevronRight size={20} className="text-zinc-500" />
  </button>
);

const PremiumFeatureRow = ({ name, description, icon: Icon, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full glass-card p-4 flex items-center gap-4 hover:bg-white/5 transition-all text-left"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] flex items-center justify-center flex-shrink-0">
      <Icon size={24} className="text-black" />
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-white">{name}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
    <ChevronRight size={20} className="text-zinc-500" />
  </button>
);

const WorkoutsPlaceholder = () => (
  <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
    <h2 className="text-2xl font-bold text-white mb-6">Today's Workout</h2>
    <div className="glass-card p-8 text-center">
      <Dumbbell size={48} className="mx-auto mb-4 text-zinc-600" />
      <p className="text-zinc-400">Start a workout to track your lifts</p>
    </div>
  </div>
);

const ToolsPlaceholder = () => (
  <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
    <h2 className="text-2xl font-bold text-white mb-6">Tools</h2>
    <PlateCalculator />
  </div>
);

// Root App with Providers
const App = () => (
  <SubscriptionProvider>
    <AppContent />
  </SubscriptionProvider>
);

export default App;
