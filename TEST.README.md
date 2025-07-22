# 🧪 **Complete Testing Guide for Focus Session Tracker**

This guide will help you test both the **backend API** and **frontend demo** step by step.

---

## 🚀 **Step 1: Start Both Servers**

### **Backend Server (Port 3001)**
```bash
# Open Terminal 1
cd backend
npm run dev
```
**✅ You should see:**
```
✅ MongoDB Atlas Connected: ac-kzb1wow-shard-00-00.z16t3v6.mongodb.net
📊 Database: focusTracker
🚀 Server running on port 3001
📱 API Health: http://localhost:3001/api/health
```

### **Frontend Server (Port 3000)**
```bash
# Open Terminal 2
cd frontend
npm run dev
```
**✅ You should see:**
```
▲ Next.js 14.0.3
- Local:        http://localhost:3000
✓ Ready in 1513ms
```

---

## 🎯 **Step 2: Test Backend API First**

### **Test 1: Health Check**
```bash
curl http://localhost:3001/api/health
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Focus Session Tracker API is running!",
  "timestamp": "2024-01-22T15:30:00.000Z",
  "version": "1.0.0"
}
```

### **Test 2: Create a Focus Session (with API Key)**
```bash
curl -X POST http://localhost:3001/api/focus-session \
  -H "Content-Type: application/json" \
  -H "x-api-key: hackathon-demo-key-2024" \
  -d '{
    "userId": "test_user_123",
    "startTime": "2024-01-22T10:00:00Z",
    "endTime": "2024-01-22T11:30:00Z",
    "mediaFilePath": "/demo/hackathon_session.mp4"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "sessionId": "65b8f1234567890abcdef123",
  "message": "Focus session logged and media processed successfully",
  "data": {
    "userId": "test_user_123",
    "duration": 90,
    "processed": true,
    "processedAt": "2024-01-22T11:31:00.000Z",
    "cloudUrls": {
      "compressed": "https://cdn.example.com/compressed/65b8f1234567890abcdef123",
      "audio": "https://cdn.example.com/audio/65b8f1234567890abcdef123"
    }
  }
}
```

### **Test 3: Get All Sessions (with API Key)**
```bash
curl -H "x-api-key: hackathon-demo-key-2024" http://localhost:3001/api/focus-session
```

### **Test 4: Get Specific Session by ID**
```bash
# Use a session ID from the previous command:
curl -H "x-api-key: hackathon-demo-key-2024" http://localhost:3001/api/focus-session/687f1f36838c1dea16d3b7f1
```

### **Test 5: Get Session Processing Logs (NEW FEATURE)**
```bash
# Get detailed processing logs for a session:
curl -H "x-api-key: hackathon-demo-key-2024" http://localhost:3001/api/focus-session/687f1f36838c1dea16d3b7f1/logs
```

### **Test 6: API Welcome & Features**
```bash
# Check API welcome message and feature list:
curl http://localhost:3001/
```

### **Test 7: Test API Key Protection**
```bash
# This should return 401 - Unauthorized
curl http://localhost:3001/api/focus-session

# This should work with proper key
curl -H "x-api-key: hackathon-demo-key-2024" http://localhost:3001/api/focus-session
```

**Expected Response:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65b8f1234567890abcdef123",
      "userId": "test_user_123",
      "startTime": "2024-01-22T10:00:00.000Z",
      "endTime": "2024-01-22T11:30:00.000Z",
      "mediaFilePath": "/demo/hackathon_session.mp4",
      "processed": true,
      "sessionDuration": 90,
      "createdAt": "2024-01-22T11:30:00.000Z"
    }
  ]
}
```

---

## 🎨 **Step 3: Test Frontend Demo**

### **Open the Web Interface**
1. Go to: **http://localhost:3000**
2. You should see a beautiful purple gradient interface

### **Test the Form**
1. **Check Pre-filled Data**: The form should have demo data already filled
2. **User ID**: Should show something like `user_demo_abc123`
3. **Start/End Times**: Should show recent times
4. **Media Path**: Should show `/demo/focus_session_recording.mp4`

### **Create a Session via Web**
1. Click **"🚀 Create Session"** button
2. **Watch for Loading**: You should see "Processing..." with spinner
3. **Check Response**: Green success box should appear with JSON data
4. **Verify Processing**: Look for `"processed": true` in response

### **Test Random Data**
1. Click **"🎲 Random"** button
2. Form should fill with new random data
3. Submit and test again

### **View Sessions History**
1. Click **"Show"** button in "Recent Sessions" section
2. You should see your created sessions listed
3. Each session should show:
   - User ID
   - "Processed" status badge (green)
   - Duration in minutes
   - Creation timestamp

---

## 🔧 **Step 4: Complete Postman Collection Setup**

### **📋 All API Endpoints You Should Have:**

Based on your current Postman setup, here are **ALL 6 endpoints** you should add:

### **✅ Request 1: API Welcome & Info**
- **Method**: `GET`
- **URL**: `http://localhost:3001/`
- **Headers**: None needed (public endpoint)
- **Description**: Shows API welcome message and features

### **✅ Request 2: Health Check**
- **Method**: `GET`
- **URL**: `http://localhost:3001/api/health`
- **Headers**: None needed (public endpoint)
- **Description**: Check if API server is running

### **✅ Request 3: Create New Focus Session**
- **Method**: `POST`
- **URL**: `http://localhost:3001/api/focus-session`
- **Headers**: 
  - `Content-Type: application/json`
  - `x-api-key: hackathon-demo-key-2024`
- **Body** (raw JSON):
```json
{
  "userId": "postman_user_demo",
  "startTime": "2024-07-22T10:00:00Z",
  "endTime": "2024-07-22T11:30:00Z",
  "mediaFilePath": "/postman/demo_recording.mp4"
}
```

### **✅ Request 4: Get All Focus Sessions**
- **Method**: `GET`
- **URL**: `http://localhost:3001/api/focus-session`
- **Headers**: 
  - `x-api-key: hackathon-demo-key-2024`
- **Description**: Retrieve all sessions with metadata

### **✅ Request 5: Get Specific Session by ID**
- **Method**: `GET`
- **URL**: `http://localhost:3001/api/focus-session/687f1f36838c1dea16d3b7f1`
- **Headers**: 
  - `x-api-key: hackathon-demo-key-2024`
- **Description**: Get detailed information about one session
- **Note**: Replace `687f1f36838c1dea16d3b7f1` with actual session ID from previous requests

### **✅ Request 6: Get Session Processing Logs (NEW!)**
- **Method**: `GET`
- **URL**: `http://localhost:3001/api/focus-session/687f1f36838c1dea16d3b7f1/logs`
- **Headers**: 
  - `x-api-key: hackathon-demo-key-2024`
- **Description**: Get detailed processing logs and metadata for a session
- **Note**: Replace `687f1f36838c1dea16d3b7f1` with actual session ID

### **🚨 Request 7: Test Authentication (Should Fail)**
- **Method**: `GET`
- **URL**: `http://localhost:3001/api/focus-session`
- **Headers**: None (no API key)
- **Description**: This should return 401 Unauthorized to test security
- **Expected Response**: 
```json
{
  "success": false,
  "message": "API key required. Please provide x-api-key header or apiKey query parameter.",
  "hint": "For demo purposes, you can use: hackathon-demo-key-2024"
}
```

---

## 📝 **Step-by-Step Postman Setup Guide**

### **Step 1: Create New Collection**
1. Open Postman
2. Click "New" → "Collection"
3. Name it: `Eden Focus Tracker API`
4. Add description: `Complete API testing for Eden.pm Hackathon Challenge`

### **Step 2: Add All 7 Requests**

**For each request above:**
1. Click "Add Request" in your collection
2. Set the Method (GET/POST)
3. Enter the URL
4. Add Headers in "Headers" tab
5. For POST request, add Body in "Body" tab → "raw" → "JSON"

### **Step 3: Set Up Environment Variables (Optional but Pro)**
1. Create new Environment: `Eden Focus Tracker Local`
2. Add variables:
   - `base_url`: `http://localhost:3001`
   - `api_key`: `hackathon-demo-key-2024`
3. Use `{{base_url}}` and `{{api_key}}` in requests

### **Step 4: Test in Order**
1. **API Welcome** → Should show features list
2. **Health Check** → Should return success
3. **Create Session** → Should return session ID (save this!)
4. **Get All Sessions** → Should show your created session
5. **Get Session by ID** → Use ID from step 3
6. **Get Session Logs** → Use same ID to see processing details
7. **Test Auth** → Should fail with 401

---

---

## 📊 **Step 5: Expected Postman Responses**

### **Response 1: API Welcome (GET /)**
```json
{
  "message": "Welcome to Focus Session Tracker API",
  "version": "2.0.0",
  "features": ["FFmpeg Processing", "AWS S3 Simulation", "API Key Auth", "Rate Limiting"],
  "endpoints": {
    "health": "GET /api/health (public)",
    "createSession": "POST /api/focus-session (protected)",
    "getSessions": "GET /api/focus-session (protected)",
    "getSession": "GET /api/focus-session/:id (protected)",
    "getSessionLogs": "GET /api/focus-session/:id/logs (protected)"
  },
  "authentication": {
    "method": "API Key",
    "header": "x-api-key",
    "demoKey": "hackathon-demo-key-2024"
  }
}
```

### **Response 3: Create Session (POST /api/focus-session)**
```json
{
  "success": true,
  "sessionId": "687f1f36838c1dea16d3b7f1",
  "message": "Focus session logged and media processed successfully",
  "data": {
    "userId": "postman_user_demo",
    "sessionDuration": 90,
    "processed": true,
    "processedAt": "2024-07-22T11:35:42.123Z",
    "s3Data": {
      "bucket": "focus-tracker-media-bucket",
      "region": "us-east-1",
      "uploadResults": {
        "compressed": {
          "key": "687f1f36838c1dea16d3b7f1/compressed_demo_recording.mp4",
          "url": "https://focus-tracker-media-bucket.s3.us-east-1.amazonaws.com/...",
          "size": 45000000,
          "contentType": "video/mp4"
        },
        "audio": {
          "key": "687f1f36838c1dea16d3b7f1/audio_demo_recording.mp3",
          "url": "https://focus-tracker-media-bucket.s3.us-east-1.amazonaws.com/...",
          "size": 3500000,
          "contentType": "audio/mpeg"
        }
      }
    }
  }
}
```

### **Response 6: Session Logs (GET /api/focus-session/:id/logs)**
```json
{
  "success": true,
  "message": "Processing logs retrieved successfully",
  "data": {
    "sessionId": "687f1f36838c1dea16d3b7f1",
    "userId": "postman_user_demo",
    "processingStatus": "completed",
    "totalProcessingTime": 3,
    "sessionDuration": 90,
    "detailedLogs": [
      "📁 Analyzing media file: /postman/demo_recording.mp4",
      "🎬 Starting FFmpeg compression process...",
      "⚡ Compressing video with H.264 codec...",
      "🎵 Extracting audio track to MP3 format...",
      "✅ Media processing completed successfully",
      "☁️ Uploading to AWS S3 bucket: focus-tracker-media-bucket",
      "📦 Upload completed with presigned URLs"
    ],
    "logCount": 7
  }
}
```

---

## 🎬 **Step 6: Watch the Magic Happen**

### **What to Look For:**

1. **In Terminal (Backend Logs):**
```
📝 Created new focus session: 65b8f1234567890abcdef123
🎬 Starting media processing for session 65b8f1234567890abcdef123
✅ Media processing completed for session 65b8f1234567890abcdef123
☁️ Simulating cloud upload for session 65b8f1234567890abcdef123
✅ Cloud upload simulation completed for session 65b8f1234567890abcdef123
🎉 Session 65b8f1234567890abcdef123 fully processed and uploaded
```

2. **In MongoDB Atlas Dashboard:**
   - Go to your MongoDB Atlas cluster
   - Browse Collections
   - You should see `focusTracker` database
   - With `focussessions` collection
   - Containing your session documents

---

## ✅ **Expected Results Summary**

### **✅ Backend Working If:**
- Health check returns success
- POST creates session and returns ID
- GET retrieves session list
- MongoDB shows saved data
- Console shows processing logs

### **✅ Frontend Working If:**
- Page loads with purple gradient
- Form pre-fills with demo data
- Submit button works and shows loading
- Success response appears in green box
- Sessions list shows created sessions

### **✅ Full System Working If:**
- Both servers start without errors
- API responses match expected format
- Frontend communicates with backend
- Data persists in MongoDB Atlas
- Processing simulation completes

---

## 🚨 **Common Issues & Fixes**

### **Issue: "Network error occurred"**
- **Fix**: Check if backend is running on port 3001
- **Fix**: Verify .env file has correct MongoDB connection

### **Issue: Frontend shows port 5000 in API calls**
- **Fix**: Restart frontend server after .env changes
- **Fix**: Check browser console for actual error

### **Issue: MongoDB connection fails**
- **Fix**: Check MongoDB Atlas IP whitelist
- **Fix**: Verify connection string in .env file

### **Issue: Processing doesn't complete**
- **Fix**: Check backend terminal for error logs
- **Fix**: Ensure MongoDB write permissions

---

## 🏆 **Perfect Demo Checklist**

### **✅ Backend API Testing (Postman)**
- [ ] Backend starts and connects to MongoDB Atlas
- [ ] Health check API responds correctly (`GET /api/health`)
- [ ] API Welcome shows all features (`GET /`)
- [ ] Can create session via Postman (`POST /api/focus-session`)
- [ ] Can get all sessions (`GET /api/focus-session`)
- [ ] Can get specific session by ID (`GET /api/focus-session/:id`)
- [ ] Can get session processing logs (`GET /api/focus-session/:id/logs`)
- [ ] Authentication protection works (401 without API key)
- [ ] All responses include proper JSON format

### **✅ Frontend Web Demo Testing**
- [ ] Frontend loads beautiful Eden.pm interface
- [ ] Can create session via web interface
- [ ] Session history displays correctly
- [ ] Sessions count is accurate (shows all entries)
- [ ] Details and Logs buttons work
- [ ] Success responses are clearly visible
- [ ] No errors in browser console

### **✅ Database & Integration**
- [ ] Sessions appear in MongoDB Atlas
- [ ] Processing logs show in terminal
- [ ] Session count matches between frontend/backend/database
- [ ] All processing simulation completes successfully

### **📱 Complete Postman Collection URLs**
```
1. GET  http://localhost:3001/
2. GET  http://localhost:3001/api/health
3. POST http://localhost:3001/api/focus-session (with API key + body)
4. GET  http://localhost:3001/api/focus-session (with API key)
5. GET  http://localhost:3001/api/focus-session/SESSION_ID (with API key)
6. GET  http://localhost:3001/api/focus-session/SESSION_ID/logs (with API key)
7. GET  http://localhost:3001/api/focus-session (without API key - should fail)
```

---

**🎉 If all tests pass, your hackathon project is ready to impress the judges!** 