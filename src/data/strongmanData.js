// Strongman Training Discipline Data
export const strongmanData = {
  name: 'Strongman',
  description: 'Train like the World\'s Strongest Man with implements, medleys, and events that test absolute strength and endurance.',
  icon: '🏆',
  color: 'from-[#a855f7] to-[#7c3aed]',

  // Implement database
  implements: [
    {
      id: 'atlas-stones',
      name: 'Atlas Stones',
      description: 'Natural stones of varying weights lifted to platform or over bar',
      weights: ['100kg', '120kg', '140kg', '160kg', '180kg', '200kg+'],
      muscles: ['Posterior Chain', 'Lats', 'Biceps', 'Core'],
      technique: 'Tacky on forearms, lap and roll to chest, extend hips',
      worldRecord: '272kg (600lbs) - Tom Stoltman'
    },
    {
      id: 'log-press',
      name: 'Log Press',
      description: 'Clean and press using a steel log with handles',
      weights: ['100kg', '120kg', '140kg', '160kg', '180kg', '200kg+'],
      muscles: ['Shoulders', 'Triceps', 'Upper Chest', 'Core'],
      technique: 'Roll to lap, explode to shoulders, dip and drive',
      worldRecord: '229kg (505lbs) - Žydrūnas Savickas'
    },
    {
      id: 'axle-press',
      name: 'Axle Press',
      description: 'Thick bar clean and press, often from floor or rack',
      weights: ['120kg', '150kg', '180kg', '200kg', '220kg+'],
      muscles: ['Shoulders', 'Triceps', 'Grip', 'Core'],
      technique: ' Continental clean from belt, strict or push press',
      worldRecord: '217kg (478lbs) - Žydrūnas Savickas'
    },
    {
      id: 'yoke',
      name: 'Yoke Walk',
      description: 'Carry weighted yoke frame for distance or speed',
      weights: ['300kg', '400kg', '450kg', '500kg+'],
      muscles: ['Entire Body', 'Core', 'Legs', 'Upper Back'],
      technique: 'Tight midsection, short choppy steps, breathe at top',
      worldRecord: '560kg (1235lbs) for 15m - Žydrūnas Savickas'
    },
    {
      id: 'farmers-walk',
      name: 'Farmer\'s Walk',
      description: 'Carry heavy implements in each hand',
      weights: ['120kg/hand', '140kg/hand', '160kg/hand', '170kg+'],
      muscles: ['Grip', 'Traps', 'Core', 'Legs'],
      technique: 'Crush grip, tall posture, quick heel-to-toe steps',
      worldRecord: 'Various formats, up to 172.5kg/hand'
    },
    {
      id: 'sled-drag',
      name: 'Sled Drag/Pull',
      description: 'Pull weighted sled using harness or rope',
      weights: ['300kg', '400kg', '500kg', '600kg+'],
      muscles: ['Posterior Chain', 'Quads', 'Calves', 'Grip'],
      technique: 'Low body angle, drive through heels, arm pump',
      notes: 'Various surfaces affect difficulty'
    },
    {
      id: 'tire-flip',
      name: 'Tire Flip',
      description: 'Flip large tractor tires end over end',
      weights: ['350kg', '450kg', '550kg', '650kg+'],
      muscles: ['Posterior Chain', 'Biceps', 'Chest', 'Legs'],
      technique: 'Deadlift to knee, drive through with chest, push over',
      worldRecord: '540kg+ tires in competition'
    },
    {
      id: 'keg-load',
      name: 'Keg Load/Carry',
      description: 'Lift and load beer kegs to platforms',
      weights: ['100kg', '120kg', '140kg', '150kg+'],
      muscles: ['Back', 'Biceps', 'Core', 'Legs'],
      technique: 'Deadlift to lap, hug and extend, load to platform',
      notes: 'Water slosh adds instability factor'
    },
    {
      id: 'sandbag',
      name: 'Sandbag Carry/Load',
      description: 'Lift awkward sandbags to shoulder or platform',
      weights: ['100kg', '120kg', '150kg', '180kg+'],
      muscles: ['Grip', 'Back', 'Biceps', 'Core'],
      technique: 'Bear hug, lap and stand, load or carry',
      worldRecord: '180kg+ in competition'
    },
    {
      id: 'husafell',
      name: 'Husafell Stone',
      description: 'Carry triangular stone against chest',
      weights: ['140kg', '160kg', '180kg', '200kg+'],
      muscles: ['Chest', 'Biceps', 'Core', 'Legs'],
      technique: 'Chest wrap, squeeze tight, bear hug position',
      origin: 'Icelandic tradition'
    },
    {
      id: 'dinnie',
      name: 'Dinnie Stones',
      description: 'Carry two uneven ring-weighted stones',
      weights: ['318kg total (155kg + 163kg)'],
      muscles: ['Grip', 'Back', 'Core', 'Legs'],
      technique: 'Pinch grip rings, deadlift and walk',
      origin: 'Scottish tradition, only ~200 people worldwide'
    },
    {
      id: 'shield',
      name: 'Shield Carry',
      description: 'Hold shield-shaped implement at arm\'s length',
      weights: ['25kg', '30kg', '35kg+'],
      muscles: ['Deltoids', 'Traps', 'Core', 'Grip'],
      technique: 'Arm extended, grip edges, time hold or distance',
      notes: 'Extreme isometric shoulder demand'
    },
    {
      id: 'dumbbell',
      name: 'Circus Dumbbell',
      description: 'Clean and press thick dumbbell',
      weights: ['70kg', '80kg', '90kg', '100kg+'],
      muscles: ['Shoulders', 'Triceps', 'Core', 'Grip'],
      technique: 'Swing to shoulder, strict or push press',
      worldRecord: '143kg (315lbs) - Žydrūnas Savickas'
    },
    {
      id: 'deadlift',
      name: 'Strongman Deadlift',
      description: 'Various implements - axle, car, frame',
      weights: ['Car deadlift (up to 500kg+)', 'Axle deadlift', '18-inch deadlift'],
      muscles: ['Posterior Chain', 'Grip', 'Traps'],
      technique: 'Varies by implement',
      worldRecord: '500kg+ car deadlifts, 537kg elephant bar - Hafthor Bjornsson'
    }
  ],

  // Event medley templates
  medleys: [
    {
      name: 'Loading Medley',
      implements: ['Keg', 'Sandbag', 'Atlas Stone', 'Anchor'],
      platforms: 4,
      timeLimit: '90 seconds',
      strategy: 'Fast transitions, efficient technique over pure strength'
    },
    {
      name: 'Carry Medley',
      implements: ['Farmer\'s Walk', 'Yoke', 'Super Yoke'],
      distance: '30m per implement',
      timeLimit: '75 seconds',
      strategy: 'Grip management, steady pace, save grip for yoke'
    },
    {
      name: 'Odd Object Medley',
      implements: ['Keg', 'Sandbag', 'Husafell', 'Shield'],
      timeLimit: '60 seconds',
      strategy: 'Grip strength crucial, efficient loading technique'
    },
    {
      name: 'Press Medley',
      implements: ['Log', 'Axle', 'Circus Dumbbell', 'Block'],
      timeLimit: '75 seconds',
      strategy: 'Save shoulders for heavier implements'
    },
    {
      name: 'Stones of Steel',
      implements: ['5 Atlas Stones ascending weight'],
      platforms: 'Increasing height',
      timeLimit: '60 seconds',
      strategy: 'Smooth stone-to-stone transitions'
    }
  ],

  // Tacky guide
  tacky: {
    types: [
      { name: 'Grade 1 (Tacky)', temp: 'Warm weather', consistency: 'Medium', bestFor: 'General use' },
      { name: 'Grade 2 (Tacky)', temp: 'Cold weather', consistency: 'Thick', bestFor: 'Heavy stones' },
      { name: 'Mosaic Tacky', temp: 'All weather', consistency: 'Variable', bestFor: 'Professional competitions' }
    ],
    application: {
      forearms: 'Apply to forearms and wrists for stone loading',
      amount: 'Thin layer, allow to tack up before application',
      removal: 'Baby oil or WD-40, then soap and water'
    },
    tips: [
      'Warm up tacky before application',
      'Apply just before event starts',
      'Keep hands clean until application',
      'Reapply between attempts if needed'
    ]
  },

  // Tacky timer (for stone loading events)
  tackyTimer: {
    preparationTime: 60, // seconds to apply tacky
    setDuration: 20, // seconds tacky stays optimal
    events: [
      { name: 'Atlas Stones', tackyRequired: true, maxAttempts: 'As time allows' },
      { name: 'Stone Over Bar', tackyRequired: true, maxAttempts: 'As time allows' },
      { name: 'Stone Carry', tackyRequired: false, duration: 'Varies' }
    ]
  },

  // Distance/time tracking templates
  trackingEvents: [
    {
      type: 'max-distance',
      events: ['Farmer\'s Walk', 'Yoke Walk', 'Husafell Carry', 'Shield Carry'],
      measure: 'Meters completed',
      timeLimit: '60 seconds'
    },
    {
      type: 'for-time',
      events: ['Loading Medley', 'Carry Medley', 'Stone Run', 'Frame Carry'],
      measure: 'Time to complete',
      timeLimit: '75-120 seconds'
    },
    {
      type: 'max-reps',
      events: ['Log Press', 'Axle Press', 'Deadlift for Reps'],
      measure: 'Repetitions',
      timeLimit: '60-75 seconds'
    },
    {
      type: 'max-weight',
      events: ['Log Press', 'Axle Press', 'Dumbbell Press', 'Deadlift'],
      measure: 'Heaviest successful lift',
      attempts: '3-4 attempts'
    }
  ],

  // Training templates
  trainingFocuses: [
    {
      name: 'Press Day',
      main: 'Log or axle work',
      accessories: ['Overhead lockouts', 'Push press', 'Dumbbell work'],
      implements: ['Log', 'Axle', 'Circus Dumbbell']
    },
    {
      name: 'Pull Day',
      main: 'Deadlift variations',
      accessories: ['Rows', 'Pull-ups', 'Grip work'],
      implements: ['Axle', 'Frame', 'Rope/Towing']
    },
    {
      name: 'Carry Day',
      main: 'Loaded carries',
      accessories: ['Core work', 'Glute-ham raises', 'Calves'],
      implements: ['Yoke', 'Farmer\'s', 'Sandbag', 'Keg']
    },
    {
      name: 'Stone Day',
      main: 'Atlas stones',
      accessories: ['Lat work', 'Bicep curls', 'Core stability'],
      implements: ['Stones of varying weights', 'Stone sleeves']
    },
    {
      name: 'Event Day',
      main: 'Competition simulation',
      accessories: 'Full medley practice',
      implements: 'All implements'
    }
  ],

  // Major competitions
  competitions: [
    { name: 'World\'s Strongest Man', level: 'Professional', format: 'Multi-day, 6-8 events' },
    { name: 'Arnold Strongman Classic', level: 'Professional', format: 'Single day, 5 events' },
    { name: 'Rogue Invitational', level: 'Professional', format: 'Single day, 5-6 events' },
    { name: 'Giants Live', level: 'Professional', format: 'Tour with qualifiers' },
    { name: 'Strongman Corp/NS', level: 'Amateur/Pro', format: 'Tiered system' },
    { name: 'United States Strongman', level: 'Amateur/Pro', format: 'Sanctioned events' }
  ],

  // Weight classes (varies by federation)
  weightClasses: {
    u80: { name: 'Under 80kg', maxWeight: 80 },
    u90: { name: 'Under 90kg', maxWeight: 90 },
    u105: { name: 'Under 105kg', maxWeight: 105 },
    u120: { name: 'Under 120kg', maxWeight: 120 },
    open: { name: 'Open/Heavyweight', minWeight: 120 }
  }
};

export default strongmanData;
