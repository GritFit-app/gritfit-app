import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2,
  VolumeX,
  SkipForward,
  Dumbbell
} from 'lucide-react';

const RestTimer = ({ 
  defaultTime = 90, 
  onComplete, 
  exerciseName = "Next Set",
  setNumber = 1,
  totalSets = 4
}) => {
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [customTime, setCustomTime] = useState(defaultTime);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  // Predefined rest periods
  const presets = [
    { label: '30s', value: 30, type: 'strength' },
    { label: '60s', value: 60, type: 'hypertrophy' },
    { label: '90s', value: 90, type: 'hypertrophy' },
    { label: '2m', value: 120, type: 'strength' },
    { label: '3m', value: 180, type: 'power' },
    { label: '5m', value: 300, type: 'recovery' },
  ];

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (soundEnabled) playAlert();
      if (onComplete) onComplete();
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft, soundEnabled, onComplete]);

  const playAlert = () => {
    // Create beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(customTime);
  };

  const setPreset = (seconds) => {
    setCustomTime(seconds);
    setTimeLeft(seconds);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((customTime - timeLeft) / customTime) * 100;

  return (
    <div className="glass-card p-6 mb-4 glow-primary">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-zinc-400 text-sm">Rest Timer</p>
          <h3 className="text-lg font-bold text-white">{exerciseName}</h3>
          <p className="text-xs text-zinc-500">Set {setNumber} of {totalSets}</p>
        </div>
        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
        >
          {soundEnabled ? (
            <Volume2 size={20} className="text-[#00d4ff]" />
          ) : (
            <VolumeX size={20} className="text-zinc-500" />
          )}
        </button>
      </div>

      {/* Timer Display */}
      <div className="relative flex justify-center items-center mb-6">
        {/* Progress Ring */}
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="url(#timerGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Time Display */}
        <div className="absolute text-center">
          <span className={`text-5xl font-bold ${timeLeft <= 10 ? 'text-[#ef4444]' : 'gradient-text'}`}>
            {formatTime(timeLeft)}
          </span>
          <p className="text-zinc-400 text-sm mt-1">
            {isActive ? 'Resting...' : timeLeft === 0 ? 'Time\'s up!' : 'Ready'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={resetTimer}
          className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
        >
          <RotateCcw size={24} className="text-zinc-400" />
        </button>
        
        <button
          onClick={toggleTimer}
          className={`p-6 rounded-full transition-all transform hover:scale-105 ${
            isActive 
              ? 'bg-[#ef4444]/20 text-[#ef4444]' 
              : 'bg-gradient-to-br from-[#00d4ff] to-[#a855f7] text-white shadow-lg shadow-[#00d4ff]/30'
          }`}
        >
          {isActive ? <Pause size={32} /> : <Play size={32} />}
        </button>
        
        <button
          onClick={() => setTimeLeft(0)}
          className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
        >
          <SkipForward size={24} className="text-zinc-400" />
        </button>
      </div>

      {/* Quick Presets */}
      <div className="grid grid-cols-3 gap-2">
        {presets.map((preset) => (
          <button
            key={preset.value}
            onClick={() => setPreset(preset.value)}
            className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
              customTime === preset.value
                ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            {preset.label}
            <span className="block text-xs opacity-70">{preset.type}</span>
          </button>
        ))}
      </div>

      {/* Last Set Indicator */}
      {setNumber === totalSets && (
        <div className="mt-4 p-3 bg-[#10b981]/10 border border-[#10b981]/30 rounded-xl text-center">
          <p className="text-[#10b981] font-semibold">🎉 Final Set! Give it everything!</p>
        </div>
      )}
    </div>
  );
};

export default RestTimer;
