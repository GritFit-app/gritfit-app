import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Dumbbell, 
  Trophy, 
  Activity, 
  User, 
  BookOpen,
  Calculator,
  Camera
} from 'lucide-react';
import RestTimer from './components/RestTimer';
import Achievements from './components/Achievements';
import ProgressPhotos from './components/ProgressPhotos';
import PlateCalculator from './components/PlateCalculator';
import ExerciseLibrary from './components/ExerciseLibrary';
import AuthScreen from './components/AuthScreen';

const Navigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: Activity },
    { id: 'achievements', label: 'Trophies', icon: Trophy },
    { id: 'tools', label: 'Tools', icon: Calculator },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#12121a] border-t border-white/10 px-6 py-4 z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-[#00d4ff]' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-br from-[#00d4ff] to-[#a855f7] shadow-lg shadow-[#00d4ff]/30' 
                  : ''
              }`}>
                <Icon size={22} className={isActive ? 'text-white' : ''} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

const Dashboard = ({ setActiveTab, onLogout }) => {
  const [streak, setStreak] = useState(12);
  const [weeklyVolume, setWeeklyVolume] = useState(28500);

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text">GritFit</h1>
          <p className="text-zinc-400 text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#1a1a24] px-4 py-2 rounded-full border border-white/5">
            <span className="text-2xl">🔥</span>
            <span className="font-bold text-orange-500">{streak}</span>
            <span className="text-zinc-400 text-sm">day streak</span>
          </div>
          <button 
            onClick={onLogout}
            className="p-2 text-zinc-500 hover:text-white transition-colors"
            title="Logout"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#00d4ff]/10 rounded-lg">
              <Activity size={20} className="text-[#00d4ff]" />
            </div>
            <span className="text-zinc-400 text-sm">Weekly Volume</span>
          </div>
          <p className="text-2xl font-bold text-white">{weeklyVolume.toLocaleString()}</p>
          <p className="text-xs text-zinc-500 mt-1">kg lifted</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#a855f7]/10 rounded-lg">
              <Trophy size={20} className="text-[#a855f7]" />
            </div>
            <span className="text-zinc-400 text-sm">PRs This Month</span>
          </div>
          <p className="text-2xl font-bold text-white">7</p>
          <p className="text-xs text-zinc-500 mt-1">personal records</p>
        </div>
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

      {/* Quick Tools Grid */}
      <h3 className="text-lg font-semibold text-white mb-4">Quick Tools</h3>
      <div className="grid grid-cols-2 gap-3">
        <ToolCard 
          title="Rest Timer"
          icon="⏱️"
          description="Track rest periods"
          onClick={() => setActiveTab('workouts')}
        />
        <ToolCard 
          title="Plate Calc"
          icon="🧮"
          description="Quick math for weights"
          onClick={() => setActiveTab('tools')}
        />
        <ToolCard 
          title="Exercises"
          icon="📚"
          description="Learn proper form"
          onClick={() => setActiveTab('tools')}
        />
        <ToolCard 
          title="Progress Pics"
          icon="📸"
          description="Track visual changes"
          onClick={() => setActiveTab('progress')}
        />
      </div>
    </div>
  );
};

const ToolCard = ({ title, icon, description, onClick }) => (
  <div 
    onClick={onClick}
    className="exercise-card hover-lift cursor-pointer text-center"
  >
    <div className="text-3xl mb-2">{icon}</div>
    <h4 className="font-semibold text-white text-sm">{title}</h4>
    <p className="text-xs text-zinc-500 mt-1">{description}</p>
  </div>
);

const Workouts = () => {
  const [activeSet, setActiveSet] = useState(1);
  const [timerActive, setTimerActive] = useState(false);

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      <h2 className="section-header mb-6">Today's Workout</h2>
      
      {/* Rest Timer */}
      {timerActive && (
        <RestTimer 
          defaultTime={90}
          exerciseName="Bench Press"
          setNumber={activeSet}
          totalSets={4}
          onComplete={() => setTimerActive(false)}
        />
      )}

      {/* Exercise List */}
      <div className="space-y-3">
        <ExerciseRow 
          name="Bench Press"
          sets="4"
          reps="8-12"
          weight="225"
          rpe="8"
          currentSet={activeSet}
          onRest={() => setTimerActive(true)}
        />
        <ExerciseRow 
          name="Incline Dumbbell Press"
          sets="3"
          reps="10-15"
          weight="80"
          rpe="9"
        />
        <ExerciseRow 
          name="Cable Flyes"
          sets="4"
          reps="12-20"
          weight=""
          rpe="9"
        />
        <ExerciseRow 
          name="Lateral Raises"
          sets="4"
          reps="15-20"
          weight="25"
          rpe="10"
        />
      </div>
    </div>
  );
};

const ExerciseRow = ({ name, sets, reps, weight, rpe, currentSet, onRest }) => (
  <div className="exercise-card">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-bold text-white">{name}</h3>
        <p className="text-zinc-500 text-sm">{sets} sets × {reps} reps @ RPE {rpe}</p>
      </div>
      {weight && (
        <div className="text-right">
          <p className="text-xl font-bold gradient-text">{weight}</p>
          <p className="text-xs text-zinc-500">lbs</p>
        </div>
      )}
    </div>
    
    {/* Set Checkboxes */}
    <div className="flex gap-2">
      {[...Array(parseInt(sets))].map((_, i) => (
        <button
          key={i}
          onClick={onRest}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
            i < currentSet - 1
              ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]'
              : i === currentSet - 1
              ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white'
              : 'bg-white/5 text-zinc-600'
          }`}
        >
          {i < currentSet - 1 ? '✓' : i + 1}
        </button>
      ))}
    </div>
  </div>
);

const Tools = () => (
  <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
    <h2 className="section-header mb-6">Tools</h2>
    
    <PlateCalculator />
    
    <div className="space-y-4">
      <ToolMenuCard 
        title="Exercise Library"
        description="Learn proper form for 100+ exercises"
        icon={<BookOpen size={24} />}
        color="from-[#a855f7] to-[#ec4899]"
      />
      <ToolMenuCard 
        title="Plate Calculator"
        description="Quick math for barbell loading"
        icon={<Calculator size={24} />}
        color="from-[#00d4ff] to-[#10b981]"
      />
      <ToolMenuCard 
        title="Progress Photos"
        description="Track your transformation visually"
        icon={<Camera size={24} />}
        color="from-[#f59e0b] to-[#ef4444]"
      />
    </div>
  </div>
);

const ToolMenuCard = ({ title, description, icon, color }) => (
  <div className="exercise-card hover-lift cursor-pointer flex items-center gap-4">
    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}>
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-bold text-white">{title}</h3>
      <p className="text-zinc-500 text-sm">{description}</p>
    </div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const authStatus = localStorage.getItem('gritfit_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    // Save auth status
    localStorage.setItem('gritfit_auth', 'true');
    localStorage.setItem('gritfit_user', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('gritfit_auth');
    localStorage.removeItem('gritfit_user');
    setIsAuthenticated(false);
  };

  // Show loading screen while checking auth
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

  // Show auth screen if not logged in
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Show main app if logged in
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} onLogout={handleLogout} />}
      {activeTab === 'workouts' && <Workouts />}
      {activeTab === 'progress' && <ProgressPhotos />}
      {activeTab === 'achievements' && <Achievements />}
      {activeTab === 'tools' && <Tools />}
      
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
