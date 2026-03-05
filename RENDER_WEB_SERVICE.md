# 🚀 Deploy to Render Web Service

## Quick Deploy (5 Minutes)

### Step 1: Push to GitHub
```bash
cd c:\s6
git add .
git commit -m "Add Web Service support"
git push origin main
```

### Step 2: Deploy on Render

1. **Go to**: https://render.com
2. **Sign in** with GitHub
3. **Click**: "New +" → **"Web Service"**
4. **Connect Repository**: `student_success_prediction_system`

### Step 3: Configure

| Setting | Value |
|---------|-------|
| **Name** | `student-success-system` |
| **Environment** | `Node` |
| **Branch** | `main` |
| **Root Directory** | (leave empty) |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait 2-3 minutes
3. Your app is live! 🎉

---

## Your Live URL

```
https://student-success-system.onrender.com
```

---

## Important Notes

✅ **Free Tier**: 750 hours/month free
⚠️ **Spins Down**: Inactive apps sleep after 15 min
⏱️ **Wake Up**: First request takes 30-60 seconds
✅ **Auto Deploy**: GitHub pushes auto-deploy

---

## Test Your Site

1. Visit your Render URL
2. Wait 30-60 seconds on first load (waking up)
3. Login: `teacher1` / `teacher123`
4. Test all features

---

## Keep It Awake (Optional)

Use a free service like UptimeRobot to ping your site every 5 minutes:
- https://uptimerobot.com
- Add your Render URL
- Keeps app awake 24/7

---

**Done! Your app is live on Render Web Service!** 🎉
