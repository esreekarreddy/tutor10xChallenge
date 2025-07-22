const express = require('express');
const router = express.Router();
const FocusSession = require('../models/FocusSession');
const { simulateMediaProcessing, simulateCloudUpload } = require('../middleware/processing');
const { authenticate, rateLimit } = require('../middleware/auth');

// POST /api/focus-session - Create new focus session (protected)
router.post('/', authenticate, rateLimit, async (req, res) => {
  try {
    const { userId, startTime, endTime, mediaFilePath } = req.body;

    // Validate required fields
    if (!userId || !startTime || !endTime || !mediaFilePath) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, startTime, endTime, mediaFilePath'
      });
    }

    // Validate time logic
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'End time must be after start time'
      });
    }

    // Create session document
    const session = new FocusSession({
      userId,
      startTime: start,
      endTime: end,
      mediaFilePath
    });

    // Save initial session
    await session.save();
    console.log(`📝 Created new focus session: ${session._id}`);

    // Start media processing simulation (async)
    const processingResult = await simulateMediaProcessing(session);
    
    // Update session with processing results
    session.processed = true;
    session.processedAt = processingResult.processedAt;
    session.processingLogs = processingResult.logs;
    await session.save();

    // Simulate cloud upload
    const uploadResult = await simulateCloudUpload(session._id, processingResult.outputFiles);

    console.log(`🎉 Session ${session._id} fully processed and uploaded`);

    // Return success response
    res.status(201).json({
      success: true,
      sessionId: session._id,
      message: 'Focus session logged and media processed successfully',
      data: {
        userId: session.userId,
        duration: session.sessionDuration,
        processed: session.processed,
        processedAt: session.processedAt,
        cloudUrls: uploadResult.cloudUrls
      }
    });

  } catch (error) {
    console.error('Error creating focus session:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/focus-session - Get all sessions for a user (protected)
router.get('/', authenticate, async (req, res) => {
  try {
    const { userId } = req.query;
    
    const filter = userId ? { userId } : {};
    const sessions = await FocusSession.find(filter)
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 sessions

    res.json({
      success: true,
      count: sessions.length,
      data: sessions
    });

  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/focus-session/:id - Get specific session (protected)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const session = await FocusSession.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    res.json({
      success: true,
      data: session
    });

  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/focus-session/:id/logs - Get detailed processing logs for a session (protected)
router.get('/:id/logs', authenticate, async (req, res) => {
  try {
    const session = await FocusSession.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Enhanced logs with additional metadata
    const enhancedLogs = {
      sessionId: session._id,
      userId: session.userId,
      mediaFilePath: session.mediaFilePath,
      processingStatus: session.processed ? 'completed' : 'pending',
      processingStarted: session.createdAt,
      processingCompleted: session.processedAt,
      totalProcessingTime: session.processedAt ? 
        Math.round((session.processedAt - session.createdAt) / 1000) : null,
      sessionDuration: session.sessionDuration,
      detailedLogs: session.processingLogs,
      logCount: session.processingLogs.length,
      lastUpdated: session.updatedAt || session.createdAt
    };

    res.json({
      success: true,
      message: 'Processing logs retrieved successfully',
      data: enhancedLogs
    });

  } catch (error) {
    console.error('Error fetching session logs:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router; 