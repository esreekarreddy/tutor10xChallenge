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

### **Test 4: Get Session Logs (NEW FEATURE)**
```bash
# First get a session ID from the previous command, then:
curl -H "x-api-key: hackathon-demo-key-2024" http://localhost:3001/api/focus-session/SESSION_ID_HERE/logs
```

### **Test 5: Test API Key Protection**
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

## 🔧 **Step 4: Advanced Testing with Postman**

### **Import Collection**
Create a Postman collection with these requests:

### **Request 1: Health Check**
- **Method**: GET
- **URL**: `http://localhost:3001/api/health`

### **Request 2: Create Session**
- **Method**: POST
- **URL**: `http://localhost:3001/api/focus-session`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
```json
{
  "userId": "postman_test",
  "startTime": "2024-01-22T09:00:00Z",
  "endTime": "2024-01-22T10:00:00Z",
  "mediaFilePath": "/postman/test_recording.mp4"
}
```

### **Request 3: Get Sessions**
- **Method**: GET  
- **URL**: `http://localhost:3001/api/focus-session`

### **Request 4: Get Session by ID**
- **Method**: GET
- **URL**: `http://localhost:3001/api/focus-session/SESSION_ID_HERE`

---

## 🎬 **Step 5: Watch the Magic Happen**

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

- [ ] Backend starts and connects to MongoDB Atlas
- [ ] Frontend loads beautiful interface
- [ ] Health check API responds correctly
- [ ] Can create session via API (curl/Postman)
- [ ] Can create session via web interface
- [ ] Sessions appear in MongoDB Atlas
- [ ] Processing logs show in terminal
- [ ] Session history displays on frontend
- [ ] All responses include proper JSON format
- [ ] No errors in browser console

---

**🎉 If all tests pass, your hackathon project is ready to impress the judges!** 