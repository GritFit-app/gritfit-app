import React, { useState } from 'react';
import { Search, Filter, Dumbbell, ChevronRight, Play, Info } from 'lucide-react';

const ExerciseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const muscleGroups = [
    { id: 'all', label: 'All' },
    { id: 'chest', label: 'Chest' },
    { id: 'back', label: 'Back' },
    { id: 'shoulders', label: 'Shoulders' },
    { id: 'arms', label: 'Arms' },
    { id: 'legs', label: 'Legs' },
    { id: 'core', label: 'Core' },
  ];

  const exercises = [
    {
      id: 1,
      name: 'Barbell Bench Press',
      muscle: 'chest',
      equipment: 'Barbell',
      difficulty: 'intermediate',
      description: 'The king of chest exercises. Lie on a bench and press the bar up.',
      tips: ['Keep feet planted', 'Arch lower back slightly', 'Touch chest at bottom'],
      videoUrl: '#'
    },
    {
      id: 2,
      name: 'Incline Dumbbell Press',
      muscle: 'chest',
      equipment: 'Dumbbells',
      difficulty: 'intermediate',
      description: 'Hits the upper chest. Set bench to 30-45 degrees.',
      tips: ['Control the descent', 'Don\'t lock elbows at top', 'Full range of motion'],
      videoUrl: '#'
    },
    {
      id: 3,
      name: 'Pull-ups',
      muscle: 'back',
      equipment: 'Bodyweight',
      difficulty: 'intermediate',
      description: 'Classic back builder. Pull your chin over the bar.',
      tips: ['Full dead hang at bottom', 'Lead with chest', 'Control the negative'],
      videoUrl: '#'
    },
    {
      id: 4,
      name: 'Barbell Squat',
      muscle: 'legs',
      equipment: 'Barbell',
      difficulty: 'advanced',
      description: 'The foundation of leg training. Squat down and stand up.',
      tips: ['Break parallel', 'Keep chest up', 'Drive through heels'],
      videoUrl: '#'
    },
    {
      id: 5,
      name: 'Deadlift',
      muscle: 'back',
      equipment: 'Barbell',
      difficulty: 'advanced',
      description: 'Full body powerhouse. Lift bar from ground to hip level.',
      tips: ['Keep back flat', 'Hinge at hips', 'Brace core hard'],
      videoUrl: '#'
    },
    {
      id: 6,
      name: 'Overhead Press',
      muscle: 'shoulders',
      equipment: 'Barbell',
      difficulty: 'intermediate',
      description: 'Build big shoulders. Press bar from shoulders to overhead.',
      tips: ['Tight core', 'Head through at top', 'Don\'t lean back'],
      videoUrl: '#'
    },
  ];

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscle = selectedMuscle === 'all' || ex.muscle === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'beginner': return 'text-[#10b981]';
      case 'intermediate': return 'text-[#f59e0b]';
      case 'advanced': return 'text-[#ef4444]';
      default: return 'text-zinc-500';
    }
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="section-header mb-2">Exercise Library</h2>
        <p className="text-zinc-400 text-sm">Learn proper form and technique</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500" size={20} />
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-modern pl-12"
        />
      </div>

      {/* Muscle Filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
        {muscleGroups.map((muscle) => (
          <button
            key={muscle.id}
            onClick={() => setSelectedMuscle(muscle.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
              selectedMuscle === muscle.id
                ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            {muscle.label}
          </button>
        ))}
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
            className="exercise-card cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#a855f7]/20 flex items-center justify-center">
                <Dumbbell size={24} className="text-[#00d4ff]" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                  {exercise.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="capitalize">{exercise.muscle}</span>
                  <span>•</span>
                  <span>{exercise.equipment}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold capitalize ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
                <ChevronRight size={20} className="text-zinc-600 mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#1a1a24] rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#1a1a24] p-6 border-b border-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedExercise.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <span className="capitalize">{selectedExercise.muscle}</span>
                    <span>•</span>
                    <span>{selectedExercise.equipment}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedExercise(null)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10"
                >
                  <span className="text-2xl text-zinc-400">&times;</span>
                </button>
              </div>
            </div>

            {/* Video Placeholder */}
            <div className="aspect-video bg-zinc-900 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 rounded-full bg-[#00d4ff] flex items-center justify-center shadow-lg shadow-[#00d4ff]/30">
                  <Play size={28} className="text-white ml-1" fill="white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-2">How to Perform</h4>
                <p className="text-zinc-400">{selectedExercise.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Pro Tips</h4>
                <ul className="space-y-2">
                  {selectedExercise.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-zinc-400">
                      <span className="text-[#00d4ff] mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Dumbbell size={18} />
                Add to Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;
