# Environment Variables for Deployment

## 🚀 Render (Backend Server)

### Build and Start Commands:
```bash
# Build Command:
cd backend && npm install

# Start Command:
cd backend && npm start
```

### Environment Variables to Set in Render Dashboard:

```bash
# Server Configuration
NODE_ENV=production
PORT=5000

# Base URL (REPLACE WITH YOUR ACTUAL RENDER SERVICE URL)
BASE_URL=https://your-actual-render-url.onrender.com

# Frontend URL for CORS (REPLACE WITH YOUR ACTUAL NETLIFY URL)
FRONTEND_URL=https://your-actual-netlify-url.netlify.app

# Firebase Service Account (Optional - for user management)
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"your-project-id",...}
```

### Render Service Configuration:
1. **Service Type**: Web Service
2. **Build Command**: `cd backend && npm install`
3. **Start Command**: `cd backend && npm start`
4. **Environment**: Node
5. **Node Version**: 18.x or higher

### How to Set in Render:
1. Go to your Render service dashboard
2. Navigate to "Environment" tab
3. Add each variable with its value
4. Update build/start commands in "Settings"
5. Deploy the service

---

## 🌐 Netlify (Frontend)

### Build and Deploy Commands:
```bash
# Build Command:
npm run build

# Publish Directory:
dist

# Node Version:
18.x
```

### Environment Variables to Set in Netlify:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyCAbXN9unFCNvTO2HtxFdgZkTA9NMcjJUo
VITE_FIREBASE_AUTH_DOMAIN=diety-204b0.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=diety-204b0
VITE_FIREBASE_STORAGE_BUCKET=diety-204b0.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1071397904810
VITE_FIREBASE_APP_ID=1:1071397904810:web:7c157fa97c81ba3f104bd3

# Backend API URL (REPLACE WITH YOUR ACTUAL RENDER SERVICE URL)
VITE_BACKEND_URL=https://your-actual-render-url.onrender.com
```

### How to Set in Netlify:
1. Go to your Netlify site dashboard
2. Navigate to "Site settings" → "Build & deploy"
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Navigate to "Environment variables" and add each variable
6. Redeploy the site

---

## 📋 Current Configuration Files

### Your `.env` file (for local development):
```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyCAbXN9unFCNvTO2HtxFdgZkTA9NMcjJUo
VITE_FIREBASE_AUTH_DOMAIN=diety-204b0.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=diety-204b0
VITE_FIREBASE_STORAGE_BUCKET=diety-204b0.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1071397904810
VITE_FIREBASE_APP_ID=1:1071397904810:web:7c157fa97c81ba3f104bd3

# Backend API Configuration
VITE_BACKEND_URL=https://savedieties.onrender.com
```

### Backend `.env` (for local backend development):
```bash
PORT=5000
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🔧 Deployment URLs

### Current Setup:
- **Frontend (Netlify)**: `https://savediety.netlify.app`
- **Backend (Render)**: `https://savedieties.onrender.com`

### ⚠️ IMPORTANT: Update Your Actual Render Service URL

Once you deploy to Render, you'll get a service URL like:
- `https://your-service-name-xxxx.onrender.com`

**You MUST update this URL in the following places:**

#### 1. **Environment Variables (.env file)**:
```bash
# Update this with your actual Render URL
VITE_BACKEND_URL=https://your-actual-render-url.onrender.com
```

#### 2. **Render Environment Variables**:
```bash
# Set this in Render dashboard
BASE_URL=https://your-actual-render-url.onrender.com
```

#### 3. **Netlify Environment Variables**:
```bash
# Set this in Netlify dashboard
VITE_BACKEND_URL=https://your-actual-render-url.onrender.com
```

#### 4. **Backend CORS Configuration** (if needed):
Update `backend/server.js` CORS origins to include your actual URL.

### How to Find Your Render Service URL:
1. Go to your Render dashboard
2. Click on your service
3. Copy the URL from the service overview (looks like `https://service-name-xxxx.onrender.com`)
4. Replace `https://savedieties.onrender.com` with your actual URL everywhere

### CORS Configuration:
The backend is configured to accept requests from:
- `http://localhost:3000` (local React)
- `http://localhost:5173` (local Vite)
- `http://localhost:8081` (local alternative)
- `https://savediety.netlify.app` (production frontend)
- `https://savedeities1.netlify.app` (alternative domain)
- `https://savedieties.onrender.com` (backend itself)

---

## ⚠️ Important Notes:

### For Render:
- Environment variables are set in the Render dashboard
- The service automatically restarts when env vars change
- `PORT` is automatically set by Render (usually 10000)
- Use the exact service URL from your Render dashboard

### For Netlify:
- All frontend env vars must start with `VITE_`
- Variables are available at build time only
- Site rebuilds automatically when env vars change
- Use your actual Netlify site URL

### Security:
- Never commit `.env` files to version control
- Firebase config is safe to expose (it's client-side)
- Keep service account keys secure (backend only)

---

## 🚀 Quick Setup Commands:

### Render Environment Variables (via CLI):
```bash
# Set via Render dashboard - CLI not recommended for env vars
```

### Netlify Environment Variables (via CLI):
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and set variables
netlify login
netlify env:set VITE_FIREBASE_API_KEY "AIzaSyCAbXN9unFCNvTO2HtxFdgZkTA9NMcjJUo"
netlify env:set VITE_BACKEND_URL "https://savedieties.onrender.com"
# ... repeat for all variables
```

---

## 🔍 Verification:

### Check if variables are working:
1. **Frontend**: Open browser console and check `import.meta.env`
2. **Backend**: Add `console.log(process.env.BASE_URL)` in your server
3. **Network**: Check if API calls are going to correct URLs