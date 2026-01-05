# 🌐 Alternative Tunnel Setup - Two Tunnels (Frontend + Backend)

If the single-tunnel approach (using Vite proxy) doesn't work with your tunnel service, you can use **two tunnels** - one for the frontend and one for the backend.

## ✅ Solution Overview

Instead of using a Vite proxy, you'll:
- Create a tunnel for the **frontend** (port 5173)
- Create a tunnel for the **backend** (port 8000)
- Configure the frontend to use the backend tunnel URL directly

## 🚀 Setup Steps

### 1. Update your `.env` file

When using two tunnels, you need to set `VITE_BACKEND_URL` to your backend tunnel URL:

```env
DATABASE_URL=postgresql://your_user:your_password@your_host:5432/your_database
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173

# For tunneling with TWO tunnels: Set VITE_BACKEND_URL to your backend tunnel URL
# Example for Cloudflare: https://backend-random-name.trycloudflare.com
# Example for ngrok: https://abc123.ngrok.io
VITE_BACKEND_URL=https://your-backend-tunnel-url-here
VITE_FRONTEND_URL=http://localhost:5173
```

### 2. Start your backend

```bash
cd backend/app
uvicorn main:app --reload --port 8000
```

### 3. Start your frontend

```bash
cd frontend
npm run dev
```

### 4. Create TWO tunnels

**Option A: Using Cloudflare Tunnel (Recommended)**

Terminal 1 - Frontend tunnel:
```bash
cloudflared tunnel --url http://localhost:5173
```
Note the URL (e.g., `https://frontend-random-name.trycloudflare.com`)

Terminal 2 - Backend tunnel:
```bash
cloudflared tunnel --url http://localhost:8000
```
Note the URL (e.g., `https://backend-random-name.trycloudflare.com`)

**Option B: Using ngrok**

Terminal 1 - Frontend tunnel:
```bash
ngrok http 5173
```
Note the URL (e.g., `https://abc123.ngrok.io`)

Terminal 2 - Backend tunnel:
```bash
ngrok http 8000
```
Note the URL (e.g., `https://xyz789.ngrok.io`)

### 5. Update `.env` with backend tunnel URL

After starting the backend tunnel, update your `.env` file:

```env
VITE_BACKEND_URL=https://your-backend-tunnel-url-here
```

**Important**: Restart the Vite dev server after updating `.env`:
```bash
# Stop the frontend (Ctrl+C)
# Then restart:
cd frontend
npm run dev
```

### 6. Share the frontend tunnel URL

Share the **frontend tunnel URL** with your friend:
- **Cloudflare Tunnel**: `https://frontend-random-name.trycloudflare.com`
- **ngrok**: `https://abc123.ngrok.io`

The frontend will automatically use the backend tunnel URL (from `VITE_BACKEND_URL`) to make API calls.

## 🔧 How It Works

1. **Two Tunnels**: Frontend and backend are exposed through separate tunnels
2. **Direct API Calls**: Frontend uses the full backend tunnel URL (from `VITE_BACKEND_URL`) to make API calls
3. **No Proxy Needed**: This approach bypasses the Vite proxy, so it works with any tunnel service

## 📝 Notes

- ⚠️ Requires **two tunnels** (one for frontend, one for backend)
- ✅ Works with any tunnel service (Cloudflare, ngrok, etc.)
- ✅ More reliable than the single-tunnel proxy approach
- ⚠️ Backend tunnel URL changes each time you restart the tunnel
- ⚠️ Remember to update `VITE_BACKEND_URL` and restart the frontend when the backend tunnel URL changes

## 🐛 Troubleshooting

If API calls fail:
1. Make sure both tunnels are running
2. Verify `VITE_BACKEND_URL` is set to the correct backend tunnel URL
3. Restart the Vite dev server after changing `VITE_BACKEND_URL`
4. Check that CORS is configured to allow all origins (already done in `backend/app/main.py`)

