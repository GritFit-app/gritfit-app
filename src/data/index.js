// Index file for training discipline data
export { default as bodybuildingData } from './bodybuildingData';
export { default as powerliftingData } from './powerliftingData';
export { default as strongmanData } from './strongmanData';

// Combined disciplines export
export const trainingDisciplines = {
  bodybuilding: {
    id: 'bodybuilding',
    name: 'Bodybuilding',
    description: 'Build muscle, sculpt your physique, and maximize hypertrophy',
    icon: '💪',
    color: 'from-[#f59e0b] to-[#ef4444]',
    isPremium: true,
    features: ['Volume Tracking', 'Exercise Database', 'Progress Photos', 'Pump Ratings']
  },
  powerlifting: {
    id: 'powerlifting',
    name: 'Powerlifting',
    description: 'Maximize strength in Squat, Bench Press, and Deadlift',
    icon: '🏋️',
    color: 'from-[#ef4444] to-[#dc2626]',
    isPremium: true,
    features: ['RPE/RIR Tracking', '1RM Calculator', 'Periodization Builder', 'Competition Mode']
  },
  strongman: {
    id: 'strongman',
    name: 'Strongman',
    description: 'Train with implements, medleys, and test absolute strength',
    icon: '🏆',
    color: 'from-[#a855f7] to-[#7c3aed]',
    isPremium: true,
    features: ['Implement Database', 'Medley Builder', 'Tacky Timer', 'Distance/Time Tracking']
  }
};

export default trainingDisciplines;
