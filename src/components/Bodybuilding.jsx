import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  TrendingUp, 
  Plus, 
  Minus, 
  Save, 
  RotateCcw,
  Droplets,
  Trophy,
  ChevronRight,
  X
} from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';
import FeatureButton from './FeatureButton';

// Bodybuilding-focused muscle volume tracking
const muscleGroups = [
  { id: 'chest', name: 'Chest', color: '#ef4444' },
  { id: 'back', name: 'Back', color: '#3b82f6' },
  { id: 'shoulders', name: 'Shoulders', color: '#10b981' },
  { id: 'biceps', name: 'Biceps', color: '#f59e0b' },
  { id: 'triceps', name: 'Triceps', color: '#8b5cf6' },
  { id: 'quads', name: 'Quads', color: '#ec4899' },
  { id: 'hamstrings', name: 'Hamstrings', color: '#06b6d4' },
  { id: 'calves', name: 'Calves', color: '#84cc16' },
];

// Exercise variations database
const exerciseVariations = {
  chest: [
    'Flat Barbell Press', 'Incline Barbell Press', 'Decline Barbell Press',
    'Flat Dumbbell Press', 'Incline Dumbbell Press', 'Decline Dumbbell Press',
    'Cable Flyes', 'Pec Deck', 'Push-ups', 'Dips'
  ],
  back: [
    'Deadlift', 'Pull-ups', 'Lat Pulldown', 'Barbell Row', 'Dumbbell Row',
    'Seated Cable Row', 'T-Bar Row', 'Pendlay Row', 'Rack Pulls', 'Shrugs'
  ],
  shoulders: [
    'Overhead Press', 'Dumbbell Press', 'Arnold Press', 'Lateral Raises',
    'Front Raises', 'Rear Delt Flyes', 'Face Pulls', 'Upright Rows'
  ],
  biceps: [
    'Barbell Curls', 'Dumbbell Curls', 'Hammer Curls', 'Preacher Curls',
    'Incline Curls', 'Cable Curls', 'Concentration Curls', 'Spider Curls'
  ],
  triceps: [
    'Close-Grip Bench', 'Skullcrushers', 'Tricep Pushdowns', 'Overhead Extension',
    'Dips', 'Kickbacks', 'Rope Pushdowns', 'JM Press'
  ],
  quads: [
    'Squat', 'Front Squat', 'Leg Press', 'Hack Squat', 'Leg Extension',
    'Lunges', 'Bulgarian Split Squat', 'Goblet Squat', 'Box Squat'
  ],
  hamstrings: [
    'Romanian Deadlift', 'Leg Curl', 'Stiff-Leg Deadlift', 'Good Morning',
    'Glute-Ham Raise', 'Nordic Curl', 'Single-Leg RDL'
  ],
  calves: [
    'Standing Calf Raise', 'Seated Calf Raise', 'Leg Press Calf Raise',
    'Donkey Calf Raise', 'Single-Leg Calf Raise'
  ]
};

const Bodybuilding = () => {
  const { checkAccess } = useSubscription();
  const [activeTab, setActiveTab] = useState('workout');
  const [pumpRating, setPumpRating] = useState(0);
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [workoutLog, setWorkoutLog] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    muscleGroup: '',
    sets: [],
    pumpRating: 0,
    notes: ''
  });
  const [physiquePhotos, setPhysiquePhotos] = useState({
    front: null,
    side: null,
    back: null
  });
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoType, setPhotoType] = useState(null);

  // Load saved data
  useEffect(() => {
    const savedLog = localStorage.getItem('gritfit_bb_log');
    if (savedLog) setWorkoutLog(JSON.parse(savedLog));
    
    const savedPhotos = localStorage.getItem('gritfit_bb_photos');
    if (savedPhotos) setPhysiquePhotos(JSON.parse(savedPhotos));
  }, []);

  const saveWorkoutLog = (log) => {
    setWorkoutLog(log);
    localStorage.setItem('gritfit_bb_log', JSON.stringify(log));
  };

  const addSet = () => {
    setCurrentExercise(prev => ({
      ...prev,
      sets: [...prev.sets, { reps: '', weight: '', rpe: '' }]
    }));
  };

  const updateSet = (index, field, value) => {
    setCurrentExercise(prev => ({
      ...prev,
      sets: prev.sets.map((set, i) => 
        i === index ? { ...set, [field]: value } : set
      )
    }));
  };

  const removeSet = (index) => {
    setCurrentExercise(prev => ({
      ...prev,
      sets: prev.sets.filter((_, i) => i !== index)
    }));
  };

  const saveExercise = () => {
    if (!currentExercise.name || currentExercise.sets.length === 0) return;
    
    const exercise = {
      ...currentExercise,
      pumpRating,
      id: Date.now(),
      date: new Date().toISOString()
    };
    
    saveWorkoutLog([...workoutLog, exercise]);
    setCurrentExercise({ name: '', muscleGroup: '', sets: [], pumpRating: 0, notes: '' });
    setPumpRating(0);
    setSelectedMuscle(null);
  };

  const calculateTotalVolume = () => {
    return workoutLog.reduce((total, exercise) => {
      return total + exercise.sets.reduce((setTotal, set) => {
        return setTotal + (parseFloat(set.weight) || 0) * (parseFloat(set.reps) || 0);
      }, 0);
    }, 0);
  };

  const getMuscleVolume = (muscleId) => {
    return workoutLog
      .filter(ex => ex.muscleGroup === muscleId)
      .reduce((total, ex) => {
        return total + ex.sets.reduce((setTotal, set) => {
          return setTotal + (parseFloat(set.weight) || 0) * (parseFloat(set.reps) || 0);
        }, 0);
      }, 0);
  };

  const handlePhotoCapture = (type) => {
    // In a real app, this would use the camera API
    // For now, we'll simulate with a placeholder
    const photo = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`;
    setPhysiquePhotos(prev => ({
      ...prev,
      [type]: { url: photo, date: new Date().toISOString() }
    }));
    localStorage.setItem('gritfit_bb_photos', JSON.stringify({
      ...physiquePhotos,
      [type]: { url: photo, date: new Date().toISOString() }
    }));
    setShowPhotoModal(false);
  };

  const PumpMeter = ({ rating, onChange, size = 'md' }) => {
    const droplets = [1, 2, 3, 4, 5];
    const sizes = {
      sm: 'w-6 h-6',
      md: 'w-10 h-10',
      lg: 'w-14 h-14'
    };
    
    return (
      <div className="flex items-center gap-2">
        {droplets.map((level) => (
          <button
            key={level}
            onClick={() => onChange(level)}
            className={`${sizes[size]} rounded-xl flex items-center justify-center transition-all ${
              rating >= level
                ? 'bg-gradient-to-br from-[#ec4899] to-[#a855f7] text-white shadow-lg shadow-[#ec4899]/30'
                : 'bg-white/5 text-zinc-600 hover:bg-white/10'
            }`}
          >
            <Droplets size={size === 'lg' ? 24 : size === 'md' ? 18 : 14} />
          </button>
        ))}
      </div>
    );
  };

  const ExerciseVariationsModal = ({ muscle, onClose, onSelect }) => {
    if (!muscle) return null;
    const variations = exerciseVariations[muscle.id] || [];
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-[#12121a] border border-white/10 rounded-2xl w-full max-w-md max-h-[70vh] overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-white">{muscle.name} Exercises</h3>
            <button onClick={onClose} className="p-1 text-zinc-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[50vh] space-y-2">
            {variations.map((exercise, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelect(exercise);
                  onClose();
                }}
                className="w-full p-3 text-left rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white text-sm"
              >
                {exercise}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#a855f7] flex items-center justify-center">
            <Droplets size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Bodybuilding</h2>
            <p className="text-zinc-400 text-sm">Muscle-focused training</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['workout', 'volume', 'photos'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#ec4899] to-[#a855f7] text-white'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Workout Tab */}
      {activeTab === 'workout' && (
        <div className="space-y-4">
          {/* Muscle Group Selection */}
          <div className="exercise-card">
            <h3 className="font-semibold text-white mb-3">Select Muscle Group</h3>
            <div className="grid grid-cols-4 gap-2">
              {muscleGroups.map((muscle) => (
                <button
                  key={muscle.id}
                  onClick={() => {
                    setSelectedMuscle(muscle);
                    setCurrentExercise(prev => ({ ...prev, muscleGroup: muscle.id }));
                  }}
                  className={`p-2 rounded-xl text-xs font-medium transition-all ${
                    selectedMuscle?.id === muscle.id
                      ? 'text-white'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: selectedMuscle?.id === muscle.id ? muscle.color : undefined
                  }}
                >
                  {muscle.name}
                </button>
              ))}
            </div>
          </div>

          {/* Exercise Selection */}
          {selectedMuscle && (
            <div className="exercise-card">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-white">Exercise</h3>
                <button
                  onClick={() => setCurrentExercise(prev => ({ ...prev, name: '' }))}
                  className="text-xs text-[#ec4899]"
                >
                  Change Exercise
                </button>
              </div>
              
              {!currentExercise.name ? (
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {exerciseVariations[selectedMuscle.id]?.map((exercise, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentExercise(prev => ({ ...prev, name: exercise }))}
                      className="p-3 text-left rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white text-sm flex justify-between items-center"
                    >
                      {exercise}
                      <ChevronRight size={16} className="text-zinc-500" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-white/5">
                  <p className="font-semibold text-white">{currentExercise.name}</p>
                </div>
              )}
            </div>
          )}

          {/* Sets */}
          {currentExercise.name && (
            <div className="exercise-card">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-white">Sets</h3>
                <button
                  onClick={addSet}
                  className="p-1 rounded-lg bg-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/30 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="space-y-2">
                {currentExercise.sets.map((set, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-zinc-500 text-sm w-8">{idx + 1}</span>
                    <input
                      type="number"
                      placeholder="Lbs"
                      value={set.weight}
                      onChange={(e) => updateSet(idx, 'weight', e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#ec4899] outline-none"
                    />
                    <span className="text-zinc-500">×</span>
                    <input
                      type="number"
                      placeholder="Reps"
                      value={set.reps}
                      onChange={(e) => updateSet(idx, 'reps', e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-[#ec4899] outline-none"
                    />
                    <input
                      type="number"
                      placeholder="RPE"
                      min="1"
                      max="10"
                      value={set.rpe}
                      onChange={(e) => updateSet(idx, 'rpe', e.target.value)}
                      className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-sm focus:border-[#ec4899] outline-none"
                    />
                    <button
                      onClick={() => removeSet(idx)}
                      className="p-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pump Rating */}
          {currentExercise.sets.length > 0 && (
            <div className="exercise-card">
              <h3 className="font-semibold text-white mb-3">Pump Rating</h3>
              <PumpMeter rating={pumpRating} onChange={setPumpRating} size="lg" />
              <p className="text-zinc-400 text-xs mt-2">
                {pumpRating === 0 && 'Rate your pump'}
                {pumpRating === 1 && 'Light pump'}
                {pumpRating === 2 && 'Good pump'}
                {pumpRating === 3 && 'Great pump'}
                {pumpRating === 4 && 'Insane pump'}
                {pumpRating === 5 && 'Skin-splitting pump!'}
              </p>
            </div>
          )}

          {/* Save Button */}
          {currentExercise.sets.length > 0 && (
            <button
              onClick={saveExercise}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ec4899] to-[#a855f7] text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#ec4899]/30 transition-all"
            >
              <Save size={20} />
              Log Exercise
            </button>
          )}
        </div>
      )}

      {/* Volume Tab */}
      {activeTab === 'volume' && (
        <div className="space-y-4">
          <div className="exercise-card">
            <h3 className="font-semibold text-white mb-2">Total Volume</h3>
            <p className="text-3xl font-bold gradient-text">
              {Math.round(calculateTotalVolume()).toLocaleString()} lbs
            </p>
            <p className="text-zinc-400 text-sm">All time tracked volume</p>
          </div>

          <div className="exercise-card">
            <h3 className="font-semibold text-white mb-4">Volume by Muscle Group</h3>
            <div className="space-y-3">
              {muscleGroups.map((muscle) => {
                const volume = getMuscleVolume(muscle.id);
                const maxVolume = Math.max(...muscleGroups.map(m => getMuscleVolume(m.id)), 1);
                const percentage = (volume / maxVolume) * 100;
                
                return (
                  <div key={muscle.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-zinc-300">{muscle.name}</span>
                      <span className="text-zinc-400">{Math.round(volume).toLocaleString()} lbs</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: muscle.color
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Photos Tab */}
      {activeTab === 'photos' && (
        <div className="space-y-4">
          <div className="exercise-card">
            <div className="flex items-center gap-3 mb-4">
              <Camera size={24} className="text-[#ec4899]" />
              <div>
                <h3 className="font-semibold text-white">Physique Photos</h3>
                <p className="text-zinc-400 text-sm">Track your visual progress</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {['front', 'side', 'back'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setPhotoType(type);
                    setShowPhotoModal(true);
                  }}
                  className="aspect-[3/4] rounded-xl bg-white/5 border-2 border-dashed border-white/20 flex flex-col items-center justify-center hover:border-[#ec4899]/50 transition-colors overflow-hidden"
                >
                  {physiquePhotos[type] ? (
                    <img 
                      src={physiquePhotos[type].url} 
                      alt={type}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <Camera size={24} className="text-zinc-500 mb-2" />
                      <span className="text-zinc-500 text-xs capitalize">{type}</span>
                    </>
                  )}
                </button>
              ))}
            </div>

            {Object.values(physiquePhotos).some(p => p !== null) && (
              <div className="mt-4 p-3 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20">
                <p className="text-[#10b981] text-sm flex items-center gap-2">
                  <Trophy size={16} />
                  Last updated: {new Date(Object.values(physiquePhotos).find(p => p)?.date).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#12121a] border border-white/10 rounded-2xl w-full max-w-sm p-6">
            <h3 className="font-bold text-white text-lg mb-4 capitalize">
              Take {photoType} Photo
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              Position yourself in good lighting against a plain background for consistent progress tracking.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="flex-1 py-3 rounded-xl bg-white/5 text-zinc-300 font-medium hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePhotoCapture(photoType)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#a855f7] text-white font-medium hover:shadow-lg hover:shadow-[#ec4899]/30 transition-all"
              >
                Capture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bodybuilding;
