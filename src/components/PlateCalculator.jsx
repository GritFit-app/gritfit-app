import React, { useState } from 'react';
import { Calculator, RotateCcw, Dumbbell } from 'lucide-react';

const PlateCalculator = () => {
  const [targetWeight, setTargetWeight] = useState(225);
  const [barWeight, setBarWeight] = useState(45);
  const [unit, setUnit] = useState('lbs');

  // Standard plate weights
  const plates = unit === 'lbs' 
    ? [45, 35, 25, 10, 5, 2.5] 
    : [20, 15, 10, 5, 2.5, 1.25];

  const calculatePlates = () => {
    const weightPerSide = (targetWeight - barWeight) / 2;
    if (weightPerSide <= 0) return [];

    let remaining = weightPerSide;
    const result = [];

    for (const plate of plates) {
      const count = Math.floor(remaining / plate);
      if (count > 0) {
        result.push({ weight: plate, count });
        remaining -= plate * count;
      }
    }

    return result;
  };

  const plateBreakdown = calculatePlates();
  const totalWeight = barWeight + plateBreakdown.reduce((sum, p) => sum + (p.weight * p.count * 2), 0);

  return (
    <div className="glass-card p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#00d4ff]/10 rounded-lg">
          <Calculator size={24} className="text-[#00d4ff]" />
        </div>
        <div>
          <h3 className="font-bold text-white">Plate Calculator</h3>
          <p className="text-zinc-400 text-sm">Quick math for your working weight</p>
        </div>
      </div>

      {/* Unit Toggle */}
      <div className="flex justify-center mb-6">
        <div className="tab-nav">
          <button 
            onClick={() => setUnit('lbs')}
            className={`tab-item ${unit === 'lbs' ? 'active' : ''}`}
          >
            LBS
          </button>
          <button 
            onClick={() => setUnit('kg')}
            className={`tab-item ${unit === 'kg' ? 'active' : ''}`}
          >
            KG
          </button>
        </div>
      </div>

      {/* Bar Weight */}
      <div className="mb-4">
        <label className="text-zinc-400 text-sm mb-2 block">Bar Weight</label>
        <div className="flex gap-2">
          {[unit === 'lbs' ? 45 : 20, unit === 'lbs' ? 35 : 15].map((weight) => (
            <button
              key={weight}
              onClick={() => setBarWeight(weight)}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                barWeight === weight
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10'
              }`}
            >
              {weight} {unit}
            </button>
          ))}
        </div>
      </div>

      {/* Target Weight */}
      <div className="mb-6">
        <label className="text-zinc-400 text-sm mb-2 block">Target Weight</label>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTargetWeight(Math.max(0, targetWeight - (unit === 'lbs' ? 5 : 2.5)))}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white/10"
          >
            -
          </button>
          <div className="flex-1 text-center">
            <span className="text-4xl font-bold gradient-text">{targetWeight}</span>
            <span className="text-zinc-500 ml-2">{unit}</span>
          </div>
          <button 
            onClick={() => setTargetWeight(targetWeight + (unit === 'lbs' ? 5 : 2.5))}
            className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white/10"
          >
            +
          </button>
        </div>
      </div>

      {/* Plate Breakdown */}
      <div className="bg-[#0a0a0f] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-zinc-400 text-sm">Per Side:</span>
          <button 
            onClick={() => setTargetWeight(barWeight)}
            className="text-xs text-[#00d4ff] flex items-center gap-1"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        </div>

        {plateBreakdown.length > 0 ? (
          <div className="space-y-2">
            {plateBreakdown.map((plate, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded flex items-center justify-center font-bold text-sm ${
                    plate.weight >= (unit === 'lbs' ? 35 : 15) 
                      ? 'bg-[#ef4444] text-white' 
                      : plate.weight >= (unit === 'lbs' ? 10 : 5)
                      ? 'bg-[#f59e0b] text-white'
                      : 'bg-zinc-700 text-zinc-300'
                  }`}>
                    {plate.weight}
                  </div>
                  <span className="text-zinc-400">× {plate.count} plates</span>
                </div>
                <span className="text-white font-semibold">
                  {plate.weight * plate.count * 2} {unit}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 text-center py-4">Just the bar!</p>
        )}

        {/* Visual Bar */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-center gap-1">
            {/* Left plates */}
            {plateBreakdown.slice().reverse().map((plate, idx) => (
              [...Array(plate.count)].map((_, i) => (
                <div 
                  key={`left-${idx}-${i}`}
                  className={`w-3 rounded-sm ${
                    plate.weight >= (unit === 'lbs' ? 35 : 15) 
                      ? 'bg-[#ef4444] h-16' 
                      : plate.weight >= (unit === 'lbs' ? 10 : 5)
                      ? 'bg-[#f59e0b] h-12'
                      : 'bg-zinc-600 h-8'
                  }`}
                />
              ))
            ))}
            
            {/* Bar */}
            <div className="w-24 h-4 bg-zinc-500 rounded" />
            
            {/* Right plates */}
            {plateBreakdown.map((plate, idx) => (
              [...Array(plate.count)].map((_, i) => (
                <div 
                  key={`right-${idx}-${i}`}
                  className={`w-3 rounded-sm ${
                    plate.weight >= (unit === 'lbs' ? 35 : 15) 
                      ? 'bg-[#ef4444] h-16' 
                      : plate.weight >= (unit === 'lbs' ? 10 : 5)
                      ? 'bg-[#f59e0b] h-12'
                      : 'bg-zinc-600 h-8'
                  }`}
                />
              ))
            ))}
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-zinc-400">Total Weight:</span>
        <span className="text-2xl font-bold gradient-text">
          {totalWeight} {unit}
        </span>
      </div>
    </div>
  );
};

export default PlateCalculator;
