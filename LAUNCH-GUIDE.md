# GritFit App Launch Guide
## Payment Integration + App Store Setup

---

## PART 1: PAYMENT INTEGRATION

### Option A: Stripe (Recommended for Web/Mobile)

**Why Stripe:**
- ✅ Industry standard
- ✅ Easy integration
- ✅ Subscription billing built-in
- ✅ Apple Pay & Google Pay support
- ✅ $9.99/month pricing fits perfectly

**Setup Steps:**

**1. Create Stripe Account**
```
1. Go to stripe.com
2. Sign up with business email
3. Verify identity (SSN/EIN required)
4. Connect bank account for payouts
5. Complete business verification
```

**2. Get API Keys**
```
Dashboard → Developers → API Keys
- Publishable key (pk_live_...)
- Secret key (sk_live_...)
Save these securely
```

**3. Install Stripe SDK**
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

**4. Payment Component Code**
```jsx
// components/PaymentForm.jsx
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = ({ plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create payment intent
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: plan === 'monthly' ? 'price_monthly_id' : 'price_yearly_id'
      })
    });
    
    const { clientSecret } = await response.json();
    
    // Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { email: userEmail }
      }
    });
    
    if (result.error) {
      // Show error
    } else {
      // Success! Activate premium
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Subscribe ${plan === 'monthly' ? '9.99' : '79.99'}/mo</button>
    </form>
  );
};
```

**5. Backend API Route**
```javascript
// api/create-subscription.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { priceId } = req.body;
  
  // Create customer
  const customer = await stripe.customers.create({
    email: req.user.email
  });
  
  // Create subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent']
  });
  
  res.json({
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    subscriptionId: subscription.id
  });
};
```

**6. Pricing Setup in Stripe Dashboard**
```
Products → Add Product
- Name: GritFit Premium Monthly
- Price: $9.99 / month
- Billing: Recurring

Add Another:
- Name: GritFit Premium Yearly
- Price: $79.99 / year
- Billing: Recurring (save 33%)
```

---

### Option B: RevenueCat (Best for Mobile Subscriptions)

**Why RevenueCat:**
- ✅ Handles iOS, Android, and web in one place
- ✅ Built for subscription apps
- ✅ Analytics built-in
- ✅ Easier than native StoreKit/Google Billing

**Setup:**

**1. Create RevenueCat Account**
```
revenuecat.com
Connect Stripe, App Store, Play Store
```

**2. Install SDK**
```bash
npm install react-native-purchases
# or for web
npm install @revenuecat/purchases-js
```

**3. Initialize**
```javascript
import { Purchases } from '@revenuecat/purchases-js';

Purchases.configure({
  apiKey: 'your_revenuecat_api_key',
  appUserID: 'unique_user_id'
});
```

**4. Offerings & Packages**
```javascript
// Fetch available products
const offerings = await Purchases.getOfferings();
const monthly = offerings.current.monthly;
const yearly = offerings.current.annual;

// Purchase
const purchaseResult = await Purchases.purchasePackage(monthly);
```

---

## PART 2: APP STORE SETUP

### Apple App Store (iOS)

**Prerequisites:**
- ✅ Apple Developer Account ($99/year)
- ✅ Mac computer (required for submission)
- ✅ Xcode installed

**Setup Steps:**

**1. Enroll in Apple Developer Program**
```
developer.apple.com
- Enroll as Individual or Organization
- Pay $99/year
- Verify identity
- Wait 24-48 hours for approval
```

**2. Create App ID**
```
Developer Portal → Certificates, IDs & Profiles
→ Identifiers → App IDs → +
- Description: GritFit
- Bundle ID: com.americanarc.gritfit (unique)
- Capabilities: Push Notifications, In-App Purchase
```

**3. Create App Store Connect Record**
```
appstoreconnect.apple.com
→ My Apps → + → New App
- Platforms: iOS
- Name: GritFit (must be unique)
- Primary Language: English
- Bundle ID: com.americanarc.gritfit
- SKU: gritfit-001
- Full Access: Your account
```

**4. App Information**
```
Subtitle: "Track workouts, build muscle, stay consistent"
Category: Health & Fitness
Secondary Category: Lifestyle
Content Rights: No
Age Rating: 12+ (mild profanity in user content)
```

**5. Pricing & Availability**
```
Price: Free (in-app purchases for Premium)
Availability: All countries or select markets
```

**6. App Privacy Details**
```
Data Collection:
- Health & Fitness: YES (workout data)
- Contact Info: YES (email for account)
- User Content: YES (photos if they use progress pics)
- Identifiers: YES (user ID)

Privacy Policy URL: (create at gritfit.app/privacy)
```

**7. Screenshots (Required)**
```
iPhone 6.7" Display (1290 x 2796): 3-5 screenshots
iPhone 6.5" Display (1284 x 2778): 3-5 screenshots
iPhone 5.5" Display (1242 x 2208): 3-5 screenshots
iPad Pro (2048 x 2732): 3-5 screenshots if supporting iPad

Use Figma or Screenshot Studio to create
Show: Dashboard, Workout tracking, Progress, Achievements
```

**8. Build & Upload**
```bash
# In Xcode
1. Product → Archive
2. Distribute App → App Store Connect
3. Upload
4. Wait for processing (30 mins - 2 hours)
```

**9. Submit for Review**
```
App Store Connect → App → + Version or Platform
- Version: 1.0
- What's New: "Initial release"
- Attach screenshots
- Select build
- Submit for Review

Review Time: 24-48 hours typically
```

---

### Google Play Store (Android)

**Prerequisites:**
- ✅ Google Play Developer Account ($25 one-time)
- ✅ Google account

**Setup Steps:**

**1. Create Developer Account**
```
play.google.com/console
- Pay $25 one-time fee
- Complete account verification
- Wait 24-48 hours
```

**2. Create App**
```
Play Console → Create App
- App Name: GritFit
- Default Language: English
- App or Game: App
- Free or Paid: Free
- Declarations: Complete all
```

**3. Store Listing**
```
App Details:
- Short Description (80 chars): 
  "Track workouts, hit PRs, build your best physique"
  
- Full Description (4000 chars):
  "GritFit is the ultimate workout tracker for serious lifters...
  
  • Track workouts with precision
  • Log sets, reps, weight, RPE
  • Progress photos & measurements
  • Achievements & streaks
  • Plate calculator
  • Exercise library
  
  Premium Features:
  • Unlimited workouts
  • Advanced analytics
  • Cloud backup
  • No ads
  
  Join thousands of lifters crushing their goals with GritFit."

- App Icon: 512 x 512 PNG
- Feature Graphic: 1024 x 500 PNG
- Phone Screenshots: 3-8 screenshots
- Tablet Screenshots: Optional
```

**4. Content Rating**
```
Play Console → Content Rating
- Category: Health & Fitness
- Questionnaire: Answer honestly
- Result: PEGI 3 or ESRB E (everyone)
```

**5. Pricing & Distribution**
```
- Free with in-app purchases
- Countries: Select all or specific
- Content guidelines: Accept
- US export laws: Accept
```

**6. App Content**
```
- Privacy Policy: Add URL (required)
- Ads: No (or yes if adding later)
- App access: All functionality available
- Data safety: Fill out form
  - Data collected: Health data, email, photos
  - Data shared: None
  - Security: Encrypted
```

**7. Production Release**
```
Play Console → Production → Create Release
- Upload AAB (Android App Bundle)
  # Build with:
  npm run build:android
  
- Release name: 1.0
- Release notes: "Initial release of GritFit"
- Review & Rollout

Review Time: 1-3 days
```

---

## PART 3: BUSINESS SETUP REQUIRED

Before launching, you need:

### 1. Business Entity
**Options:**
- LLC (recommended for liability protection)
- Sole Proprietorship (simpler, less protection)

**Action:**
- File LLC via ZenBusiness ($125)
- Get EIN from IRS (free)
- Open business bank account

### 2. Privacy Policy
**Required by both Apple and Google**

**Generate at:**
- iubenda.com ($27/year)
- privacypolicygenerator.info (free)
- termsfeed.com (free)

**Must include:**
- What data you collect
- How you use it
- How you protect it
- Contact information

### 3. Terms of Service
**Generate at:**
- termsfeed.com
- iubenda.com

### 4. Business Address
**Options:**
- Your home address
- Virtual mailbox ($10-20/month)
- Registered agent service

### 5. Support Email
```
support@gritfit.app
or
support@americanarc.app
```

---

## PART 4: TECHNICAL CHECKLIST

### Backend Requirements

**1. Server/Hosting**
```
Options:
- Vercel (free tier, scales automatically)
- AWS (more control, more complex)
- Firebase (Google ecosystem)
- DigitalOcean ($5/month droplet)

Recommendation: Vercel for MVP
```

**2. Database**
```
Options:
- PostgreSQL (via Supabase - free tier)
- MongoDB Atlas (free tier)
- Firebase Firestore (pay as you go)

Recommendation: Supabase PostgreSQL
```

**3. Authentication**
```
Options:
- Supabase Auth (free, built-in)
- Firebase Auth (free tier)
- Auth0 (free up to 7,500 users)

Recommendation: Supabase Auth
```

**4. Environment Variables**
```
# .env
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...
REVENUECAT_API_KEY=...
```

### Mobile-Specific Setup

**iOS:**
```
1. Capacitor/Cordova for native wrapper
   npm install @capacitor/core @capacitor/ios
   npx cap add ios
   
2. Configure for App Store
   - Bundle identifier
   - Signing certificates
   - Provisioning profiles
   
3. Enable capabilities:
   - Push Notifications
   - In-App Purchase
   - Camera (for progress photos)
```

**Android:**
```
1. Add Android platform
   npx cap add android
   
2. Configure:
   - Application ID: com.americanarc.gritfit
   - Signing keystore (required for Play Store)
   
3. Enable permissions:
   - CAMERA (progress photos)
   - INTERNET
   - STORAGE (save photos locally)
```

---

## PART 5: LAUNCH TIMELINE

### Week 1: Foundation
- [ ] File LLC
- [ ] Get EIN
- [ ] Open business bank account
- [ ] Set up Stripe account
- [ ] Create privacy policy & terms

### Week 2: Development
- [ ] Integrate Stripe payments
- [ ] Set up Supabase backend
- [ ] Add authentication
- [ ] Test subscription flow

### Week 3: App Store Prep
- [ ] Create Apple Developer account ($99)
- [ ] Create Google Play account ($25)
- [ ] Design screenshots
- [ ] Write app descriptions
- [ ] Prepare app icons

### Week 4: Submission
- [ ] Build iOS app
- [ ] Build Android app
- [ ] Submit to App Store
- [ ] Submit to Play Store
- [ ] Wait for review

### Week 5: Launch
- [ ] Apps approved
- [ ] Marketing push
- [ ] Monitor for bugs
- [ ] Collect feedback

---

## PART 6: COSTS SUMMARY

| Item | Cost | Notes |
|------|------|-------|
| Apple Developer | $99/year | Required for iOS |
| Google Play | $25 one-time | Required for Android |
| Stripe | 2.9% + $0.30/transaction | Per sale |
| RevenueCat | Free up to $10k/mo, then 1% | Optional |
| LLC Filing | $125 | ZenBusiness |
| EIN | Free | IRS |
| Domain | $12/year | Namecheap |
| Privacy Policy | $27/year | iubenda |
| Hosting | Free-$20/mo | Vercel/Supabase |
| **Total Upfront** | **~$300** | One-time + annual |

---

## PART 7: POST-LAUNCH

### Analytics Setup
```
- Mixpanel (user behavior)
- Amplitude (funnels)
- Firebase Analytics (free)
- RevenueCat (subscription metrics)
```

### Customer Support
```
- Crisp.chat (free live chat)
- HelpScout ($20/mo for team)
- Email support initially
```

### Marketing
```
- Instagram account
- TikTok for workout content
- Reddit r/bodybuilding, r/powerlifting
- YouTube shorts
```

---

**Ready to start? Which part first?**
1. File LLC and business setup
2. Stripe payment integration code
3. App store accounts and submission
4. All at once (aggressive timeline)
