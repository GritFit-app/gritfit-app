# GritFit Deployment Instructions

## GitHub + Vercel Setup

I've initialized the git repository. Now you need to complete these steps:

---

## STEP 1: Create GitHub Repository

**Option A: Via Web (Easiest)**
1. Go to github.com
2. Click "+" → "New repository"
3. Name: `gritfit-app`
4. Description: "Modern fitness tracking app for bodybuilding, powerlifting, and strongman"
5. Public or Private (your choice)
6. **DON'T** initialize with README (we have one)
7. Click "Create repository"

**Option B: Via GitHub CLI**
```bash
# Install GitHub CLI if not installed
# Then:
gh repo create gritfit-app --public --source=. --push
```

---

## STEP 2: Push Code to GitHub

**Run these commands in the gritfit-app folder:**

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit - GritFit v1.0"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/gritfit-app.git

# Push
git branch -M main
git push -u origin main
```

---

## STEP 3: Connect to Vercel

**Option A: Via Vercel Dashboard (Easiest)**
1. Go to vercel.com
2. Sign up/login (can use GitHub)
3. Click "Add New Project"
4. Import from GitHub
5. Select `gritfit-app` repository
6. Framework Preset: Vite
7. Build Command: `npm run build`
8. Output Directory: `dist`
9. Click "Deploy"

**Option B: Via Vercel CLI**
```bash
npx vercel
# Follow prompts
# Connect to GitHub when asked
```

---

## STEP 4: Your Live URL

After deployment, you'll get:
```
https://gritfit-app.vercel.app
```

Or:
```
https://gritfit-app-YOURNAME.vercel.app
```

**Share this link with beta testers!**

---

## STEP 5: Auto-Deploy Setup

Once connected, every time you push to GitHub:
```bash
git add .
git commit -m "Update feature X"
git push
```

Vercel will automatically:
- Build the app
- Deploy new version
- Update the URL

---

## QUICK CHECKLIST

- [ ] Create GitHub repo at github.com
- [ ] Push code (commands above)
- [ ] Connect to Vercel
- [ ] Get live URL
- [ ] Share with beta testers

---

## TROUBLESHOOTING

**Error: "Repository not found"**
- Make sure GitHub repo is created first
- Check the URL matches your username/repo

**Error: "Permission denied"**
- You need to login to GitHub
- Run: `git config --global user.email "you@example.com"`
- Run: `git config --global user.name "Your Name"`

**Vercel build fails**
- Check package.json has "build": "vite build"
- Check vite.config.js exists
- Make sure all dependencies installed

---

## NEXT STEPS AFTER DEPLOYMENT

1. **Test the live URL yourself**
   - Log a workout
   - Check all features work

2. **Share with 3 friends**
   - Text them the link
   - Ask for feedback

3. **Fix any issues**
   - Edit code locally
   - `git add . && git commit -m "fix" && git push`
   - Vercel auto-updates

4. **Recruit more beta testers**
   - Post on Reddit
   - Instagram story
   - Gym flyer

---

**Ready? Start with Step 1: Create GitHub repo at github.com**

Need help with any step? Let me know!
