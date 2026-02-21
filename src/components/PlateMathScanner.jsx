import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, Calculator, ChevronRight, Info } from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';
import FeatureButton, { PremiumBadge } from './FeatureButton';

const PlateMathScanner = ({ onUpgradeRequest }) => {
  const { isFree } = useSubscription();
  const [isScanning, setIsScanning] = useState(false);
  const [detectedWeight, setDetectedWeight] = useState(null);
  const [manualWeight, setManualWeight] = useState('');
  const [barWeight, setBarWeight] = useState(45);

  // Plate options
  const plates = [
    { weight: 45, color: '#10b981', label: '45' },
    { weight: 35, color: '#3b82f6', label: '35' },
    { weight: 25, color: '#f59e0b', label: '25' },
    { weight: 10, color: '#a855f7', label: '10' },
    { weight: 5, color: '#ef4444', label: '5' },
    { weight: 2.5, color: '#6b7280', label: '2.5' }
  ];

  // If free user, show upgrade CTA
  if (isFree) {
    return (
      <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#00d4ff] flex items-center justify-center shadow-lg">
            <Camera size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Plate Math Scanner
          </h2>
          <p className="text-zinc-400">
            Take a photo of your barbell and instantly calculate the weight
          </p>
        </div>

        {/* Camera preview demo */}
        <div className="relative rounded-2xl overflow-hidden mb-6 border-2 border-dashed border-white/20">
          <div className="aspect-video bg-[#0a0a0f] flex items-center justify-center">
            <div className="text-center">
              <Camera size={48} className="mx-auto mb-4 text-[#10b981]" />
              <p className="text-zinc-500">Point camera at barbell</p>
            </div>
          </div>
          
          {/* Scanning frame overlay */}
          <div className="absolute inset-4 border-2 border-[#10b981]/50 rounded-lg pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#10b981]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#10b981]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#10b981]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#10b981]" />
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {[
            { title: 'Instant Recognition', desc: 'AI identifies plates in seconds' },
            { title: 'Multiple Bars', desc: 'Works with standard, Olympic, and specialty bars' },
            { title: 'Manual Override', desc: 'Quick-adjust for partial plates' },
            { title: 'Plate Breakdown', desc: 'See exactly which plates to load' }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                <Calculator size={20} className="text-[#10b981]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <FeatureButton
          featureKey={null}
          onClick={onUpgradeRequest}
          variant="primary"
          size="lg"
          className="w-full"
        >
          <PremiumBadge tier="premium" />
          Unlock Plate Scanner
        </FeatureButton>
      </div>
    );
  }

  // Premium user content
  const startScan = () => {
    setIsScanning(true);
    setDetectedWeight(null);
    
    // Simulate scanning
    setTimeout(() => {
      setDetectedWeight({
        total: 225,
        perSide: 90,
        plates: [
          { weight: 45, count: 1 },
          { weight: 25, count: 1 },
          { weight: 10, count: 1 },
          { weight: 5, count: 1 }
        ]
      });
      setIsScanning(false);
    }, 2000);
  };

  const calculateManual = () => {
    const weight = parseFloat(manualWeight);
    if (!weight || weight < barWeight) return;

    const perSide = (weight - barWeight) / 2;
    const plateCombo = [];
    let remaining = perSide;

    // Greedy algorithm for plate selection
    for (const plate of plates) {
      const count = Math.floor(remaining / plate.weight);
      if (count > 0) {
        plateCombo.push({ weight: plate.weight, count });
        remaining -= count * plate.weight;
      }
    }

    setDetectedWeight({
      total: weight,
      perSide,
      plates: plateCombo
    });
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#00d4ff] flex items-center justify-center shadow-lg">
          <Camera size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Plate Scanner</h2>
          <PremiumBadge tier="premium" />
        </div>
      </div>

      {/* Scanner area */}
      <div className="glass-card p-4 mb-6">
        <div className="relative aspect-video bg-[#0a0a0f] rounded-xl overflow-hidden mb-4">
          {isScanning ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[#10b981] border-t-transparent animate-spin" />
                <p className="text-white">Analyzing...</p>
              </div>
            </div>
          ) : detectedWeight ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-5xl font-black text-white mb-2">{detectedWeight.total}</p>
                <p className="text-[#10b981]">lbs detected</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera size={48} className="text-zinc-600" />
            </div>
          )}
          
          {/* Scanning frame */}
          <div className="absolute inset-4 border-2 border-dashed border-white/20 rounded-lg" />
        </div>

        <div className="flex gap-3">
          <button
            onClick={startScan}
            disabled={isScanning}
            className="flex-1 py-3 bg-gradient-to-r from-[#10b981] to-[#00d4ff] text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Camera size={18} />
            Scan Barbell
          </button>
          {detectedWeight && (
            <button
              onClick={() => setDetectedWeight(null)}
              className="px-4 py-3 bg-white/10 text-white rounded-xl"
            >
              <RefreshCw size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Manual Calculator */}
      <div className="glass-card p-4 mb-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Calculator size={18} className="text-[#00d4ff]" />
          Manual Calculator
        </h3>

        <div className="flex gap-3 mb-4">
          <select
            value={barWeight}
            onChange={(e) => setBarWeight(Number(e.target.value))}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
          >
            <option value={45}>45 lb bar</option>
            <option value={35}>35 lb bar</option>
            <option value={25}>25 lb bar</option>
            <option value={15}>15 lb bar</option>
          </select>
          <input
            type="number"
            value={manualWeight}
            onChange={(e) => setManualWeight(e.target.value)}
            placeholder="Target weight"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-zinc-600"
          />
          <button
            onClick={calculateManual}
            className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {detectedWeight && (
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="flex justify-between mb-3">
              <span className="text-zinc-400">Per side:</span>
              <span className="text-white font-bold">{detectedWeight.perSide} lbs</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-zinc-500 text-xs font-semibold uppercase">Plate Load</p>
              {detectedWeight.plates.map((plate, idx) => {
                const plateInfo = plates.find(p => p.weight === plate.weight);
                return (
                  <div key={idx} className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: plateInfo?.color || '#6b7280' }}
                    >
                      {plate.weight}
                    </div>
                    <span className="text-white">× {plate.count}</span>
                    <span className="text-zinc-500 text-sm">({plate.weight * plate.count} lbs)</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Quick reference */}
      <div className="glass-card p-4">
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <Info size={16} className="text-zinc-500" />
          Plate Reference
        </h3>
        <div className="grid grid-cols-6 gap-2">
          {plates.map((plate) => (
            <div key={plate.weight} className="text-center">
              <div 
                className="w-10 h-10 mx-auto rounded mb-1"
                style={{ backgroundColor: plate.color }}
              />
              <span className="text-zinc-400 text-xs">{plate.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlateMathScanner;
