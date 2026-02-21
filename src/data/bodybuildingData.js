// Bodybuilding Training Discipline Data
export const bodybuildingData = {
  name: 'Bodybuilding',
  description: 'Build muscle, sculpt your physique, and maximize hypertrophy with science-backed training protocols.',
  icon: '💪',
  color: 'from-[#f59e0b] to-[#ef4444]',
  
  // Volume tracking by muscle group (weekly targets in sets)
  volumeTargets: {
    chest: { min: 12, max: 20, optimal: 16 },
    back: { min: 12, max: 22, optimal: 18 },
    shoulders: { min: 10, max: 18, optimal: 14 },
    biceps: { min: 8, max: 14, optimal: 12 },
    triceps: { min: 8, max: 14, optimal: 12 },
    quads: { min: 12, max: 20, optimal: 16 },
    hamstrings: { min: 8, max: 16, optimal: 12 },
    glutes: { min: 8, max: 16, optimal: 12 },
    calves: { min: 8, max: 16, optimal: 12 },
    abs: { min: 10, max: 20, optimal: 15 }
  },

  // Muscle group categories
  muscleGroups: [
    {
      id: 'chest',
      name: 'Chest',
      exercises: ['Bench Press', 'Incline Press', 'Flyes', 'Dips', 'Cable Crossovers'],
      frequency: '2x/week recommended'
    },
    {
      id: 'back',
      name: 'Back',
      exercises: ['Pull-ups', 'Rows', 'Lat Pulldowns', 'Deadlifts', 'Pullover'],
      frequency: '2x/week recommended'
    },
    {
      id: 'shoulders',
      name: 'Shoulders',
      exercises: ['Overhead Press', 'Lateral Raises', 'Rear Delt Flyes', 'Upright Rows'],
      frequency: '2-3x/week recommended'
    },
    {
      id: 'arms',
      name: 'Arms',
      exercises: ['Curls', 'Extensions', 'Close-Grip Press', 'Hammer Curls'],
      frequency: '2-3x/week recommended'
    },
    {
      id: 'legs',
      name: 'Legs',
      exercises: ['Squats', 'Leg Press', 'Leg Curls', 'Leg Extensions', 'Lunges'],
      frequency: '2x/week recommended'
    }
  ],

  // Exercise variations database
  exercises: [
    // Chest
    { id: 'bb-bench', name: 'Barbell Bench Press', muscle: 'chest', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'db-bench', name: 'Dumbbell Bench Press', muscle: 'chest', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'incline-bb', name: 'Incline Barbell Press', muscle: 'chest', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'incline-db', name: 'Incline Dumbbell Press', muscle: 'chest', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'cable-fly', name: 'Cable Flyes', muscle: 'chest', equipment: 'cable', difficulty: 'beginner' },
    { id: 'db-fly', name: 'Dumbbell Flyes', muscle: 'chest', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'dips', name: 'Chest Dips', muscle: 'chest', equipment: 'bodyweight', difficulty: 'intermediate' },
    { id: 'machine-fly', name: 'Pec Deck Machine', muscle: 'chest', equipment: 'machine', difficulty: 'beginner' },
    
    // Back
    { id: 'pullups', name: 'Pull-ups', muscle: 'back', equipment: 'bodyweight', difficulty: 'intermediate' },
    { id: 'lat-pulldown', name: 'Lat Pulldown', muscle: 'back', equipment: 'cable', difficulty: 'beginner' },
    { id: 'bb-row', name: 'Barbell Row', muscle: 'back', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'db-row', name: 'Dumbbell Row', muscle: 'back', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'cable-row', name: 'Seated Cable Row', muscle: 'back', equipment: 'cable', difficulty: 'beginner' },
    { id: 't-bar-row', name: 'T-Bar Row', muscle: 'back', equipment: 'machine', difficulty: 'intermediate' },
    { id: 'deadlift', name: 'Deadlift', muscle: 'back', equipment: 'barbell', difficulty: 'advanced' },
    
    // Shoulders
    { id: 'ohp', name: 'Overhead Press', muscle: 'shoulders', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'db-ohp', name: 'Dumbbell Overhead Press', muscle: 'shoulders', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'lat-raise', name: 'Lateral Raises', muscle: 'shoulders', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'cable-lat', name: 'Cable Lateral Raises', muscle: 'shoulders', equipment: 'cable', difficulty: 'beginner' },
    { id: 'rear-delt', name: 'Rear Delt Flyes', muscle: 'shoulders', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'face-pull', name: 'Face Pulls', muscle: 'shoulders', equipment: 'cable', difficulty: 'beginner' },
    
    // Arms
    { id: 'bb-curl', name: 'Barbell Curl', muscle: 'biceps', equipment: 'barbell', difficulty: 'beginner' },
    { id: 'db-curl', name: 'Dumbbell Curl', muscle: 'biceps', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'hammer-curl', name: 'Hammer Curl', muscle: 'biceps', equipment: 'dumbbell', difficulty: 'beginner' },
    { id: 'preacher-curl', name: 'Preacher Curl', muscle: 'biceps', equipment: 'barbell', difficulty: 'beginner' },
    { id: 'cable-curl', name: 'Cable Curl', muscle: 'biceps', equipment: 'cable', difficulty: 'beginner' },
    { id: 'skull-crush', name: 'Skull Crushers', muscle: 'triceps', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'cable-push', name: 'Cable Pushdowns', muscle: 'triceps', equipment: 'cable', difficulty: 'beginner' },
    { id: 'close-grip', name: 'Close-Grip Bench', muscle: 'triceps', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'overhead-ext', name: 'Overhead Extension', muscle: 'triceps', equipment: 'dumbbell', difficulty: 'beginner' },
    
    // Legs
    { id: 'squat', name: 'Barbell Squat', muscle: 'quads', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'leg-press', name: 'Leg Press', muscle: 'quads', equipment: 'machine', difficulty: 'beginner' },
    { id: 'hack-squat', name: 'Hack Squat', muscle: 'quads', equipment: 'machine', difficulty: 'beginner' },
    { id: 'leg-ext', name: 'Leg Extensions', muscle: 'quads', equipment: 'machine', difficulty: 'beginner' },
    { id: 'rom-dead', name: 'Romanian Deadlift', muscle: 'hamstrings', equipment: 'barbell', difficulty: 'intermediate' },
    { id: 'leg-curl', name: 'Leg Curls', muscle: 'hamstrings', equipment: 'machine', difficulty: 'beginner' },
    { id: 'lunges', name: 'Walking Lunges', muscle: 'quads', equipment: 'dumbbell', difficulty: 'intermediate' },
    { id: 'calf-raise', name: 'Calf Raises', muscle: 'calves', equipment: 'machine', difficulty: 'beginner' }
  ],

  // Pump rating scale
  pumpRatings: [
    { value: 1, label: 'Light', color: '#10b981', description: 'Mild pump, barely noticeable' },
    { value: 2, label: 'Moderate', color: '#3b82f6', description: 'Good pump, muscles feel full' },
    { value: 3, label: 'Strong', color: '#8b5cf6', description: 'Intense pump, skin tight' },
    { value: 4, label: 'Extreme', color: '#f59e0b', description: 'Maximum pump, painful fullness' },
    { value: 5, label: 'Skin-Splitting', color: '#ef4444', description: 'Unreal pump, nearly unbearable' }
  ],

  // Sample splits
  trainingSplits: [
    {
      name: 'Push/Pull/Legs',
      days: 6,
      description: 'Classic PPL split for high frequency training',
      schedule: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Legs', 'Rest']
    },
    {
      name: 'Upper/Lower',
      days: 4,
      description: 'Great for building strength and size with moderate frequency',
      schedule: ['Upper', 'Lower', 'Rest', 'Upper', 'Lower', 'Rest', 'Rest']
    },
    {
      name: 'Bro Split',
      days: 5,
      description: 'One muscle group per day for maximum volume per session',
      schedule: ['Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Rest', 'Rest']
    },
    {
      name: 'Full Body',
      days: 3,
      description: 'Hit every muscle 3x per week for maximum frequency',
      schedule: ['Full Body', 'Rest', 'Full Body', 'Rest', 'Full Body', 'Rest', 'Rest']
    }
  ]
};

export default bodybuildingData;
