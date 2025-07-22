// API Key authentication middleware
const authenticate = (req, res, next) => {
  // Get API key from headers
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  // List of valid API keys (in production, these would be stored securely)
  const validApiKeys = [
    process.env.API_KEY || 'hackathon-demo-key-2024',
    'eden-pm-challenge-key',
    'focus-tracker-admin-key'
  ];
  
  // Check if API key is provided
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'API key required. Please provide x-api-key header or apiKey query parameter.',
      hint: 'For demo purposes, you can use: hackathon-demo-key-2024'
    });
  }
  
  // Validate API key
  if (!validApiKeys.includes(apiKey)) {
    return res.status(403).json({
      success: false,
      message: 'Invalid API key. Access denied.',
      providedKey: apiKey.substring(0, 8) + '...' // Show partial key for debugging
    });
  }
  
  // Log API usage for monitoring
  console.log(`🔐 API Access: ${apiKey.substring(0, 8)}... from ${req.ip}`);
  
  // Add API key info to request for potential logging
  req.apiKey = apiKey;
  req.isAuthenticated = true;
  
  next();
};

// Optional: Rate limiting per API key (basic implementation)
const rateLimitStore = new Map();

const rateLimit = (req, res, next) => {
  const apiKey = req.apiKey;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100; // Max 100 requests per 15 minutes per API key
  
  if (!rateLimitStore.has(apiKey)) {
    rateLimitStore.set(apiKey, { count: 1, resetTime: now + windowMs });
    return next();
  }
  
  const keyData = rateLimitStore.get(apiKey);
  
  if (now > keyData.resetTime) {
    // Reset the window
    rateLimitStore.set(apiKey, { count: 1, resetTime: now + windowMs });
    return next();
  }
  
  if (keyData.count >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil((keyData.resetTime - now) / 1000)
    });
  }
  
  // Increment count
  keyData.count += 1;
  rateLimitStore.set(apiKey, keyData);
  
  next();
};

module.exports = {
  authenticate,
  rateLimit
}; 