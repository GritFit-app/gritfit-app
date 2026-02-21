import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Timer, 
  MapPin, 
  Plus, 
  Play, 
  Pause, 
  RotateCcw,
  Trophy,
  ChevronRight,
  X,
  Save,
  Trash2
} from 'lucide-react';

// Strongman implements database
const IMPLEMENTS = {
  atlas_stones: {
    name: 'Atlas Stones',
    category: 'loading',
    description: 'Lift stones onto platforms',
    weights: [100, 150, 200, 250, 300, 350, 400],
    unit: 'lbs',
    worldRecord: { weight: 560, holder: 'Tom Stoltman' }
  },
  log_press: {
    name: 'Log Press',
    category: 'overhead',
    description: 'Clean and press log overhead',
    weights: [200, 250, 300, 350, 400, 450],
    unit: 'lbs',
    worldRecord: { weight: 465, holder: 'Žydrūnas Savickas' }
  },
  axle_press: {
    name: 'Axle Press',
    category: 'overhead',
    description: 'Clean and press thick bar',
    weights: [250, 300, 350, 400],
    unit: 'lbs',
    worldRecord: { weight: 476, holder: 'Eddie Hall' }
  },
  deadlift: {
    name: 'Elephant Bar Deadlift',
    category: 'deadlift',
    description: 'Standard deadlift with specialty bar',
    weights: [700, 800, 900, 1000, 1100],
    unit: 'lbs',
    worldRecord: { weight: 1185, holder: 'Hafthor Bjornsson' }
  },
  farmers_walk: {
    name: "Farmer's Walk",
    category: 'moving',
    description: 'Carry heavy implements distance',
    weights: [200, 250, 300, 350, 400],
    unit: 'lbs per hand',
    distances: [40, 50, 60, 100],
    unit_distance: 'meters',
    worldRecord: { weight: 400, distance: 20, holder: 'Žydrūnas Savickas' }
  },
  yoke: {
    name: 'Yoke Carry',
    category: 'moving',
    description: 'Carry weighted yoke frame',
    weights: [600, 700, 800, 900, 1000, 1200],
    unit: 'lbs',
    distances: [40, 50, 60],
    unit_distance: 'meters',
    worldRecord: { weight: 1560, distance: 10, holder: 'Žydrūnas Savickas' }
  },
  keg_load: {
    name: 'Keg Load',
    category: 'loading',
    description: 'Lift and load kegs to height',
    weights: [200, 250, 300, 350, 400],
    unit: 'lbs',
    worldRecord: { weight: 350, holder: 'Brian Shaw' }
  },
  sandbag: {
    name: 'Sandbag Carry/Load',
    category: 'loading',
    description: 'Lift and carry sandbags',
    weights: [200, 250, 300, 350, 400, 450],
    unit: 'lbs',
    worldRecord: { weight: 420, holder: 'Tom Stoltman' }
  },
  tire_flip: {
    name: 'Tire Flip',
    category: 'moving',
    description: 'Flip large tire repeatedly',
    weights: [500, 650, 800, 1000, 1200],
    unit: 'lbs',
    distances: [20, 30, 40],
    unit_distance: 'meters',
    worldRecord: { flips: 8, weight: 1000, holder: 'Žydrūnas Savickas' }
  },
  circus_dumbbell: {
    name: 'Circus Dumbbell',
    category: 'overhead',
    description: 'One-arm dumbbell press',
    weights: [100, 150, 200, 250, 300],
    unit: 'lbs',
    worldRecord: { weight: 312, holder: 'Žydrūnas Savickas' }
  }
};

// Pre-built medleys
const MEDLEY_TEMPLATES = {
  classic_stones: {
    name: 'Classic Stones',
    implements: [
      { id: 'atlas_stones', weight: 200 },
      { id: 'atlas_stones', weight: 250 },
      { id: 'atlas_stones', weight: 300 },
      { id: 'atlas_stones', weight: 350 },
    ]
  },
  moving_day: {
    name: 'Moving Day',
    implements: [
      { id: 'farmers_walk', weight: 250, distance: 40 },
      { id: 'yoke', weight: 700, distance: 20 },
      { id: 'sandbag', weight: 250, distance: 20 },
    ]
  },
  press_medley: {
    name: 'Press Medley',
    implements: [
      { id: 'log_press', weight: 300 },
      { id: 'axle_press', weight: 350 },
      { id: 'circus_dumbbell', weight: 150 },
    ]
  },
  loading_race: {
    name: 'Loading Race',
    implements: [
      { id: 'keg_load', weight: 250 },
      { id: 'sandbag', weight: 300 },
      { id: 'atlas_stones', weight: 275 },
      { id: 'keg_load', weight: 300 },
    ]
  }
};

const Strongman = () => {
  const [activeTab, setActiveTab] = useState('implements');
  const [selectedImplement, setSelectedImplement] = useState(null);
  const [customMedley, setCustomMedley] = useState([]);
  const [savedMedleys, setSavedMedleys] = useState([]);
  const [activeMedley, setActiveMedley] = useState(null);
  const [medleyTimer, setMedleyTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [medleyProgress, setMedleyProgress] = useState(0);
  const [tackyTimer, setTackyTimer] = useState(0);
  const [isTackyActive, setIsTackyActive] = useState(false);
  const [personalBests, setPersonalBests] = useState({});

  // Load saved data
  useEffect(() => {
    const savedMedleys = localStorage.getItem('gritfit_sm_medleys');
    if (savedMedleys) setSavedMedleys(JSON.parse(savedMedleys));
    
    const savedPBs = localStorage.getItem('gritfit_sm_pb');
    if (savedPBs) setPersonalBests(JSON.parse(savedPBs));
  }, []);

  // Medley timer
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setMedleyTimer(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Tacky timer (strongman use tacky for stone lifting)
  useEffect(() => {
    let interval;
    if (isTackyActive && tackyTimer < 600) { // 10 minutes max
      interval = setInterval(() => {
        setTackyTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTackyActive, tackyTimer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const formatTackyTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addToMedley = (implementId, weight, distance = null) => {
    const implement = IMPLEMENTS[implementId];
    setCustomMedley(prev => [...prev, {
      id: Date.now(),
      implementId,
      name: implement.name,
      weight,
      distance,
      completed: false
    }]);
  };

  const removeFromMedley = (id) => {
    setCustomMedley(prev => prev.filter(item => item.id !== id));
  };

  const saveMedley = (name) => {
    const newMedley = {
      id: Date.now(),
      name,
      implements: customMedley,
      created: new Date().toISOString()
    };
    const updated = [...savedMedleys, newMedley];
    setSavedMedleys(updated);
    localStorage.setItem('gritfit_sm_medleys', JSON.stringify(updated));
    setCustomMedley([]);
  };

  const loadMedley = (medley) => {
    setActiveMedley(medley);
    setMedleyProgress(0);
    setMedleyTimer(0);
    setActiveTab('active');
  };

  const completeImplement = (index) => {
    if (!activeMedley) return;
    
    const updated = { ...activeMedley };
    updated.implements[index].completed = true;
    updated.implements[index].completedTime = medleyTimer;
    setActiveMedley(updated);
    
    const completedCount = updated.implements.filter(i => i.completed).length;
    setMedleyProgress(completedCount / updated.implements.length);
    
    if (completedCount === updated.implements.length) {
      setIsTimerRunning(false);
      // Save result
      const result = {
        medleyName: activeMedley.name,
        totalTime: medleyTimer,
        date: new Date().toISOString()
      };
      const results = JSON.parse(localStorage.getItem('gritfit_sm_results') || '[]');
      results.push(result);
      localStorage.setItem('gritfit_sm_results', JSON.stringify(results));
    }
  };

  const savePersonalBest = (implementId, weight, time = null, distance = null) {
    const pb = {
      implementId,
      weight,
      time,
      distance,
      date: new Date().toISOString()
    };
    const updated = { ...personalBests, [implementId]: pb };
    setPersonalBests(updated);
    localStorage.setItem('gritfit_sm_pb', JSON.stringify(updated));
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#ef4444] flex items-center justify-center">
            <Dumbbell size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Strongman</h2>
            <p className="text-zinc-400 text-sm">Implement training & events</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {['implements', 'medleys', 'active', 'tacky'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Implements Tab */}
      {activeTab === 'implements' && (
        <div className="space-y-4">
          {selectedImplement ? (
            <div className="exercise-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{IMPLEMENTS[selectedImplement].name}</h3>
                  <span className="inline-block px-2 py-1 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-medium mt-2">
                    {IMPLEMENTS[selectedImplement].category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedImplement(null)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-zinc-400 text-sm mb-4">
                {IMPLEMENTS[selectedImplement].description}
              </p>

              {/* World Record */}
              <div className="p-3 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy size={16} className="text-[#f59e0b]" />
                  <span className="text-[#f59e0b] text-sm font-semibold">World Record</span>
                </div>
                <p className="text-white font-bold">
                  {IMPLEMENTS[selectedImplement].worldRecord.weight} lbs
                </p>
                <p className="text-zinc-400 text-xs">
                  {IMPLEMENTS[selectedImplement].worldRecord.holder}
                </p>
              </div>

              {/* Personal Best */}
              {personalBests[selectedImplement] && (
                <div className="p-3 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 mb-4">
                  <p className="text-[#10b981] text-sm font-semibold mb-1">Your Personal Best</p>
                  <p className="text-white font-bold">
                    {personalBests[selectedImplement].weight} lbs
                  </p>
                </div>
              )}

              {/* Weight Selection */}
              <h4 className="font-semibold text-white mb-3">Available Weights</h4>
              <div className="grid grid-cols-3 gap-2">
                {IMPLEMENTS[selectedImplement].weights.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => savePersonalBest(selectedImplement, weight)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white text-sm font-medium"
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <p className="text-zinc-400 text-sm mb-4">
                Select an implement to view details and track your performance
              </p>
              {Object.entries(IMPLEMENTS).map(([id, implement]) => (
                <button
                  key={id}
                  onClick={() => setSelectedImplement(id)}
                  className="w-full exercise-card hover-lift text-left"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{implement.name}</h3>
                      <p className="text-zinc-400 text-sm">{implement.description}</p>
                      <span className="inline-block px-2 py-1 rounded-full bg-white/5 text-zinc-400 text-xs mt-2">
                        {implement.category}
                      </span>
                    </div>
                    <ChevronRight size={20} className="text-zinc-500" />
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Medleys Tab */}
      {activeTab === 'medleys' && (
        <div className="space-y-4">
          {/* Template Medleys */}
          <div className="exercise-card">
            <h3 className="font-semibold text-white mb-3">Template Medleys</h3>
            <div className="space-y-2">
              {Object.entries(MEDLEY_TEMPLATES).map(([id, medley]) => (
                <button
                  key={id}
                  onClick={() => loadMedley(medley)}
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <p className="font-medium text-white">{medley.name}</p>
                  <p className="text-zinc-400 text-xs">
                    {medley.implements.length} implements
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Medley Builder */}
          <div className="exercise-card">
            <h3 className="font-semibold text-white mb-3">Build Custom Medley</h3>
            
            {customMedley.length === 0 ? (
              <p className="text-zinc-400 text-sm">Add implements to build your medley</p>
            ) : (
              <div className="space-y-2 mb-4">
                {customMedley.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <div>
                      <p className="font-medium text-white">{idx + 1}. {item.name}</p>
                      <p className="text-zinc-400 text-xs">
                        {item.weight} lbs
                        {item.distance && ` × ${item.distance}m`}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromMedley(item.id)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Implement */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.entries(IMPLEMENTS).slice(0, 6).map(([id, implement]) => (
                <button
                  key={id}
                  onClick={() => addToMedley(id, implement.weights[0])}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <p className="text-white text-xs font-medium">+ {implement.name}</p>
                </button>
              ))}
            </div>

            {customMedley.length > 0 && (
              <button
                onClick={() => saveMedley(`Custom Medley ${savedMedleys.length + 1}`)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white font-semibold"
              >
                <Save size={16} className="inline mr-2" />
                Save Medley
              </button>
            )}
          </div>

          {/* Saved Medleys */}
          {savedMedleys.length > 0 && (
            <div className="exercise-card">
              <h3 className="font-semibold text-white mb-3">Your Medleys</h3>
              <div className="space-y-2">
                {savedMedleys.map((medley) => (
                  <div
                    key={medley.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                  >
                    <div>
                      <p className="font-medium text-white">{medley.name}</p>
                      <p className="text-zinc-400 text-xs">
                        {medley.implements.length} implements
                      </p>
                    </div>
                    <button
                      onClick={() => loadMedley(medley)}
                      className="px-3 py-1 rounded-lg bg-[#f59e0b]/20 text-[#f59e0b] text-sm font-medium"
                    >
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Medley Tab */}
      {activeTab === 'active' && activeMedley && (
        <div className="space-y-4">
          {/* Timer Display */}
          <div className="exercise-card text-center">
            <h3 className="font-semibold text-white mb-2">{activeMedley.name}</h3>
            <p className="text-5xl font-black gradient-text font-mono">
              {formatTime(medleyTimer)}
            </p>
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                  isTimerRunning
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-gradient-to-r from-[#10b981] to-[#00d4ff] text-white'
                }`}
              >
                {isTimerRunning ? <Pause size={20} /> : <Play size={20} />}
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setMedleyTimer(0);
                  setMedleyProgress(0);
                }}
                className="p-3 rounded-xl bg-white/5 text-zinc-400 hover:bg-white/10"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#f59e0b] to-[#ef4444] transition-all duration-300"
              style={{ width: `${medleyProgress * 100}%` }}
            />
          </div>

          {/* Implements List */}
          <div className="space-y-2">
            {activeMedley.implements.map((item, idx) => (
              <div
                key={idx}
                className={`exercise-card flex items-center justify-between ${
                  item.completed ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.completed ? 'bg-[#10b981]' : 'bg-white/10'
                  }`}>
                    {item.completed ? (
                      <Trophy size={16} className="text-white" />
                    ) : (
                      <span className="text-zinc-400 text-sm">{idx + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${item.completed ? 'text-zinc-500 line-through' : 'text-white'}`}>
                      {item.name}
                    </p>
                    <p className="text-zinc-400 text-xs">
                      {item.weight} lbs
                      {item.distance && ` × ${item.distance}m`}
                      {item.completedTime && ` (${formatTime(item.completedTime)})`}
                    </p>
                  </div>
                </div>
                {!item.completed && (
                  <button
                    onClick={() => completeImplement(idx)}
                    className="px-3 py-1 rounded-lg bg-[#10b981]/20 text-[#10b981] text-sm font-medium"
                  >
                    Done
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'active' && !activeMedley && (
        <div className="text-center py-12">
          <Dumbbell size={48} className="text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No active medley</p>
          <button
            onClick={() => setActiveTab('medleys')}
            className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white font-medium"
          >
            Choose a Medley
          </button>
        </div>
      )}

      {/* Tacky Timer Tab */}
      {activeTab === 'tacky' && (
        <div className="space-y-4">
          <div className="exercise-card text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Droplets size={32} className="text-[#f59e0b]" />
              <h3 className="text-xl font-bold text-white">Tacky Timer</h3>
            </div>
            
            <p className="text-zinc-400 text-sm mb-6">
              Track how long your tacky stays sticky during stone training
            </p>

            <div className="text-6xl font-black text-[#f59e0b] font-mono mb-6">
              {formatTackyTime(tackyTimer)}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setIsTackyActive(!isTackyActive)}
                className={`flex-1 py-4 rounded-xl font-semibold text-lg ${
                  isTackyActive
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white'
                }`}
              >
                {isTackyActive ? 'Stop' : 'Start Tacky'}
              </button>
              <button
                onClick={() => {
                  setIsTackyActive(false);
                  setTackyTimer(0);
                }}
                className="p-4 rounded-xl bg-white/5 text-zinc-400 hover:bg-white/10"
              >
                <RotateCcw size={24} />
              </button>
            </div>

            {tackyTimer >= 300 && ( // 5 minutes warning
              <div className="mt-4 p-3 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20">
                <p className="text-[#f59e0b] text-sm">
                  ⚠️ Tacky may be losing effectiveness. Consider reapplying.
                </p>
              </div>
            )}
          </div>

          <div className="exercise-card">
            <h4 className="font-semibold text-white mb-3">Tacky Tips</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-[#f59e0b]">•</span>
                Apply tacky to forearms and chest
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f59e0b]">•</span>
                Warm up stones before applying tacky
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f59e0b]">•</span>
                Average effective time: 5-8 minutes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#f59e0b]">•</span>
                Use baby oil to remove tacky after training
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Strongman;
