import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Check,
  Shield,
  FileText,
  ChevronRight,
  Dumbbell,
  Flame,
  Trophy,
  Activity,
  Sparkles,
  X
} from 'lucide-react';

const AuthScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState('form'); // 'form', 'terms', 'welcome'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        onLogin(formData);
      } else {
        setStep('terms');
      }
    }
  };

  const handleTermsAccept = () => {
    setStep('welcome');
  };

  const handleWelcomeComplete = () => {
    onLogin(formData);
  };

  if (step === 'terms') {
    return <TermsScreen onAccept={handleTermsAccept} />;
  }

  if (step === 'welcome') {
    return <WelcomeScreen userName={formData.name} onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black tracking-tight mb-2">
            <span className="bg-gradient-to-r from-[#00f5d4] to-[#00d4ff] bg-clip-text text-transparent">
              GRIT
            </span>
            <span className="text-white">FIT</span>
          </h1>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">Train Smarter</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-8 w-full max-w-sm">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              isLogin 
                ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              !isLogin 
                ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00d4ff] transition-colors"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-white placeholder-zinc-600 focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-[#00d4ff] hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            {isLogin ? 'Sign In' : 'Continue'}
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8 w-full max-w-sm">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-zinc-500 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social Login */}
        <button className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl py-4 flex items-center justify-center gap-3 hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-white font-medium">Continue with Google</span>
        </button>

        <button className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl py-4 flex items-center justify-center gap-3 hover:bg-white/10 transition-colors mt-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          <span className="text-white font-medium">Continue with Facebook</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-6 text-center">
        <p className="text-zinc-500 text-xs">
          By continuing, you agree to our{' '}
          <button className="text-[#00d4ff] hover:underline">Terms of Service</button>
          {' '}and{' '}
          <button className="text-[#00d4ff] hover:underline">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

// ==================== TERMS SCREEN ====================

const TermsScreen = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  if (showTerms) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] z-50 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6 sticky top-0 bg-[#0a0a0f] py-4">
            <button 
              onClick={() => setShowTerms(false)}
              className="p-2 -ml-2 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-white">Terms of Service</h2>
          </div>
          
          <div className="text-zinc-300 space-y-6 text-sm leading-relaxed">
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <p className="text-yellow-400 font-medium">⚠️ Health Disclaimer</p>
              <p className="text-yellow-400/80 mt-1">
                GritFit is a fitness tracking tool, not a medical device. Consult a physician before starting any exercise program.
              </p>
            </div>

            <section>
              <h3 className="text-white font-bold text-lg mb-2">1. Acceptance of Terms</h3>
              <p>By accessing or using GritFit, you agree to be bound by these Terms of Service. If you do not agree to these Terms, you may not use the App.</p>
            </section>

            <section>
              <h3 className="text-white font-bold text-lg mb-2">2. User Accounts</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>You must be at least 13 years old</li>
                <li>Provide accurate information</li>
                <li>Maintain account security</li>
                <li>Responsible for all account activity</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-bold text-lg mb-2">3. Data and Privacy</h3>
              <p>We collect workout data, account information, and usage analytics to provide and improve our services. See our Privacy Policy for complete details.</p>
            </section>

            <section>
              <h3 className="text-white font-bold text-lg mb-2">4. Subscriptions</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Premium: $9.99/month or $79.99/year</li>
                <li>Payments processed securely via Stripe</li>
                <li>Cancel anytime in account settings</li>
                <li>No refunds for partial months</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-bold text-lg mb-2">5. Limitation of Liability</h3>
              <p>GritFit is provided "as is" without warranties. We are not liable for injuries or damages resulting from use of the App.</p>
            </section>

            <p className="text-zinc-500 pt-4 border-t border-white/10">
              Full Terms of Service available at gritfit.app/terms
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showPrivacy) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] z-50 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6 sticky top-0 bg-[#0a0a0f] py-4">
            <button 
              onClick={() => setShowPrivacy(false)}
              className="p-2 -ml-2 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
          </div>
          
          <div className="text-zinc-300 space-y-6 text-sm leading-relaxed">
            <section>
              <h3 className="text-white font-bold text-lg mb-2">Information We Collect</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Account:</strong> Email, username, password</li>
                <li><strong>Fitness Data:</strong> Workouts, weights, reps, progress photos</li>
                <li><strong>Device:</strong> Type, OS, app version</li>
                <li><strong>Usage:</strong> Features used, session duration</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-bold text-lg mb-2">How We Use Your Data</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Provide workout tracking and AI recommendations</li>
                <li>Calculate training analytics</li>
                <li>Send important notifications</li>
                <li>Improve app features</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-bold text-lg mb-2">Data Security</h3>
              <p>We use industry-standard SSL/TLS encryption. Free users' data stays on your device. Premium users' data is encrypted and backed up to secure servers.</p>
            </section>

            <section>
              <h3 className="text-white font-bold text-lg mb-2">Your Rights</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>View and export your data</li>
                <li>Delete your account anytime</li>
                <li>Opt out of marketing emails</li>
                <li>We never sell your data</li>
              </ul>
            </section>

            <p className="text-zinc-500 pt-4 border-t border-white/10">
              Full Privacy Policy available at gritfit.app/privacy
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] flex items-center justify-center mb-6">
          <Shield size={40} className="text-white" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2 text-center">Almost There!</h2>
        <p className="text-zinc-400 text-center mb-8">
          Please review our terms to complete your account creation
        </p>

        <div className="w-full space-y-4 mb-8">
          <button 
            onClick={() => setShowTerms(true)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-[#00d4ff]" />
              <span className="text-white font-medium">Terms of Service</span>
            </div>
            <ChevronRight size={18} className="text-zinc-500" />
          </button>

          <button 
            onClick={() => setShowPrivacy(true)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-[#a855f7]" />
              <span className="text-white font-medium">Privacy Policy</span>
            </div>
            <ChevronRight size={18} className="text-zinc-500" />
          </button>
        </div>

        <div className="space-y-4 w-full">
          <button
            onClick={() => setAccepted(!accepted)}
            className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
              accepted ? 'bg-[#00d4ff]' : 'border-2 border-zinc-600'
            }`}>
              {accepted && <Check size={16} className="text-white" />}
            </div>
            <span className="text-zinc-300 text-sm">
              I have read and agree to the Terms of Service and Privacy Policy
            </span>
          </button>

          <button
            onClick={onAccept}
            disabled={!accepted}
            className={`w-full py-4 rounded-xl font-semibold transition-all ${
              accepted 
                ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white' 
                : 'bg-white/10 text-zinc-500 cursor-not-allowed'
            }`}
          >
            Complete Sign Up
          </button>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          You must be 13+ years old to use GritFit
        </p>
      </div>
    </div>
  );
};

// ==================== WELCOME SCREEN ====================

const WelcomeScreen = ({ userName, onComplete }) => {
  const [step, setStep] = useState(0);

  const welcomeSteps = [
    {
      icon: <Dumbbell size={48} className="text-[#00d4ff]" />,
      title: `Welcome to GritFit, ${userName || 'Athlete'}!`,
      description: 'Your personal fitness companion designed to help you train smarter, track progress, and achieve your goals.'
    },
    {
      icon: <Activity size={48} className="text-[#a855f7]" />,
      title: 'Track Everything',
      description: 'Log workouts, monitor volume, track PRs, and visualize your progress with beautiful analytics.'
    },
    {
      icon: <Sparkles size={48} className="text-[#f59e0b]" />,
      title: 'AI-Powered Training',
      description: 'Get intelligent workout recommendations that adapt to your progress and help you break through plateaus.'
    },
    {
      icon: <Trophy size={48} className="text-[#ec4899]" />,
      title: 'Crush Your Goals',
      description: 'Set targets, earn achievements, and join challenges. Your fitness journey starts now!'
    }
  ];

  const currentStep = welcomeSteps[step];

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Progress Dots */}
      <div className="flex justify-center gap-2 pt-8 pb-4">
        {welcomeSteps.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === step 
                ? 'w-8 bg-gradient-to-r from-[#00d4ff] to-[#a855f7]' 
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-sm">
          {/* Animated Icon */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/10 animate-pulse">
            {currentStep.icon}
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            {currentStep.title}
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            {currentStep.description}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 pb-12 pt-6">
        {step < welcomeSteps.length - 1 ? (
          <div className="flex gap-4">
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-semibold py-4 rounded-xl"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight size={18} />
            </button>
            <button
              onClick={onComplete}
              className="w-full py-4 text-zinc-500 hover:text-white transition-colors"
            >
              Skip Tour
            </button>
          </div>
        )}

        {step < welcomeSteps.length - 1 && (
          <button
            onClick={() => setStep(step + 1)}
            className="w-full py-4 text-zinc-500 hover:text-white transition-colors mt-2"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
