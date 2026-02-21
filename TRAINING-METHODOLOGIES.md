# GritFit Training Methodologies Research Summary

## Executive Summary

This research provides an in-depth analysis of three major strength training disciplines—bodybuilding, powerlifting, and strongman—to inform GritFit's feature development, exercise libraries, and training program structures. Each discipline has distinct goals, methodologies, and user needs that present unique opportunities for app differentiation.

---

## 1. BODYBUILDING

### 1.1 Training Philosophy

**Primary Goal:** Maximize muscle hypertrophy (size) and aesthetics

**Key Principles:**
- **Volume:** 10-20 sets per muscle group per week optimal for most
- **Intensity:** 1-3 reps in reserve (RIR) sufficient for stimulus
- **Frequency:** 2x per week per muscle outperforms 1x
- **Exercise Selection:** Cover all movement patterns, rotate every 4-8 weeks
- **Progressive Overload:** Add reps, then weight systematically

### 1.2 Training Splits

**Bro Split (One Muscle Per Day)**
- Best for: Advanced lifters with high recovery
- Volume: 20-30 sets per muscle
- Frequency: 1x per week per muscle

**Push/Pull/Legs (PPL)**
- Best for: Most lifters, scalable
- Volume: 12-20 sets per muscle
- Frequency: 2x per week (6-day variant)

**Upper/Lower Split**
- Best for: Time-constrained, strength-hybrid
- Volume: 15-25 sets per session
- Frequency: 2-3x per week per muscle

**Full Body**
- Best for: Beginners, frequency-focused
- Volume: 8-12 sets per muscle
- Frequency: 3-4x per week

### 1.3 Hypertrophy Evidence

- **Optimal rep range:** 6-20 reps (any range works if close to failure)
- **Volume landmark:** 10-20 sets/week most effective
- **Rest periods:** 2+ minutes for compounds, 60-90s for isolation
- **Training to failure:** Increases fatigue disproportionately; 1-3 RIR optimal

### 1.4 Bodybuilding-Specific GritFit Features

1. **Muscle Volume Heat Map** - Visual weekly volume tracker
2. **Exercise Rotation Suggestions** - Auto-suggest alternatives
3. **Mind-Muscle Timer** - Extended eccentric phase tracking
4. **Pump Ratings** - Subjective exercise effectiveness tracking
5. **Measurement Tracking** - Body part circumference logs
6. **Progress Photo Comparison** - Side-by-side visual progress

---

## 2. POWERLIFTING

### 2.1 Training Philosophy

**Primary Goal:** Maximize strength in squat, bench press, deadlift (1RM)

**Key Principles:**
- **Specificity:** Train the competition lifts and close variations
- **Periodization:** Planned overload and recovery cycles
- **Intensity:** Heavy weights (85-95%+) in peaking phases
- **Technique:** Master setup, bar path, and efficiency
- **RPE Training:** Autoregulate based on daily readiness

### 2.2 Periodization Methods

**Linear Periodization**
- Simple: Add weight weekly
- Best for: Beginners (6-12 months)
- Structure: Start 70% 1RM, add 2.5-5% weekly

**Block Periodization**
- Accumulation (4-6 weeks): 70-80%, high volume
- Transmutation (3-4 weeks): 75-85%, sport-specific
- Realization (2-3 weeks): 85-95%, lower volume
- Peaking (2 weeks): 93-97%, competition prep

**Conjugate Method (Westside)**
- Max Effort: 1-3RM on variations
- Dynamic Effort: 50-70% for speed
- Rotates exercises every 1-3 weeks
- Heavy accessory focus

**Daily Undulating Periodization (DUP)**
- Varies intensity within week
- Heavy/Moderate/Light days
- Good for intermediate lifters

### 2.3 Peaking for Competition

**Timeline: 2-4 Weeks**

Week -4: 85-90%, moderate volume  
Week -3: 90-93%, reduced volume  
Week -2: 93-95%, low volume, equipment check  
Week -1: 85-90% openers, minimal volume  
Competition: Rest until weigh-in

### 2.4 Powerlifting-Specific GritFit Features

1. **RPE Calculator** - Built-in RPE logging with trends
2. **Velocity Tracking** - Bar speed measurement for autoregulation
3. **Sticking Point Analysis** - Identify weak points from failed lifts
4. **Periodization Wizard** - Generate custom blocks by meet date
5. **Wilks/Dots Calculator** - Real-time strength coefficients
6. **Meet Prep Checklist** - Equipment, weigh-in, attempt selection
7. **Competition Attempt Planner** - Opener/Second/Third strategy

---

## 3. STRONGMAN

### 3.1 Training Philosophy

**Primary Goal:** Maximize functional strength across diverse implements and events

**Key Principles:**
- **Event-Specific Training:** Practice actual competition implements
- **Implement Mastery:** Technique critical for efficiency
- **Conditioning:** High work capacity for medleys
- **Periodization:** Off-season strength, pre-competition event focus
- **Equipment Access:** Limited by gym equipment availability

### 3.2 Event Categories

**Pressing Events**
- Log clean and press
- Axle clean and press
- Circus dumbbell
- Viking press
- Car deadlift

**Moving Events**
- Farmer's walk
- Yoke walk
- Frame carry
- Duck walk / Conan wheel

**Loading Events**
- Atlas stones
- Sandbag loads
- Keg loads
- Natural stone

**Pulling Events**
- Deadlift (various bars)
- Arm-over-arm pulls
- Truck pulls

### 3.3 Training Structure

**Off-Season:**
- Focus: Base strength (powerlifting-style)
- Volume: Higher
- Events: Minimal

**Pre-Competition:**
- Focus: Event-specific training increases
- Volume: Moderate
- Events: 2-3x per week

**Competition Prep:**
- Focus: Peak on events
- Volume: Lower
- Events: Maintain technique

### 3.4 Strongman-Specific GritFit Features

1. **Implement Database** - Library with technique tips
2. **Event Medley Builder** - Create custom medleys with rest periods
3. **Tacky Timer** - Countdown for tacky application
4. **Distance/Time Tracking** - Specialized logging for moving events
5. **Competition Mode** - Event order tracking with rest management
6. **Equipment Checklist** - Tacky, belt, knee sleeves, etc.

---

## 4. KEY DIFFERENCES SUMMARY

| Aspect | Bodybuilding | Powerlifting | Strongman |
|--------|-------------|--------------|-----------|
| **Primary Goal** | Muscle size/aesthetics | Maximal strength (1RM) | Functional strength + events |
| **Rep Range** | 6-20+ reps | 1-5 reps | Variable (1-20+) |
| **Exercise Variety** | High (isolation focus) | Low (specificity) | Moderate-High (event-driven) |
| **Rest Periods** | 60-150 seconds | 3-10+ minutes | Variable |
| **Progress Tracking** | Measurements, photos, volume | 1RM, Wilks, RPE | Event PRs, competition results |
| **Competition Focus** | Physique/conditioning | Three lifts only | Multiple events |

---

## 5. GRITFIT IMPLEMENTATION ROADMAP

### Phase 1: Core Features (Current Priority)
- [x] Comprehensive exercise library (650+ exercises)
- [ ] Basic program templates for each discipline
- [ ] RPE tracking and percentage calculators
- [ ] Progress photo and measurement tracking

### Phase 2: Discipline-Specific (Rex Building Now)
- [ ] Periodization wizard for powerlifting
- [ ] Muscle group volume analytics for bodybuilding
- [ ] Implement database and medley builder for strongman
- [ ] Advanced analytics and fatigue tracking

### Phase 3: Advanced Features
- [ ] AI-powered program customization
- [ ] Video form analysis
- [ ] Coach marketplace integration
- [ ] Competition finder and meet prep tools

---

## 6. EXERCISE LIBRARY STRUCTURE

### Bodybuilding Library (400+ exercises)
```
├── Chest (60+)
│   ├── Compound: Bench variations, dips
│   ├── Isolation: Flyes, pec deck
│   └── Variations: Grip angles, machines
├── Back (70+)
│   ├── Width: Pull-ups, pulldowns
│   ├── Thickness: Rows, deadlifts
│   └── Lower: Extensions, hypers
├── Shoulders (50+)
│   ├── Presses: Overhead, Arnold
│   ├── Raises: Lateral, front, rear
│   └── Isolation: Face pulls
├── Legs (100+)
│   ├── Quads: Squats, leg press
│   ├── Hamstrings: RDLs, curls
│   ├── Glutes: Hip thrusts
│   └── Calves: All variations
├── Arms (80+)
│   ├── Biceps: Curl variations
│   ├── Triceps: Extension variations
│   └── Forearms: Grip work
└── Core (40+)
    ├── Anti-extension: Planks, wheels
    ├── Anti-rotation: Pallof press
    ├── Flexion: Leg raises
    └── Rotation: Twists
```

### Powerlifting Library (150+ exercises)
```
├── Competition Lifts (3)
│   ├── Squat: Low-bar, high-bar
│   ├── Bench: Competition pause
│   └── Deadlift: Conventional, sumo
├── Squat Variations (25+)
│   ├── Pause squats
│   ├── Pin squats
│   ├── Box squats
│   └── Safety bar, tempo
├── Bench Variations (30+)
│   ├── Board presses
│   ├── Pin presses
│   ├── Floor presses
│   └── Spoto, close-grip
├── Deadlift Variations (25+)
│   ├── Deficit pulls
│   ├── Block pulls
│   ├── Paused deadlifts
│   └── RDLs, snatch-grip
└── Accessories by Weak Point (70+)
    ├── Lockout: Boards, rack pulls
    ├── Bottom: Deficits, pauses
    └── Muscle mass: Bodybuilding
```

### Strongman Library (100+ exercises)
```
├── Pressing Implements (15)
│   ├── Log clean and press
│   ├── Axle clean and press
│   ├── Circus dumbbell
│   └── Viking press
├── Moving Events (12)
│   ├── Farmer's walk
│   ├── Yoke walk
│   ├── Frame carry
│   └── Duck walk
├── Loading Events (15)
│   ├── Atlas stones
│   ├── Sandbag loads
│   ├── Keg loads
│   └── Stone series
├── Pulling Events (10)
│   ├── Deadlift variants
│   ├── Arm-over-arm
│   └── Truck pulls
└── Training Drills (50+)
    ├── Stone technique
    ├── Log clean practice
    └── Implement conditioning
```

---

## 7. PROGRAM TEMPLATE EXAMPLES

### Bodybuilding: "Hypertrophy Foundations"
**Duration:** 8-12 weeks  
**Split:** PPL 6-day  
**Progression:** Double progression (reps → weight)

**Week Structure:**
- Push A: Chest/Shoulders/Triceps
- Pull A: Back/Biceps
- Legs A: Quads/Calves
- Push B: Chest/Shoulders/Triceps
- Pull B: Back/Biceps
- Legs B: Hamstrings/Glutes

**Features:**
- Built-in deload week 4
- Exercise rotation week 5
- Volume auto-adjustment

### Powerlifting: "Strength Peaking"
**Duration:** 12-16 weeks  
**Frequency:** 4 days/week

**Phase Breakdown:**
- Weeks 1-4: Volume (70-80%, RPE 7-8)
- Weeks 5-8: Strength (80-87%, RPE 8-8.5)
- Weeks 9-12: Intensification (87-93%, RPE 8.5-9)
- Weeks 13-14: Peaking (93-97%, singles)
- Week 15: Competition/Taper

**Features:**
- RPE targets by phase
- Competition singles practice
- Attempt planning

### Strongman: "Event Ready"
**Duration:** 8-12 weeks  
**Frequency:** 4 days/week

**Structure:**
- Day 1: Heavy Press + Log/Axle
- Day 2: Heavy Pull + Deadlift variants
- Day 3: Implement technique
- Day 4: Event medley/conditioning

**Features:**
- Event-specific blocks
- Medley builder
- Competition checklist

---

## 8. UNIQUE FEATURES BY DISCIPLINE

### Bodybuilding-Only
- Muscle heat map visualization
- Mind-muscle connection timer
- Pump tracking ratings
- Body part split generator
- Measurement trending

### Powerlifting-Only
- RPE integration with trends
- Velocity-based training
- Sticking point identification
- Wilks/Dots scoring
- Meet prep calendar

### Strongman-Only
- Implement video library
- Event medley creator
- Tacky application timer
- Competition event tracker
- Distance/time specialized logging

---

## CONCLUSION

The strength training market has distinct user segments currently underserved by one-size-fits-all apps. By deeply understanding bodybuilding, powerlifting, and strongman methodologies, GritFit can capture dedicated, highly engaged users.

**Key Differentiators:**
- Bodybuilders need: Volume tracking, variety, mind-muscle
- Powerlifters need: Periodization, RPE, peaking tools
- Strongman need: Implement guidance, event preparation

Building all three into a cohesive platform positions GritFit as the definitive strength training app.

---

*Research compiled by: Rex*  
*Date: February 20, 2026*  
*Sources: Evidence-based training research, coaching methodologies, scientific literature*
