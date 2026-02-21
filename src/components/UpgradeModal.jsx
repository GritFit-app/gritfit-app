import React, { useState } from 'react';
import { X, Crown, Check, Sparkles, Zap, Star, ChevronRight } from 'lucide-react';
import { useSubscription, PRICING, SUBSCRIPTION_TIERS } from '../context/SubscriptionContext';

const UpgradeModal = ({ isOpen, onClose, highlightFeature = null }) => {
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [selectedTier, setSelectedTier] = useState(SUBSCRIPTION_TIERS.PREMIUM);
  const [isProcessing, setIsProcessing] = useState(false);
  const { upgradeToPremium, upgradeToPro, startTrial } = useSubscription();

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (selectedTier === SUBSCRIPTION_TIERS.PREMIUM) {
      upgradeToPremium(billingCycle);
    } else {
      upgradeToPro(billingCycle);
    }
    
    setIsProcessing(false);
    onClose();
  };

  const handleTrial = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    startTrial(7);
    setIsProcessing(false);
    onClose();
  };

  const plans = [
    {
      tier: SUBSCRIPTION_TIERS.PREMIUM,
      name: 'Premium',
      icon: Crown,
      color: 'from-[#f59e0b] to-[#fbbf24]',
      shadowColor: 'shadow-[#f59e0b]/30',
      description: 'Everything you need to level up your training',
      price: {
        monthly: 9.99,
        yearly: 79.99
      },
      savings: 33,
      features: [
        'All 3 Training Disciplines',
        'AI Form Coach',
        'Gym Buddy Mode',
        'Gym Heat Map',
        'Grit Score Tracking',
        'Plate Math Scanner',
        'Progress Photos',
        'Advanced Analytics',
        'No Ads'
      ]
    },
    {
      tier: SUBSCRIPTION_TIERS.PRO,
      name: 'Pro',
      icon: Zap,
      color: 'from-[#a855f7] to-[#ec4899]',
      shadowColor: 'shadow-[#a855f7]/30',
      description: 'For serious athletes who want it all',
      price: {
        monthly: 19.99,
        yearly: 149.99
      },
      savings: 37,
      features: [
        'Everything in Premium',
        'Custom Programming',
        '1-on-1 Coaching Access',
        'Priority Support',
        'Early Access to Features',
        'Exclusive Content',
        'Advanced AI Insights'
      ],
      popular: true
    }
  ];

  const currentPlan = plans.find(p => p.tier === selectedTier);
  const monthlyEquivalent = billingCycle === 'yearly' 
    ? (currentPlan.price.yearly / 12).toFixed(2)
    : currentPlan.price.monthly;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-[#12121a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#00d4ff]/10 via-[#a855f7]/10 to-[#ec4899]/10 p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-black text-xs font-bold mb-4">
            <Sparkles size={14} />
            UNLOCK YOUR POTENTIAL
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Upgrade to <span className="gradient-text">Premium</span>
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Join thousands of athletes who've transformed their training with GritFit Premium
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center p-6">
          <div className="inline-flex bg-white/5 rounded-full p-1 border border-white/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 bg-[#10b981] text-white text-[10px] rounded-full">
                Save {currentPlan.savings}%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="px-6 pb-6 grid md:grid-cols-2 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedTier === plan.tier;
            const price = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly;
            
            return (
              <div
                key={plan.tier}
                onClick={() => setSelectedTier(plan.tier)}
                className={`relative rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#00d4ff] bg-[#00d4ff]/5'
                    : 'border-white/10 hover:border-white/20 bg-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-full text-xs font-bold text-white">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-6">
                  {/* Plan header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center ${plan.shadowColor} shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <p className="text-zinc-400 text-sm">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">${price}</span>
                      <span className="text-zinc-500">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-[#10b981] text-sm">
                        ${(price / 12).toFixed(2)}/month billed annually
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-[#10b981]" />
                        </div>
                        <span className="text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Selection indicator */}
                  <div className={`mt-6 py-3 rounded-xl text-center font-semibold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white'
                      : 'bg-white/10 text-zinc-400'
                  }`}>
                    {isSelected ? 'Selected' : 'Select Plan'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="px-6 pb-6 space-y-4">
          <button
            onClick={handleUpgrade}
            disabled={isProcessing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#00d4ff]/30 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles size={20} />
                Upgrade Now - ${billingCycle === 'yearly' ? currentPlan.price.yearly : currentPlan.price.monthly}
                <ChevronRight size={20} />
              </>
            )}
          </button>

          <button
            onClick={handleTrial}
            disabled={isProcessing}
            className="w-full py-3 rounded-2xl bg-white/5 text-zinc-300 font-medium hover:bg-white/10 transition-all"
          >
            Start 7-Day Free Trial
          </button>

          <p className="text-center text-zinc-500 text-xs">
            Cancel anytime. No commitment required. 
            <br />
            By upgrading, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Trust badges */}
        <div className="px-6 pb-8 pt-2 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-6 text-zinc-500 text-xs">
            <span className="flex items-center gap-1">
              <Check size={12} className="text-[#10b981]" />
              Secure Payment
            </span>
            <span className="flex items-center gap-1">
              <Check size={12} className="text-[#10b981]" />
              Cancel Anytime
            </span>
            <span className="flex items-center gap-1">
              <Check size={12} className="text-[#10b981]" />
              30-Day Money Back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
