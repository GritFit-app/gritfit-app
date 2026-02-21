// Powerlifting Training Discipline Data
export const powerliftingData = {
  name: 'Powerlifting',
  description: 'Maximize strength in the Big Three: Squat, Bench Press, and Deadlift. Track RPE, build periodization, and compete.',
  icon: '🏋️',
  color: 'from-[#ef4444] to-[#dc2626]',
  
  // The Big Three
  competitionLifts: [
    {
      id: 'squat',
      name: 'Competition Squat',
      description: 'High-bar or low-bar back squat to competition depth',
      muscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
      federationRules: {
        ipf: 'Hip crease below top of knee',
        usapl: 'Hip crease below top of knee',
        uspa: 'Hip crease below top of knee'
      }
    },
    {
      id: 'bench',
      name: 'Competition Bench Press',
      description: 'Paused bench press with full body contact',
      muscles: ['Chest', 'Front Delts', 'Triceps'],
      federationRules: {
        ipf: 'Pause on chest until "Press" command',
        usapl: 'Pause on chest until "Press" command',
        uspa: 'Pause on chest'
      }
    },
    {
      id: 'deadlift',
      name: 'Competition Deadlift',
      description: 'Conventional or sumo, locked knees and hips at finish',
      muscles: ['Posterior Chain', 'Back', 'Quads', 'Grip'],
      federationRules: {
        ipf: 'Lockout with knees and hips extended, shoulders back',
        usapl: 'Lockout with knees and hips extended',
        uspa: 'Lockout with knees and hips extended'
      }
    }
  ],

  // RPE Scale (Rate of Perceived Exertion)
  rpeScale: [
    { value: 10, label: 'Max Effort', description: 'Could not do more reps or weight', color: '#ef4444' },
    { value: 9.5, label: 'Near Max', description: 'Could maybe do slightly more weight', color: '#f97316' },
    { value: 9, label: 'Heavy', description: 'Could do 1 more rep', color: '#f59e0b' },
    { value: 8.5, label: 'Hard', description: 'Could definitely do 1 more, maybe 2', color: '#eab308' },
    { value: 8, label: 'Challenging', description: 'Could do 2 more reps', color: '#84cc16' },
    { value: 7.5, label: 'Moderate-Hard', description: 'Could do 2-3 more reps', color: '#22c55e' },
    { value: 7, label: 'Moderate', description: 'Could do 3 more reps', color: '#10b981' },
    { value: 6.5, label: 'Light-Moderate', description: 'Could do 3-4 more reps', color: '#14b8a6' },
    { value: 6, label: 'Light', description: 'Could do 4+ more reps', color: '#06b6d4' }
  ],

  // RIR Scale (Reps in Reserve) - Alternative to RPE
  rirScale: [
    { value: 0, label: 'Failure', rpe: 10, description: 'Could not do another rep' },
    { value: 1, label: '1 RIR', rpe: 9, description: 'Could do 1 more rep' },
    { value: 2, label: '2 RIR', rpe: 8, description: 'Could do 2 more reps' },
    { value: 3, label: '3 RIR', rpe: 7, description: 'Could do 3 more reps' },
    { value: 4, label: '4 RIR', rpe: 6, description: 'Could do 4 more reps' }
  ],

  // 1RM Calculation formulas
  oneRMCalculators: [
    {
      name: 'Epley',
      formula: (weight, reps) => weight * (1 + reps / 30),
      bestFor: 'Low reps (1-5)'
    },
    {
      name: 'Brzycki',
      formula: (weight, reps) => weight / (1.0278 - 0.0278 * reps),
      bestFor: 'Moderate reps (1-10)'
    },
    {
      name: 'Lombardi',
      formula: (weight, reps) => weight * Math.pow(reps, 0.10),
      bestFor: 'Higher reps (1-12)'
    },
    {
      name: 'Mayhew',
      formula: (weight, reps) => weight * (100 / (52.2 + 41.9 * Math.exp(-0.055 * reps))),
      bestFor: 'Higher reps (1-12)'
    }
  ],

  // Percentage charts for periodization
  percentageTable: {
    100: { reps: 1, rpe: 10 },
    97: { reps: 2, rpe: 9.5 },
    95: { reps: 2, rpe: 9 },
    93: { reps: 3, rpe: 9 },
    90: { reps: 4, rpe: 8.5 },
    87: { reps: 5, rpe: 8.5 },
    85: { reps: 5, rpe: 8 },
    83: { reps: 6, rpe: 8 },
    80: { reps: 7, rpe: 7.5 },
    77: { reps: 8, rpe: 7.5 },
    75: { reps: 8, rpe: 7 },
    73: { reps: 9, rpe: 7 },
    70: { reps: 10, rpe: 7 },
    67: { reps: 11, rpe: 6.5 },
    65: { reps: 12, rpe: 6.5 }
  },

  // Periodization templates
  periodizationPrograms: [
    {
      name: 'Linear Progression',
      duration: '8-12 weeks',
      description: 'Add weight each session, best for beginners',
      progression: 'Add 2.5-5 lbs per session for upper, 5-10 lbs for lower',
      frequency: '3x/week full body'
    },
    {
      name: 'Block Periodization',
      duration: '12-16 weeks',
      description: 'Accumulation → Transmutation → Realization blocks',
      blocks: [
        { name: 'Accumulation', weeks: 4, focus: 'Volume building, 70-75%', intensity: 'Moderate' },
        { name: 'Transmutation', weeks: 4, focus: 'Strength development, 80-87%', intensity: 'High' },
        { name: 'Realization', weeks: 3, focus: 'Peak strength, 90-105%', intensity: 'Very High' },
        { name: 'Deload', weeks: 1, focus: 'Recovery, 50-60%', intensity: 'Low' }
      ]
    },
    {
      name: 'Daily Undulating Periodization (DUP)',
      duration: 'Ongoing',
      description: 'Vary intensity and volume throughout the week',
      schedule: [
        { day: 1, focus: 'Hypertrophy', intensity: '65-75%', reps: '8-12' },
        { day: 2, focus: 'Strength', intensity: '80-87%', reps: '3-5' },
        { day: 3, focus: 'Power/Technique', intensity: '70-80%', reps: '2-4 (explosive)' }
      ]
    },
    {
      name: 'Conjugate Method',
      duration: 'Ongoing',
      description: 'Max effort and dynamic effort rotation',
      maxEffort: 'Work up to 1-3RM on variation',
      dynamicEffort: '8-12 sets of 2 at 50-60% with bands/chains'
    }
  ],

  // Competition preparation
  meetPrep: {
    weeksOut: {
      12: { focus: 'Base Building', intensity: '70-80%', volume: 'High' },
      8: { focus: 'Strength Phase', intensity: '80-90%', volume: 'Moderate' },
      4: { focus: 'Peak Phase', intensity: '90-100%', volume: 'Low' },
      2: { focus: 'Taper', intensity: '85-92%', volume: 'Very Low' },
      1: { focus: 'Deload/Rest', intensity: '50-70%', volume: 'Minimal' }
    },
    attempts: {
      squat: { opener: '90-92%', second: '95-97%', third: '100-103%' },
      bench: { opener: '90-92%', second: '95-97%', third: '100-103%' },
      deadlift: { opener: '90-92%', second: '95-97%', third: '100-105%' }
    }
  },

  // Accessory movements by weakness
  accessories: {
    squat: {
      quadWeak: ['Front Squats', 'Leg Press', 'Bulgarian Split Squats', 'Pause Squats'],
      posteriorWeak: ['Romanian Deadlifts', 'Good Mornings', 'Glute-Ham Raises', 'Back Extensions'],
      coreWeak: ['Planks', 'Ab Wheel', 'Weighted Sit-ups', 'Pallof Press'],
      technique: ['Tempo Squats', 'Box Squats', 'Pin Squats', 'Pause Squats']
    },
    bench: {
      lockoutWeak: ['Board Press', 'Close-Grip Bench', 'Floor Press', 'Dips'],
      chestWeak: ['Dumbbell Press', 'Incline Press', 'Flyes', 'Deficit Push-ups'],
      shoulderWeak: ['Overhead Press', 'Lateral Raises', 'Face Pulls', 'Rear Delt Work'],
      technique: ['Paused Bench', 'Spoto Press', 'Tempo Bench', 'Long Pause Bench']
    },
    deadlift: {
      lockoutWeak: ['Block Pulls', 'Rack Pulls', 'Deficit Deadlifts', 'Romanian Deadlifts'],
      offFloorWeak: ['Deficit Deadlifts', 'Snatch Grip Deadlifts', 'Pause Deadlifts', 'Speed Work'],
      gripWeak: ['Strapless Work', 'Farmers Walks', 'Static Holds', 'Gripper Training'],
      technique: ['Tempo Deadlifts', 'Pause Deadlifts', 'Dimel Deadlifts', 'Stiff-Leg Deadlifts']
    }
  },

  // Federation info
  federations: [
    { name: 'IPF', fullName: 'International Powerlifting Federation', drugTested: true, raw: true, equipped: true },
    { name: 'USAPL', fullName: 'USA Powerlifting', drugTested: true, raw: true, equipped: false },
    { name: 'USPA', fullName: 'United States Powerlifting Association', drugTested: 'Optional', raw: true, equipped: true },
    { name: 'RPS', fullName: 'Revolution Powerlifting Syndicate', drugTested: false, raw: true, equipped: true },
    { name: 'SPF', fullName: 'Southern Powerlifting Federation', drugTested: false, raw: true, equipped: true }
  ]
};

export default powerliftingData;
