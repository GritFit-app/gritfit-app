import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Calendar, 
  TrendingUp, 
  Target,
  Save,
  RotateCcw,
  ChevronRight,
  Trophy,
  Flame,
  Activity,
  BarChart3,
  Check
} from 'lucide-react';

// RPE Chart for reference
const RPE_CHART = {
  10: { 1: 100, 2: 96, 3: 92, 4: 89, 5: 86, 6: 84, 7: 81, 8: 79 },
  9.5: { 1: 98, 2: 94, 3: 91, 4: 88, 5: 85, 6: 82, 7: 80, 8: 77 },
  9: { 1: 96, 2: 92, 3: 89, 4: 86, 5: 84, 6: 81, 7: 79, 8: 76 },
  8.5: { 1: 94, 2: 91, 3: 88, 4: 85, 5: 82, 6: 80, 7: 77, 8: 75 },
  8: { 1: 92, 2: 89, 3: 86, 4: 84, 5: 81, 6: 79, 7: 76, 8: 74 },
  7.5: { 1: 91, 2: 88, 3: 85, 4: 82, 5: 80, 6: 77, 7: 75, 8: 72 },
};

// Standard powerlifting programs
const PERIODIZATION_TEMPLATES = {
  linear: {
    name: 'Linear Progression',
    description: 'Add weight each week',
    weeks: 4,
    progression: 'Add 5-10 lbs per week'
  },
  block: {
    name: 'Block Periodization',
    description: 'Accumulation → Intensification → Peaking',
    weeks: 12,
    progression: 'Volume → Intensity → Peaking'
  },
  conjugate: {
    name: 'Conjugate Method',
    description: 'Max Effort & Dynamic Effort',
    weeks: 4,
    progression: 'Rotate max effort lifts weekly'
  },
  531: {
    name: '5/3/1',
    description: 'Jim Wendler\'s classic program',
    weeks: 4,
    progression: '5s, 3s, 1s, deload'
  }
};

const Powerlifting = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [oneRM, setOneRM] = useState({ squat: 0, bench: 0, deadlift: 0 });
  const [rpeLog, setRpeLog] = useState([]);
  const [calcInput, setCalcInput] = useState({ weight: '', reps: '', rpe: '8' });
  const [calcResult, setCalcResult] = useState(null);
  const [program, setProgram] = useState(null);
  const [competitionMode, setCompetitionMode] = useState(false);
  const [attempts, setAttempts] = useState({
    squat: [{}, {}, {}],
    bench: [{}, {}, {}],
    deadlift: [{}, {}, {}]
  });
  const [activeLift, setActiveLift] = useState('squat');

  // Load saved data
  useEffect(() => {
    const saved1RM = localStorage.getItem('gritfit_pl_1rm');
    if (saved1RM) setOneRM(JSON.parse(saved1RM));
    
    const savedLog = localStorage.getItem('gritfit_pl_log');
    if (savedLog) setRpeLog(JSON.parse(savedLog));
    
    const savedProgram = localStorage.getItem('gritfit_pl_program');
    if (savedProgram) setProgram(JSON.parse(savedProgram));
  }, []);

  // 1RM Calculator using Epley formula with RPE adjustment
  const calculate1RM = (weight, reps, rpe) => {
    if (!weight || !reps) return null;
    
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);
    const rpeNum = parseFloat(rpe);
    
    // Epley formula: weight * (1 + reps/30)
    const epley = weightNum * (1 + repsNum / 30);
    
    // RPE adjustment: if not RPE 10, extrapolate
    const rpeMultiplier = RPE_CHART[10]?.[repsNum] / (RPE_CHART[rpeNum]?.[repsNum] || 100);
    const estimated1RM = Math.round(epley * rpeMultiplier);
    
    return estimated1RM;
  };

  const handleCalculate = () => {
    const result = calculate1RM(calcInput.weight, calcInput.reps, calcInput.rpe);
    if (result) {
      setCalcResult(result);
    }
  };

  const save1RM = (lift, value) => {
    const new1RM = { ...oneRM, [lift]: value };
    setOneRM(new1RM);
    localStorage.setItem('gritfit_pl_1rm', JSON.stringify(new1RM));
  };

  const saveRPELog = (entry) => {
    const newLog = [...rpeLog, { ...entry, date: new Date().toISOString() }];
    setRpeLog(newLog);
    localStorage.setItem('gritfit_pl_log', JSON.stringify(newLog));
  };

  const generateProgram = (templateKey) => {
    const template = PERIODIZATION_TEMPLATES[templateKey];
    const newProgram = {
      template: templateKey,
      name: template.name,
      startDate: new Date().toISOString(),
      weeks: [],
      currentWeek: 0
    };

    // Generate weeks based on template
    for (let week = 0; week < template.weeks; week++) {
      const weekPlan = {
        week: week + 1,
        days: []
      };

      if (templateKey === '531') {
        // 5/3/1 structure
        const repSchemes = [
          { squat: '5', bench: '5', deadlift: '5' },
          { squat: '3', bench: '3', deadlift: '3' },
          { squat: '1', bench: '1', deadlift: '1' },
          { squat: 'deload', bench: 'deload', deadlift: 'deload' }
        ];
        weekPlan.days = [
          { lift: 'squat', scheme: repSchemes[week % 4].squat, percentage: week === 3 ? 0.4 : [0.65, 0.75, 0.85][week % 3] },
          { lift: 'bench', scheme: repSchemes[week % 4].bench, percentage: week === 3 ? 0.4 : [0.65, 0.75, 0.85][week % 3] },
          { lift: 'deadlift', scheme: repSchemes[week % 4].deadlift, percentage: week === 3 ? 0.4 : [0.65, 0.75, 0.85][week % 3] }
        ];
      } else if (templateKey === 'linear') {
        // Linear progression
        const basePercent = 0.75 + (week * 0.05);
        weekPlan.days = [
          { lift: 'squat', sets: 3, reps: 5, percentage: Math.min(basePercent, 0.95) },
          { lift: 'bench', sets: 3, reps: 5, percentage: Math.min(basePercent, 0.95) },
          { lift: 'deadlift', sets: 1, reps: 5, percentage: Math.min(basePercent, 0.95) }
        ];
      }

      newProgram.weeks.push(weekPlan);
    }

    setProgram(newProgram);
    localStorage.setItem('gritfit_pl_program', JSON.stringify(newProgram));
  };

  const getWeightForPercentage = (lift, percentage) => {
    return Math.round(oneRM[lift] * percentage);
  };

  const calculateTotal = () => {
    let total = 0;
    Object.values(attempts).forEach(liftAttempts => {
      const bestAttempt = liftAttempts.reduce((best, attempt) => {
        if (attempt.good && attempt.weight > best) return attempt.weight;
        return best;
      }, 0);
      total += bestAttempt;
    });
    return total;
  };

  const updateAttempt = (lift, attemptNum, field, value) => {
    setAttempts(prev => ({
      ...prev,
      [lift]: prev[lift].map((attempt, idx) =>
        idx === attemptNum ? { ...attempt, [field]: value } : attempt
      )
    }));
  };

  const total1RM = oneRM.squat + oneRM.bench + oneRM.deadlift;
  const wilks = calculateWilks(total1RM, 185, 'male'); // Placeholder weight/gender

  function calculateWilks(total, bodyweight, gender) {
    // Simplified Wilks calculation
    if (!total || !bodyweight) return 0;
    // This is a placeholder - real Wilks is more complex
    return Math.round(total * 500 / (bodyweight * 0.8));
  }

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center">
            <BarChart3 size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Powerlifting</h2>
            <p className="text-zinc-400 text-sm">Strength-focused training</p>
          </div>
        </div>
      </div>

      {/* Total Display */}
      <div className="glass-card p-6 mb-6 glow-primary">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-zinc-400 text-sm mb-1">Competition Total</p>
            <p className="text-4xl font-black gradient-text">
              {total1RM > 0 ? total1RM.toLocaleString() : '---'}
            </p>
            <p className="text-zinc-500 text-xs mt-1">S/B/D Combined</p>
          </div>
          <div className="text-right">
            <p className="text-zinc-400 text-sm mb-1">Wilks</p>
            <p className="text-2xl font-bold text-[#3b82f6]">
              {wilks > 0 ? wilks : '---'}
            </p>
          </div>
        </div>
        
        {/* Individual lifts */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
          {['squat', 'bench', 'deadlift'].map((lift) => (
            <div key={lift} className="text-center">
              <p className="text-zinc-500 text-xs capitalize mb-1">{lift}</p>
              <p className="text-xl font-bold text-white">
                {oneRM[lift] > 0 ? oneRM[lift] : '---'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['calculator', 'periodization', 'competition'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="space-y-4">
          {/* 1RM Calculator */}
          <div className="exercise-card">
            <div className="flex items-center gap-2 mb-4">
              <Calculator size={20} className="text-[#3b82f6]" />
              <h3 className="font-semibold text-white">1RM Calculator</h3>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 text-xs mb-1 block">Weight (lbs)</label>
                  <input
                    type="number"
                    value={calcInput.weight}
                    onChange={(e) => setCalcInput(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3b82f6] outline-none"
                    placeholder="225"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 text-xs mb-1 block">Reps</label>
                  <input
                    type="number"
                    value={calcInput.reps}
                    onChange={(e) => setCalcInput(prev => ({ ...prev, reps: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3b82f6] outline-none"
                    placeholder="5"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 text-xs mb-1 block">RPE</label>
                <div className="flex gap-2">
                  {[6, 7, 7.5, 8, 8.5, 9, 9.5, 10].map((rpe) => (
                    <button
                      key={rpe}
                      onClick={() => setCalcInput(prev => ({ ...prev, rpe: rpe.toString() }))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        calcInput.rpe === rpe.toString()
                          ? 'bg-[#3b82f6] text-white'
                          : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                      }`}
                    >
                      {rpe}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white font-semibold hover:shadow-lg hover:shadow-[#3b82f6]/30 transition-all"
              >
                Calculate 1RM
              </button>

              {calcResult && (
                <div className="p-4 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20">
                  <p className="text-zinc-400 text-sm mb-1">Estimated 1RM</p>
                  <p className="text-3xl font-bold text-[#3b82f6]">{calcResult} lbs</p>
                  
                  {/* Save buttons */}
                  <div className="flex gap-2 mt-3">
                    {['squat', 'bench', 'deadlift'].map((lift) => (
                      <button
                        key={lift}
                        onClick={() => {
                          save1RM(lift, calcResult);
                          saveRPELog({ lift, estimated1RM: calcResult, ...calcInput });
                        }}
                        className="flex-1 py-2 rounded-lg bg-white/10 text-white text-xs font-medium capitalize hover:bg-white/20 transition-colors"
                      >
                        Save as {lift}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RPE Chart Reference */}
          <div className="exercise-card">
            <h3 className="font-semibold text-white mb-3">RPE Chart</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-zinc-500">
                    <th className="text-left py-2">RPE</th>
                    {[1, 2, 3, 4, 5].map(reps => (
                      <th key={reps} className="text-center py-2">{reps} rep</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[10, 9, 8].map((rpe) => (
                    <tr key={rpe} className="border-t border-white/5">
                      <td className="py-2 text-[#3b82f6] font-medium">{rpe}</td>
                      {[1, 2, 3, 4, 5].map(reps => (
                        <td key={reps} className="text-center py-2 text-zinc-400">
                          {RPE_CHART[rpe]?.[reps]}%
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Periodization Tab */}
      {activeTab === 'periodization' && (
        <div className="space-y-4">
          {!program ? (
            <>
              <p className="text-zinc-400 text-sm mb-4">
                Choose a periodization template to generate your training program
              </p>
              {Object.entries(PERIODIZATION_TEMPLATES).map(([key, template]) => (
                <button
                  key={key}
                  onClick={() => generateProgram(key)}
                  className="w-full exercise-card hover-lift text-left"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                      <p className="text-zinc-400 text-sm">{template.description}</p>
                      <p className="text-zinc-500 text-xs mt-2">{template.weeks} weeks</p>
                    </div>
                    <ChevronRight size={20} className="text-zinc-500" />
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-white">{program.name}</h3>
                <button
                  onClick={() => {
                    setProgram(null);
                    localStorage.removeItem('gritfit_pl_program');
                  }}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Reset
                </button>
              </div>

              {program.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="exercise-card">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">Week {week.week}</h4>
                    {weekIdx === program.currentWeek && (
                      <span className="px-2 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {week.days.map((day, dayIdx) => (
                      <div 
                        key={dayIdx}
                        className="p-3 rounded-xl bg-white/5 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-white capitalize">{day.lift}</p>
                          <p className="text-zinc-400 text-xs">
                            {day.scheme || `${day.sets}×${day.reps}`} @ {Math.round(day.percentage * 100)}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#3b82f6]">
                            {getWeightForPercentage(day.lift, day.percentage)} lbs
                          </p>
                          <p className="text-zinc-500 text-xs">
                            of {oneRM[day.lift] || '---'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Competition Mode Tab */}
      {activeTab === 'competition' && (
        <div className="space-y-4">
          {/* Total Display */}
          <div className="exercise-card bg-gradient-to-br from-[#f59e0b]/20 to-[#ef4444]/20">
            <div className="flex items-center gap-3 mb-4">
              <Trophy size={24} className="text-[#f59e0b]" />
              <div>
                <h3 className="font-bold text-white">Competition Total</h3>
                <p className="text-3xl font-bold text-[#f59e0b]">{calculateTotal()} lbs</p>
              </div>
            </div>
          </div>

          {/* Lift Tabs */}
          <div className="flex gap-2">
            {['squat', 'bench', 'deadlift'].map((lift) => (
              <button
                key={lift}
                onClick={() => setActiveLift(lift)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  activeLift === lift
                    ? 'bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                }`}
              >
                {lift}
              </button>
            ))}
          </div>

          {/* Attempt Cards */}
          <div className="space-y-3">
            {[1, 2, 3].map((attemptNum) => (
              <div key={attemptNum} className="exercise-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">Attempt {attemptNum}</h4>
                  {attempts[activeLift][attemptNum - 1]?.good && (
                    <span className="px-2 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-xs font-medium">
                      Good
                    </span>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Weight"
                    value={attempts[activeLift][attemptNum - 1]?.weight || ''}
                    onChange={(e) => updateAttempt(activeLift, attemptNum - 1, 'weight', parseFloat(e.target.value))}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3b82f6] outline-none"
                  />
                  <button
                    onClick={() => updateAttempt(activeLift, attemptNum - 1, 'good', !attempts[activeLift][attemptNum - 1]?.good)}
                    className={`px-4 rounded-xl font-medium transition-all ${
                      attempts[activeLift][attemptNum - 1]?.good
                        ? 'bg-[#10b981] text-white'
                        : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                    }`}
                  >
                    <Check size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Save Competition Results */}
          <button
            onClick={() => {
              localStorage.setItem('gritfit_pl_competition', JSON.stringify({
                date: new Date().toISOString(),
                attempts,
                total: calculateTotal()
              }));
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#f59e0b]/30 transition-all"
          >
            <Trophy size={20} />
            Save Competition Results
          </button>
        </div>
      )}
    </div>
  );
};

export default Powerlifting;
