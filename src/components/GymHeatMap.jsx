import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, TrendingUp, Navigation, Star, ChevronRight } from 'lucide-react';

// Simulated gym data
const MOCK_GYMS = [
  { id: 1, name: 'Iron Temple Gym', lat: 40.7128, lng: -74.0060, rating: 4.8, distance: 0.3 },
  { id: 2, name: 'Powerhouse Fitness', lat: 40.7200, lng: -74.0100, rating: 4.5, distance: 0.8 },
  { id: 3, name: 'Elite Strength Club', lat: 40.7100, lng: -73.9950, rating: 4.9, distance: 1.2 },
];

// Hourly crowd data (0-100 scale)
const generateCrowdData = () => {
  const data = {};
  for (let day = 0; day < 7; day++) {
    data[day] = {};
    for (let hour = 5; hour <= 23; hour++) {
      // Peak hours: 5-8 PM weekdays, 9-12 weekends
      let base = 30;
      if (day < 5) { // Weekday
        if (hour >= 6 && hour <= 8) base = 70; // Morning rush
        else if (hour >= 17 && hour <= 20) base = 90; // Evening peak
        else if (hour >= 12 && hour <= 14) base = 60; // Lunch
        else base = 30 + Math.random() * 20;
      } else { // Weekend
        if (hour >= 9 && hour <= 12) base = 80; // Morning peak
        else if (hour >= 15 && hour <= 18) base = 70; // Afternoon
        else base = 40 + Math.random() * 20;
      }
      data[day][hour] = Math.min(100, Math.max(5, Math.round(base + (Math.random() - 0.5) * 20)));
    }
  }
  return data;
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const GymHeatMap = () => {
  const [selectedGym, setSelectedGym] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [crowdData, setCrowdData] = useState({});
  const [bestTimes, setBestTimes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().getHours());

  useEffect(() => {
    // Generate crowd data for all gyms
    const data = {};
    MOCK_GYMS.forEach(gym => {
      data[gym.id] = generateCrowdData();
    });
    setCrowdData(data);
    setSelectedGym(MOCK_GYMS[0]);
  }, []);

  useEffect(() => {
    if (selectedGym && crowdData[selectedGym.id]) {
      // Find best times (lowest crowd levels)
      const dayData = crowdData[selectedGym.id][selectedDay];
      const times = Object.entries(dayData)
        .map(([hour, level]) => ({ hour: parseInt(hour), level }))
        .sort((a, b) => a.level - b.level)
        .slice(0, 3);
      setBestTimes(times);
    }
  }, [selectedGym, selectedDay, crowdData]);

  const getCrowdLevel = (level) => {
    if (level <= 30) return { label: 'Empty', color: '#10b981', emoji: '🟢' };
    if (level <= 50) return { label: 'Light', color: '#f59e0b', emoji: '🟡' };
    if (level <= 75) return { label: 'Busy', color: '#f97316', emoji: '🟠' };
    return { label: 'Packed', color: '#ef4444', emoji: '🔴' };
  };

  const getHeatColor = (level) => {
    if (level <= 20) return '#064e3b'; // Very low
    if (level <= 40) return '#10b981'; // Low
    if (level <= 60) return '#f59e0b'; // Medium
    if (level <= 80) return '#f97316'; // High
    return '#ef4444'; // Very high
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ef4444] to-[#f59e0b] flex items-center justify-center">
            <MapPin size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Gym Heat Map</h2>
            <p className="text-zinc-400 text-sm">Find the best time to train</p>
          </div>
        </div>
      </div>

      {/* Current Status Card */}
      {selectedGym && crowdData[selectedGym.id] && (
        <div className="exercise-card mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white">{selectedGym.name}</h3>
              <p className="text-zinc-400 text-sm">{selectedGym.distance} miles away</p>
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-[#f59e0b]" />
              <span className="text-white font-medium">{selectedGym.rating}</span>
            </div>
          </div>

          {/* Current Crowd Level */}
          <div className="p-4 rounded-xl bg-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-sm">Current Crowd Level</span>
              <span className="text-zinc-500 text-sm">{currentTime}:00</span>
            </div>
            {(() => {
              const level = crowdData[selectedGym.id][selectedDay][currentTime] || 50;
              const status = getCrowdLevel(level);
              return (
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{status.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{status.label}</span>
                      <span className="text-zinc-400 text-sm">{level}% capacity</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${level}%`,
                          backgroundColor: status.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Day Selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {DAYS.map((day, idx) => (
          <button
            key={day}
            onClick={() => setSelectedDay(idx)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedDay === idx
                ? 'bg-gradient-to-r from-[#ef4444] to-[#f59e0b] text-white'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Hourly Heat Map */}
      {selectedGym && crowdData[selectedGym.id] && (
        <div className="exercise-card">
          <h3 className="font-semibold text-white mb-4">{DAYS[selectedDay]} Crowd Forecast</h3>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {Object.entries(crowdData[selectedGym.id][selectedDay] || {})
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([hour, level]) => {
                const status = getCrowdLevel(level);
                const isCurrentHour = parseInt(hour) === currentTime && selectedDay === new Date().getDay();
                
                return (
                  <div 
                    key={hour}
                    className={`flex items-center gap-3 p-2 rounded-xl ${
                      isCurrentHour ? 'bg-white/10' : ''
                    }`}
                  >
                    <span className="text-zinc-400 text-sm w-12">
                      {parseInt(hour) % 12 || 12}{parseInt(hour) < 12 ? 'am' : 'pm'}
                    </span>
                    <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden relative">
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${level}%`,
                          backgroundColor: getHeatColor(level),
                          opacity: 0.8
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {level}%
                      </span>
                    </div>
                    <span className="text-xs w-16 text-right" style={{ color: status.color }}>
                      {status.label}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Best Times */}
      <div className="exercise-card mt-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-[#10b981]" />
          <h3 className="font-semibold text-white">Best Times to Train</h3>
        </div>
        
        {bestTimes.length > 0 ? (
          <div className="space-y-2">
            {bestTimes.map((time, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#10b981] text-black flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="text-white font-medium">
                    {time.hour % 12 || 12}:00 {time.hour < 12 ? 'AM' : 'PM'}
                  </span>
                </div>
                <span className="text-[#10b981] font-bold">{time.level}% busy</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-400 text-sm">Select a gym to see best training times</p>
        )}
      </div>

      {/* Nearby Gyms */}
      <div className="exercise-card mt-4">
        <h3 className="font-semibold text-white mb-4">Nearby Gyms</h3>
        <div className="space-y-3">
          {MOCK_GYMS.map((gym) => (
            <button
              key={gym.id}
              onClick={() => setSelectedGym(gym)}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                selectedGym?.id === gym.id
                  ? 'bg-gradient-to-r from-[#ef4444]/20 to-[#f59e0b]/20 border border-[#ef4444]/30'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                selectedGym?.id === gym.id
                  ? 'bg-gradient-to-br from-[#ef4444] to-[#f59e0b]'
                  : 'bg-white/10'
              }`}>
                <MapPin size={18} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-white">{gym.name}</p>
                <p className="text-zinc-400 text-xs">{gym.distance} miles • {gym.rating}★</p>
              </div>
              <ChevronRight size={18} className="text-zinc-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="exercise-card mt-4">
        <h3 className="font-semibold text-white mb-3">Crowd Level Guide</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { level: 'Empty', color: '#10b981', range: '0-30%' },
            { level: 'Light', color: '#f59e0b', range: '31-50%' },
            { level: 'Busy', color: '#f97316', range: '51-75%' },
            { level: 'Packed', color: '#ef4444', range: '76-100%' },
          ].map((item) => (
            <div key={item.level} className="flex items-center gap-2 p-2 rounded-xl bg-white/5">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <p className="text-white text-sm">{item.level}</p>
                <p className="text-zinc-500 text-xs">{item.range}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymHeatMap;
