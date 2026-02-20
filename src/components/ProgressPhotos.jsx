import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const ProgressPhotos = () => {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      date: '2026-01-15',
      url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400',
      pose: 'front',
      weight: 185
    },
    {
      id: 2,
      date: '2026-02-01',
      url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
      pose: 'front',
      weight: 183
    },
    {
      id: 3,
      date: '2026-02-15',
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
      pose: 'front',
      weight: 181
    }
  ]);
  
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePhotos, setComparePhotos] = useState([0, photos.length - 1]);

  const poses = ['front', 'back', 'side', 'flexed'];

  const handleAddPhoto = () => {
    // In real app, this would open camera/file picker
    console.log('Add photo clicked');
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-header mb-1">Progress Photos</h2>
          <p className="text-zinc-400 text-sm">Visual tracking of your transformation</p>
        </div>
        <button 
          onClick={handleAddPhoto}
          className="btn-primary flex items-center gap-2"
        >
          <Camera size={18} />
          Add Photo
        </button>
      </div>

      {/* Comparison Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="tab-nav">
          <button 
            onClick={() => setCompareMode(false)}
            className={`tab-item ${!compareMode ? 'active' : ''}`}
          >
            Gallery
          </button>
          <button 
            onClick={() => setCompareMode(true)}
            className={`tab-item ${compareMode ? 'active' : ''}`}
          >
            Compare
          </button>
        </div>
      </div>

      {!compareMode ? (
        /* Gallery View */
        <div className="space-y-4">
          {photos.map((photo, index) => (
            <div 
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="exercise-card cursor-pointer group"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-800">
                  <img 
                    src={photo.url} 
                    alt={`Progress ${photo.date}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={14} className="text-zinc-500" />
                    <span className="text-white font-medium">
                      {new Date(photo.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-sm capitalize mb-2">{photo.pose} pose</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold gradient-text">{photo.weight}</span>
                    <span className="text-zinc-500 text-sm">lbs</span>
                  </div>
                  {index > 0 && (
                    <p className={`text-sm ${
                      photo.weight < photos[index - 1].weight 
                        ? 'text-[#10b981]' 
                        : 'text-zinc-500'
                    }`}>
                      {photo.weight < photos[index - 1].weight ? '↓' : '↑'} 
                      {Math.abs(photo.weight - photos[index - 1].weight)} lbs 
                      from last
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Compare View */
        <div>
          {/* Photo Selectors */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <p className="text-zinc-400 text-sm mb-2">Before</p>
              <select 
                value={comparePhotos[0]}
                onChange={(e) => setComparePhotos([parseInt(e.target.value), comparePhotos[1]])}
                className="input-modern"
              >
                {photos.map((photo, idx) => (
                  <option key={photo.id} value={idx}>
                    {new Date(photo.date).toLocaleDateString()} - {photo.weight}lbs
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <p className="text-zinc-400 text-sm mb-2">After</p>
              <select 
                value={comparePhotos[1]}
                onChange={(e) => setComparePhotos([comparePhotos[0], parseInt(e.target.value)])}
                className="input-modern"
              >
                {photos.map((photo, idx) => (
                  <option key={photo.id} value={idx}>
                    {new Date(photo.date).toLocaleDateString()} - {photo.weight}lbs
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden bg-zinc-800">
              <img 
                src={photos[comparePhotos[0]].url}
                alt="Before"
                className="w-full aspect-square object-cover"
              />
              <div className="p-3 text-center">
                <p className="text-zinc-400 text-sm">
                  {new Date(photos[comparePhotos[0]].date).toLocaleDateString()}
                </p>
                <p className="text-xl font-bold text-white">{photos[comparePhotos[0]].weight} lbs</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-zinc-800">
              <img 
                src={photos[comparePhotos[1]].url}
                alt="After"
                className="w-full aspect-square object-cover"
              />
              <div className="p-3 text-center">
                <p className="text-zinc-400 text-sm">
                  {new Date(photos[comparePhotos[1]].date).toLocaleDateString()}
                </p>
                <p className="text-xl font-bold gradient-text">{photos[comparePhotos[1]].weight} lbs</p>
              </div>
            </div>
          </div>

          {/* Change Summary */}
          <div className="mt-6 glass-card p-6 text-center">
            <p className="text-zinc-400 text-sm mb-2">Total Change</p>
            <p className={`text-4xl font-bold ${
              photos[comparePhotos[1]].weight < photos[comparePhotos[0]].weight 
                ? 'text-[#10b981]' 
                : 'text-[#f59e0b]'
            }`}>
              {photos[comparePhotos[1]].weight - photos[comparePhotos[0]].weight > 0 ? '+' : ''}
              {photos[comparePhotos[1]].weight - photos[comparePhotos[0]].weight} lbs
            </p>
            <p className="text-zinc-500 text-sm mt-2">
              {Math.abs(new Date(photos[comparePhotos[1]].date) - new Date(photos[comparePhotos[0]].date)) / (1000 * 60 * 60 * 24)} days apart
            </p>
          </div>
        </div>
      )}

      {/* Photo Tips */}
      <div className="mt-6 glass-card p-4">
        <h3 className="font-semibold text-white mb-2">📸 Photo Tips</h3>
        <ul className="text-sm text-zinc-400 space-y-1">
          <li>• Same lighting and time of day</li>
          <li>• Consistent poses (front, back, side)</li>
          <li>• Similar clothing/flexed or unflexed</li>
          <li>• Take weekly, same day</li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressPhotos;
