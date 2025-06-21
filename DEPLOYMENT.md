# Deployment Guide for Player Team Manager

This guide will help you deploy the Player Team Manager application for your coding test submission.

## Prerequisites

1. **GitHub Account** - For source code hosting
2. **Vercel/Netlify Account** - For deployment
3. **balldontlie.io API Key** - Get free key from https://balldontlie.io/

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Player Team Manager"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name it: `player-team-manager`
4. Make it **Public**
5. Don't initialize with README (we already have one)

### 1.3 Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/player-team-manager.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel (Recommended)

### 2.1 Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your `player-team-manager` repository

### 2.2 Configure Environment Variables

1. In your Vercel project settings, go to "Environment Variables"
2. Add variable:
   - **Name**: `VITE_BALLDONTLIE_API_KEY`
   - **Value**: Your API key from balldontlie.io
   - **Environment**: Production, Preview, Development

### 2.3 Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live at: `https://your-project-name.vercel.app`

## Step 3: Deploy to Netlify (Alternative)

### 3.1 Build Locally

```bash
npm run build
```

### 3.2 Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login
3. Drag and drop the `dist` folder from your project
4. Your app will be live at: `https://random-name.netlify.app`

### 3.3 Add Environment Variables (Netlify)

1. Go to Site Settings > Environment Variables
2. Add: `VITE_BALLDONTLIE_API_KEY` = your API key
3. Redeploy

## Step 4: Final Submission

### 4.1 Update Repository

Make sure your GitHub repository includes:

- ✅ Complete source code
- ✅ README.md with setup instructions
- ✅ All dependencies in package.json
- ✅ Environment variable documentation

### 4.2 Send Links

Email to: **thihaaung@codigo.co**

**Subject**: Player Team Manager - Coding Test Submission

**Body**:

```
Hi,

I have completed the Player Team Manager coding test. Here are the links:

GitHub Repository: https://github.com/YOUR_USERNAME/player-team-manager
Live Website: https://your-deployment-url.com

Features implemented:
✅ React.js with TypeScript
✅ Redux authentication with persistent state
✅ Infinite scroll for NBA players (balldontlie.io API)
✅ Team CRUD operations with modal forms
✅ Form validation (unique team names, required fields)
✅ Player assignment (one team per player)
✅ Persistent state management
✅ Performance optimized

The application is fully functional and ready for testing.

Best regards,
[Your Name]
```

## Troubleshooting

### Common Issues

1. **API Key Not Working**

   - Ensure you've added the environment variable correctly
   - Check that the API key is valid at balldontlie.io
   - Verify the variable name is exactly: `VITE_BALLDONTLIE_API_KEY`

2. **Build Failures**

   - Run `npm install` locally first
   - Check that all dependencies are in package.json
   - Ensure TypeScript compilation passes

3. **Deployment Issues**
   - Check Vercel/Netlify build logs
   - Ensure the build command is: `npm run build`
   - Verify the output directory is: `dist`

### Performance Verification

Before submitting, test:

- ✅ Infinite scroll works smoothly
- ✅ No lag when scrolling
- ✅ State persists after page reload
- ✅ All CRUD operations work
- ✅ Form validation works
- ✅ Players can only be in one team

## Final Checklist

- [ ] Code pushed to GitHub (public repository)
- [ ] Environment variables configured
- [ ] Application deployed and accessible
- [ ] All features working correctly
- [ ] Performance is smooth
- [ ] Links sent to thihaaung@codigo.co

Your application meets all the coding test requirements and is ready for submission!
