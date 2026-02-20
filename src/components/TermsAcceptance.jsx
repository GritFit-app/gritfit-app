import React, { useState } from 'react';
import { Check, FileText, Shield, ChevronRight } from 'lucide-react';

const TermsAcceptance = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  if (showTerms) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] z-50 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => setShowTerms(false)}
              className="text-zinc-400 hover:text-white"
            >
              ← Back
            </button>
            <h2 className="text-xl font-bold text-white">Terms of Service</h2>
          </div>
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="text-zinc-300 space-y-4 text-sm leading-relaxed">
              <h3 className="text-white font-bold text-lg">1. Acceptance of Terms</h3>
              <p>By accessing or using GritFit, you agree to be bound by these Terms of Service. If you do not agree to these Terms, you may not use the App.</p>
              
              <h3 className="text-white font-bold text-lg">2. Health Disclaimer</h3>
              <p className="text-yellow-400">IMPORTANT: GritFit is a fitness tracking tool, not a medical device. Consult a physician before starting any exercise program. We are not responsible for any injuries resulting from use of the App.</p>
              
              <h3 className="text-white font-bold text-lg">3. User Accounts</h3>
              <p>You must be at least 13 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials.</p>
              
              <h3 className="text-white font-bold text-lg">4. Data and Privacy</h3>
              <p>We collect workout data, account information, and usage analytics. See our Privacy Policy for complete details.</p>
              
              <h3 className="text-white font-bold text-lg">5. Subscriptions</h3>
              <p>Premium subscriptions are $9.99/month or $79.99/year. Payments processed through Stripe. Cancel anytime.</p>
              
              <p className="text-zinc-500 mt-8">Full Terms of Service available at gritfit.app/terms</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPrivacy) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0f] z-50 overflow-y-auto">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => setShowPrivacy(false)}
              className="text-zinc-400 hover:text-white"
            >
              ← Back
            </button>
            <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
          </div>
          <div className="text-zinc-300 space-y-4 text-sm leading-relaxed">
            <h3 className="text-white font-bold text-lg">Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account:</strong> Email, username, password</li>
              <li><strong>Fitness Data:</strong> Workouts, weights, reps, progress photos</li>
              <li><strong>Usage:</strong> Feature usage, device info, crash reports</li>
            </ul>
            
            <h3 className="text-white font-bold text-lg">How We Use Your Data</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide workout tracking and AI recommendations</li>
              <li>Calculate training analytics and progress</li>
              <li>Send important account notifications</li>
              <li>Improve app features and performance</li>
            </ul>
            
            <h3 className="text-white font-bold text-lg">Data Security</h3>
            <p>We use industry-standard SSL/TLS encryption. Free users' data is stored locally. Premium users' data is encrypted and backed up to secure servers.</p>
            
            <h3 className="text-white font-bold text-lg">Your Rights</h3>
            <p>You can view, export, or delete your data at any time. We never sell your data to third parties.</p>
            
            <p className="text-zinc-500 mt-8">Full Privacy Policy available at gritfit.app/privacy</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a0f] z-50 flex items-center justify-center p-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] flex items-center justify-center">
            <Shield size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Before You Start</h2>
          <p className="text-zinc-400">Please review and accept our terms to create your account</p>
        </div>

        <div className="space-y-4 mb-8">
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

        <div className="space-y-4">
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
              I agree to the Terms of Service and Privacy Policy
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
            Continue
          </button>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-6">
          By creating an account, you acknowledge you are 13+ years old
        </p>
      </div>
    </div>
  );
};

export default TermsAcceptance;
