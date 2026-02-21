import React, { useState, useEffect } from 'react';
import { X, Crown, Lock, Sparkles, ChevronRight, Check } from 'lucide-react';
import { useSubscription, PRICING, SUBSCRIPTION_TIERS } from '../context/SubscriptionContext';

const PremiumGate = ({ 
  isOpen, 
  onClose, 
  featureName, 
  featureDescription, 
  featureIcon: FeatureIcon,
  onUpgrade 
}) => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [isAnimating, setIsAnimating] = useState(false);
  const { startTrial, PRICING } = useSubscription();

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade(selectedPlan);
    }
    onClose();
  };

  const handleStartTrial = () => {
    startTrial(7);
    onClose();
  };

  const pricing = PRICING[SUBSCRIPTION_TIERS.PREMIUM];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className={`relative w-full max-w-md bg-[#12121a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
          isAnimating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-[#00d4ff]/20 via-[#a855f7]/20 to-[#ec4899]/20 p-6 text-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all"
          >
            <X size={20} />
          </button>

          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-black text-xs font-bold mb-4">
            <Crown size={14} />
            PREMIUM FEATURE
          </div>

          {/* Feature icon */}
          {FeatureIcon && (
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center shadow-lg shadow-[#00d4ff]/30">
              <FeatureIcon size={40} className="text-white" />
            </div>
          )}

          <h2 className="text-2xl font-bold text-white mb-2">
            {featureName || 'Premium Feature'}
          </h2>
          <p className="text-zinc-300 text-sm">
            {featureDescription || 'Upgrade to Premium to unlock this powerful feature and more!'}
          </p>
        </div>

        {/* Pricing plans */}
        <div className="p-6">
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Choose your plan
          </p>

          {/* Yearly plan (recommended) */}
          <button
            onClick={() => setSelectedPlan('yearly')}
            className={`w-full p-4 rounded-2xl border-2 transition-all mb-3 relative ${
              selectedPlan === 'yearly'
                ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-[#10b981] to-[#00d4ff] rounded-full text-xs font-bold text-black">
              BEST VALUE - Save {pricing.yearlyDiscount}%
            </div>
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-bold text-white">Yearly</p>
                <p className="text-zinc-400 text-sm">${pricing.yearly}/year</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedPlan === 'yearly' ? 'border-[#00d4ff] bg-[#00d4ff]' : 'border-zinc-500'
              }`}>
                {selectedPlan === 'yearly' && <Check size={14} className="text-black" />}
              </div>
            </div>
            <p className="text-xs text-[#10b981] mt-2 text-left">
              Just ${(pricing.yearly / 12).toFixed(2)}/month
            </p>
          </button>

          {/* Monthly plan */}
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`w-full p-4 rounded-2xl border-2 transition-all ${
              selectedPlan === 'monthly'
                ? 'border-[#00d4ff] bg-[#00d4ff]/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-bold text-white">Monthly</p>
                <p className="text-zinc-400 text-sm">${pricing.monthly}/month</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedPlan === 'monthly' ? 'border-[#00d4ff] bg-[#00d4ff]' : 'border-zinc-500'
              }`}>
                {selectedPlan === 'monthly' && <Check size={14} className="text-black" />}
              </div>
            </div>
          </button>
        </div>

        {/* Feature list */}
        <div className="px-6 pb-4">
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Premium includes
          </p>
          <div className="grid grid-cols-2 gap-2">
            {pricing.features.slice(0, 6).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                  <Check size={10} className="text-[#10b981]" />
                </div>
                <span className="text-zinc-300 text-xs">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="p-6 pt-2 space-y-3">
          <button
            onClick={handleUpgrade}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all active:scale-[0.98]"
          >
            <Sparkles size={20} />
            Upgrade Now
            <ChevronRight size={20} />
          </button>

          <button
            onClick={handleStartTrial}
            className="w-full py-3 rounded-2xl bg-white/5 text-zinc-300 font-medium text-sm hover:bg-white/10 transition-all"
          >
            Start 7-Day Free Trial
          </button>

          <p className="text-center text-zinc-500 text-xs">
            Cancel anytime. No commitment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumGate;
