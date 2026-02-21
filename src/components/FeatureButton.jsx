import React from 'react';
import { Lock, Crown, Sparkles } from 'lucide-react';
import { useSubscription, FEATURES } from '../context/SubscriptionContext';

const FeatureButton = ({ 
  featureKey, 
  children, 
  className = '', 
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  ...props 
}) => {
  const { checkAccess, isFree, subscription } = useSubscription();
  
  const feature = FEATURES[featureKey];
  const hasAccess = feature ? checkAccess(featureKey) : true;
  const isPremiumFeature = feature && feature.tier !== 'free';
  
  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  // Variant styles
  const variantClasses = {
    primary: hasAccess 
      ? 'bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white hover:shadow-lg hover:shadow-[#00d4ff]/30' 
      : 'bg-gradient-to-r from-[#f59e0b]/80 to-[#fbbf24]/80 text-black hover:shadow-lg hover:shadow-[#f59e0b]/30',
    secondary: hasAccess
      ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
      : 'bg-[#f59e0b]/10 text-[#fbbf24] hover:bg-[#f59e0b]/20 border border-[#f59e0b]/30',
    outline: hasAccess
      ? 'bg-transparent border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff]/10'
      : 'bg-transparent border-2 border-[#f59e0b]/50 text-[#fbbf24] hover:bg-[#f59e0b]/10',
    ghost: 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5'
  };
  
  const handleClick = (e) => {
    if (disabled) return;
    
    // If it's a premium feature and user doesn't have access, 
    // the parent component should handle showing the upgrade modal
    // We just call onClick with a flag indicating access status
    if (onClick) {
      onClick(e, { hasAccess, feature, isPremiumFeature });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center gap-2 
        font-semibold rounded-xl transition-all duration-200
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {/* Lock icon for premium features when user is on free tier */}
      {isPremiumFeature && isFree && (
        <span className="flex items-center">
          <Lock size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} className="mr-1" />
        </span>
      )}
      
      {/* Crown icon for premium features when user has access */}
      {isPremiumFeature && !isFree && hasAccess && variant === 'primary' && (
        <Sparkles size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} className="mr-1" />
      )}
      
      {children}
    </button>
  );
};

// Compact lock badge for inline use
export const PremiumBadge = ({ tier = 'premium', size = 'sm' }) => {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };
  
  const tierColors = {
    premium: 'from-[#f59e0b] to-[#fbbf24] text-black',
    pro: 'from-[#a855f7] to-[#ec4899] text-white'
  };
  
  return (
    <span className={`
      inline-flex items-center gap-1 rounded-full font-bold
      bg-gradient-to-r ${tierColors[tier]}
      ${sizeClasses[size]}
    `}>
      <Crown size={size === 'sm' ? 10 : size === 'lg' ? 16 : 12} />
      {tier === 'premium' ? 'PREMIUM' : 'PRO'}
    </span>
  );
};

// Card overlay for premium-gated content
export const PremiumOverlay = ({ featureName, onUpgrade, children }) => {
  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="blur-sm opacity-50 pointer-events-none">
        {children}
      </div>
      
      {/* Upgrade CTA overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] flex items-center justify-center">
            <Crown size={32} className="text-black" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            {featureName}
          </h3>
          <p className="text-zinc-400 text-sm mb-4">
            Upgrade to Premium to unlock this feature
          </p>
          <FeatureButton
            featureKey={null}
            onClick={onUpgrade}
            variant="primary"
            size="md"
          >
            <Lock size={14} className="mr-1" />
            Unlock Now
          </FeatureButton>
        </div>
      </div>
    </div>
  );
};

export default FeatureButton;
