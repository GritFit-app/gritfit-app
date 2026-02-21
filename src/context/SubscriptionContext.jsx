import React, { createContext, useContext, useState, useEffect } from 'react';

const SubscriptionContext = createContext();

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  PREMIUM: 'premium',
  PRO: 'pro'
};

export const FEATURES = {
  // Free features
  BASIC_WORKOUTS: { tier: SUBSCRIPTION_TIERS.FREE, name: 'Basic Workouts' },
  REST_TIMER: { tier: SUBSCRIPTION_TIERS.FREE, name: 'Rest Timer' },
  BASIC_PLATE_CALC: { tier: SUBSCRIPTION_TIERS.FREE, name: 'Basic Plate Calculator' },
  EXERCISE_LIBRARY: { tier: SUBSCRIPTION_TIERS.FREE, name: 'Exercise Library' },
  
  // Premium features
  BODYBUILDING: { tier: SUBSCRIPTION_TIERS.PREMIUM, name: 'Bodybuilding Pro' },
  POWERLIFTING: { tier: SUBSCRIPTION_TIERS.PREMIUM, name: 'Powerlifting Suite' },
  STRONGMAN: { tier: SUBSCRIPTION_TIERS.PREMIUM, name: 'Strongman Training' },
  GYM_BUDDY: { tier: SUBSCRIPTION_TIERS.PREMIUM, name: 'Gym Buddy Mode' },
  AI_FORM_COACH: { tier: SUBSCRIPTION_TIERS.PREMIUM, name: 'AI Form Coach' },
  GYM_HEAT_MAP: { tier: SUBSCRIPTION_TIERS.PREMIUM, name: 'Gym Location Heat Map' },
  GRIT_SCORE: { tier: SUBSCRIPTION_TIERS.PREMIUM, name: 'The Grit Score' },
  PLATE_MATH_SCANNER: { tier: SUBSCRIPTION_TIERS.PREMIUM, name: 'Plate Math Photo Scanner' },
  PROGRESS_PHOTOS: { tier: SUBSCRIPTION_TIERS.PREMIUM, name: 'Progress Photos' },
  ADVANCED_ANALYTICS: { tier: SUBSCRIPTION_TIERS.PREMIUM, name: 'Advanced Analytics' },
  
  // Pro features
  CUSTOM_PROGRAMMING: { tier: SUBSCRIPTION_TIERS.PRO, name: 'Custom Programming' },
  PRIORITY_SUPPORT: { tier: SUBSCRIPTION_TIERS.PRO, name: 'Priority Support' },
};

export const PRICING = {
  [SUBSCRIPTION_TIERS.PREMIUM]: {
    monthly: 9.99,
    yearly: 79.99,
    yearlyDiscount: 33,
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
  [SUBSCRIPTION_TIERS.PRO]: {
    monthly: 19.99,
    yearly: 149.99,
    yearlyDiscount: 37,
    features: [
      'Everything in Premium',
      'Custom Programming',
      '1-on-1 Coaching Access',
      'Priority Support',
      'Early Access to Features',
      'Exclusive Content'
    ]
  }
};

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState({
    tier: SUBSCRIPTION_TIERS.FREE,
    isPremium: false,
    isPro: false,
    expiresAt: null,
    trialEndsAt: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load subscription from localStorage on mount
  useEffect(() => {
    const loadSubscription = () => {
      try {
        const stored = localStorage.getItem('gritfit_subscription');
        if (stored) {
          const parsed = JSON.parse(stored);
          // Check if subscription is still valid
          if (parsed.expiresAt && new Date(parsed.expiresAt) > new Date()) {
            setSubscription({
              ...parsed,
              isPremium: parsed.tier === SUBSCRIPTION_TIERS.PREMIUM || parsed.tier === SUBSCRIPTION_TIERS.PRO,
              isPro: parsed.tier === SUBSCRIPTION_TIERS.PRO
            });
          } else {
            // Reset to free if expired
            resetToFree();
          }
        }
      } catch (error) {
        console.error('Error loading subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscription();
  }, []);

  const resetToFree = () => {
    const freeSub = {
      tier: SUBSCRIPTION_TIERS.FREE,
      isPremium: false,
      isPro: false,
      expiresAt: null,
      trialEndsAt: null
    };
    setSubscription(freeSub);
    localStorage.setItem('gritfit_subscription', JSON.stringify(freeSub));
  };

  const upgradeToPremium = (plan = 'monthly') => {
    const expiresAt = new Date();
    if (plan === 'yearly') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    const newSubscription = {
      tier: SUBSCRIPTION_TIERS.PREMIUM,
      isPremium: true,
      isPro: false,
      plan,
      expiresAt: expiresAt.toISOString(),
      upgradedAt: new Date().toISOString()
    };

    setSubscription(newSubscription);
    localStorage.setItem('gritfit_subscription', JSON.stringify(newSubscription));
    
    // Track upgrade event
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: `upgrade_${Date.now()}`,
        value: PRICING[SUBSCRIPTION_TIERS.PREMIUM][plan],
        currency: 'USD',
        items: [{
          item_name: 'GritFit Premium',
          item_id: `premium_${plan}`,
          price: PRICING[SUBSCRIPTION_TIERS.PREMIUM][plan],
          quantity: 1
        }]
      });
    }
  };

  const upgradeToPro = (plan = 'monthly') => {
    const expiresAt = new Date();
    if (plan === 'yearly') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    const newSubscription = {
      tier: SUBSCRIPTION_TIERS.PRO,
      isPremium: true,
      isPro: true,
      plan,
      expiresAt: expiresAt.toISOString(),
      upgradedAt: new Date().toISOString()
    };

    setSubscription(newSubscription);
    localStorage.setItem('gritfit_subscription', JSON.stringify(newSubscription));
  };

  const startTrial = (days = 7) => {
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + days);

    const newSubscription = {
      tier: SUBSCRIPTION_TIERS.PREMIUM,
      isPremium: true,
      isPro: false,
      isTrial: true,
      trialEndsAt: trialEndsAt.toISOString(),
      upgradedAt: new Date().toISOString()
    };

    setSubscription(newSubscription);
    localStorage.setItem('gritfit_subscription', JSON.stringify(newSubscription));
  };

  const cancelSubscription = () => {
    resetToFree();
  };

  const checkAccess = (featureKey) => {
    const feature = FEATURES[featureKey];
    if (!feature) return false;

    if (feature.tier === SUBSCRIPTION_TIERS.FREE) return true;
    if (feature.tier === SUBSCRIPTION_TIERS.PREMIUM) return subscription.isPremium;
    if (feature.tier === SUBSCRIPTION_TIERS.PRO) return subscription.isPro;
    
    return false;
  };

  const value = {
    subscription,
    isPremium: subscription.isPremium,
    isPro: subscription.isPro,
    isFree: subscription.tier === SUBSCRIPTION_TIERS.FREE,
    isLoading,
    upgradeToPremium,
    upgradeToPro,
    startTrial,
    cancelSubscription,
    checkAccess,
    FEATURES,
    PRICING,
    SUBSCRIPTION_TIERS
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export default SubscriptionContext;
