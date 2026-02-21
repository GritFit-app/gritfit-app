import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Video, 
  Play, 
  Square, 
  CheckCircle, 
  AlertCircle,
  RefreshCcw,
  Upload,
  ChevronRight,
  Sparkles
} from 'lucide-react';

// Simulated form analysis feedback
const FORM_CHECKS = {
  squat: [
    { id: 'depth', name: 'Depth Check', description: 'Hips below parallel' },
    { id: 'knees', name: 'Knee Tracking', description: 'Knees aligned with toes' },
    { id: 'back', name: 'Back Position', description: 'Neutral spine maintained' },
    { id: 'bracing', name: 'Core Bracing', description: 'Proper breath and brace' }
  ],
  deadlift: [
    { id: 'hip_hinge', name: 'Hip Hinge', description: 'Proper hip movement' },
    { id: 'bar_path', name: 'Bar Path', description: 'Straight vertical line' },
    { id: 'shoulders', name: 'Shoulder Position', description: 'Over the bar' },
    { id: 'lockout', name: 'Lockout', description: 'Hips through at top' }
  ],
  bench: [
    { id: 'arch', name: 'Back Arch', description: 'Stable upper back position' },
    { id: 'bar_path', name: 'Bar Path', description: 'Slight J-curve' },
    { id: 'elbows', name: 'Elbow Tuck', description: '75° angle maintained' },
    { id: 'leg_drive', name: 'Leg Drive', description: 'Power from lower body' }
  ],
  overhead: [
    { id: 'wrist', name: 'Wrist Position', description: 'Stacked under bar' },
    { id: 'bar_path', name: 'Bar Path', description: 'Straight vertical line' },
    { id: 'core', name: 'Core Stability', description: 'No excessive arch' }
  ]
};

const AIFormCoach = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLift, setSelectedLift] = useState('squat');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Auto-stop after 10 seconds
  useEffect(() => {
    if (recordingTime >= 10 && isRecording) {
      stopRecording();
    }
  }, [recordingTime, isRecording]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setCameraActive(true);
    } catch (err) {
      console.error('Camera access denied:', err);
      // Fallback for demo
      setCameraActive(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const startRecording = () => {
    setIsRecording(true);
    setAnalysisResult(null);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const checks = FORM_CHECKS[selectedLift];
      const results = checks.map(check => ({
        ...check,
        passed: Math.random() > 0.3, // Simulate some passes/fails
        confidence: Math.floor(Math.random() * 20) + 80 // 80-100% confidence
      }));
      
      setAnalysisResult({
        lift: selectedLift,
        timestamp: new Date().toISOString(),
        overallScore: Math.floor(results.filter(r => r.passed).length / results.length * 100),
        checks: results,
        feedback: generateFeedback(results)
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateFeedback = (results) => {
    const passed = results.filter(r => r.passed);
    const failed = results.filter(r => !r.passed);
    
    if (failed.length === 0) {
      return "Excellent form! All checks passed. Keep it up!";
    }
    
    const tips = failed.map(r => r.description).join('. ');
    return `Focus on: ${tips}`;
  };

  const formatTime = (seconds) => {
    return `${seconds.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="pb-24 px-6 pt-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#00d4ff] flex items-center justify-center">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Form Coach</h2>
            <p className="text-zinc-400 text-sm">Real-time form analysis</p>
          </div>
        </div>
      </div>

      {/* Lift Selection */}
      <div className="exercise-card mb-4">
        <h3 className="font-semibold text-white mb-3">Select Lift</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(FORM_CHECKS).map((lift) => (
            <button
              key={lift}
              onClick={() => setSelectedLift(lift)}
              className={`p-3 rounded-xl text-sm font-medium capitalize transition-all ${
                selectedLift === lift
                  ? 'bg-gradient-to-r from-[#10b981] to-[#00d4ff] text-white'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10'
              }`}
            >
              {lift.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Camera Preview */}
      <div className="exercise-card p-0 overflow-hidden mb-4">
        <div className="relative aspect-[3/4] bg-black">
          {cameraActive ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              
              {/* Recording Overlay */}
              {isRecording && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/80">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span className="text-white text-sm font-medium">REC {formatTime(recordingTime)}</span>
                  </div>
                  
                  {/* Pose Overlay Lines (simulated) */}
                  <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
                    <line x1="30%" y1="20%" x2="30%" y2="80%" stroke="#00d4ff" strokeWidth="3" strokeDasharray="5,5" />
                    <line x1="70%" y1="20%" x2="70%" y2="80%" stroke="#00d4ff" strokeWidth="3" strokeDasharray="5,5" />
                    <circle cx="50%" cy="15%" r="20" fill="none" stroke="#00d4ff" strokeWidth="2" />
                  </svg>
                </div>
              )}

              {/* Progress bar during recording */}
              {isRecording && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div 
                    className="h-full bg-red-500 transition-all"
                    style={{ width: `${(recordingTime / 10) * 100}%` }}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera size={48} className="text-zinc-600 mb-4" />
              <p className="text-zinc-500 text-sm text-center px-8">
                Position your camera to capture your full body during the lift
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4">
          {!cameraActive ? (
            <button
              onClick={startCamera}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#10b981] to-[#00d4ff] text-white font-semibold flex items-center justify-center gap-2"
            >
              <Camera size={20} />
              Start Camera
            </button>
          ) : (
            <div className="flex gap-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                >
                  <Video size={20} />
                  Record Lift
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex-1 py-3 rounded-xl bg-zinc-700 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Square size={20} />
                  Stop ({10 - recordingTime}s)
                </button>
              )}
              <button
                onClick={stopCamera}
                className="p-3 rounded-xl bg-white/5 text-zinc-400 hover:bg-white/10"
              >
                <RefreshCcw size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Loading */}
      {isAnalyzing && (
        <div className="exercise-card text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#10b981] to-[#00d4ff] flex items-center justify-center animate-pulse">
            <Sparkles size={32} className="text-white" />
          </div>
          <h3 className="font-bold text-white mb-2">Analyzing Your Form...</h3>
          <p className="text-zinc-400 text-sm">AI is reviewing your lift mechanics</p>
          <div className="mt-4 flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && !isAnalyzing && (
        <div className="space-y-4">
          {/* Overall Score */}
          <div className="exercise-card text-center">
            <h3 className="font-semibold text-white mb-2">Form Score</h3>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke={analysisResult.overallScore >= 80 ? '#10b981' : analysisResult.overallScore >= 60 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${analysisResult.overallScore * 3.52} 352`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-black text-white">{analysisResult.overallScore}</span>
              </div>
            </div>
            <p className="text-zinc-400 text-sm mt-2">{analysisResult.feedback}</p>
          </div>

          {/* Detailed Checks */}
          <div className="exercise-card">
            <h3 className="font-semibold text-white mb-3">Form Breakdown</h3>
            <div className="space-y-2">
              {analysisResult.checks.map((check) => (
                <div
                  key={check.id}
                  className={`p-3 rounded-xl flex items-center gap-3 ${
                    check.passed ? 'bg-[#10b981]/10' : 'bg-red-500/10'
                  }`}
                >
                  {check.passed ? (
                    <CheckCircle size={20} className="text-[#10b981] flex-shrink-0" />
                  ) : (
                    <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${check.passed ? 'text-white' : 'text-red-400'}`}>
                      {check.name}
                    </p>
                    <p className="text-zinc-400 text-xs">{check.description}</p>
                  </div>
                  <span className="text-zinc-500 text-xs">{check.confidence}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="exercise-card bg-gradient-to-br from-[#10b981]/10 to-[#00d4ff]/10">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-[#10b981]" />
              AI Recommendations
            </h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              {analysisResult.checks.filter(c => !c.passed).map((check, idx) => (
                <li key={check.id} className="flex items-start gap-2">
                  <span className="text-[#10b981]">{idx + 1}.</span>
                  <span>Work on your {check.name.toLowerCase()}. Try {getTipForCheck(check.id)}</span>
                </li>
              ))}
              {analysisResult.checks.filter(c => !c.passed).length === 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-[#10b981]">✓</span>
                  <span>Your form looks great! Consider increasing weight or trying more challenging variations.</span>
                </li>
              )}
            </ul>
          </div>

          {/* Record Another */}
          <button
            onClick={() => {
              setAnalysisResult(null);
              setRecordingTime(0);
            }}
            className="w-full py-4 rounded-2xl bg-white/5 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
          >
            <RefreshCcw size={20} />
            Analyze Another Lift
          </button>
        </div>
      )}

      {/* Instructions */}
      {!analysisResult && !isAnalyzing && (
        <div className="exercise-card">
          <h3 className="font-semibold text-white mb-3">How It Works</h3>
          <ol className="space-y-3 text-sm text-zinc-400">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#10b981]/20 text-[#10b981] flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
              <span>Select your lift and position your camera side-on</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#10b981]/20 text-[#10b981] flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
              <span>Record one full rep (10 second max)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#10b981]/20 text-[#10b981] flex items-center justify-center flex-shrink-0 text-xs font-bold">3</span>
              <span>Get instant AI feedback on your form</span>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};

// Helper function for tips
const getTipForCheck = (checkId) => {
  const tips = {
    depth: 'pausing at the bottom position and working on mobility',
    knees: 'focusing on pushing knees out in line with your toes',
    back: 'engaging your core and maintaining a neutral spine throughout',
    bracing: 'taking a deep breath and holding tight before descending',
    hip_hinge: 'practicing the hip hinge pattern with lighter weight',
    bar_path: 'keeping the bar close to your shins and thighs',
    shoulders: 'setting up with shoulders slightly in front of the bar',
    lockout: 'squeezing glutes at the top to fully lock out',
    arch: 'retracting shoulder blades and setting a stable base',
    elbows: 'tucking elbows to about 75 degrees at the bottom',
    leg_drive: 'driving through your feet to engage leg power',
    wrist: 'keeping wrists straight and stacked under the bar',
    core: 'bracing your abs to prevent excessive back arch'
  };
  return tips[checkId] || 'focusing on proper technique';
};

export default AIFormCoach;
