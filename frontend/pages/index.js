import { useState, useEffect } from 'react';
import axios from 'axios';
import FloatingParticles from '../components/FloatingParticles';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Home() {
  const [formData, setFormData] = useState({
    userId: '',
    startTime: '',
    endTime: '',
    mediaFilePath: ''
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showSessions, setShowSessions] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionLogs, setSessionLogs] = useState(null);
  const [showLogs, setShowLogs] = useState(false);

  // Set default times on component mount
  useEffect(() => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    setFormData({
      userId: 'user_demo_' + Math.random().toString(36).substr(2, 9),
      startTime: oneHourAgo.toISOString().slice(0, 16),
      endTime: now.toISOString().slice(0, 16),
      mediaFilePath: '/demo/focus_session_recording.mp4'
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const result = await axios.post(`${API_BASE_URL}/api/focus-session`, formData, {
        headers: {
          'x-api-key': 'hackathon-demo-key-2024',
          'Content-Type': 'application/json'
        }
      });
      setResponse({
        type: 'success',
        data: result.data
      });

      // Refresh sessions list if visible
      if (showSessions) {
        fetchSessions();
      }
    } catch (error) {
      setResponse({
        type: 'error',
        data: error.response?.data || { message: 'Network error occurred' }
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const result = await axios.get(`${API_BASE_URL}/api/focus-session`, {
        headers: {
          'x-api-key': 'hackathon-demo-key-2024'
        }
      });
      setSessions(result.data.data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const toggleSessions = () => {
    if (!showSessions) {
      fetchSessions();
    }
    setShowSessions(!showSessions);
  };

    const generateRandomSession = () => {
    const now = new Date();
    const startTime = new Date(now.getTime() - Math.random() * 4 * 60 * 60 * 1000); // Random start within last 4 hours
    const endTime = new Date(startTime.getTime() + Math.random() * 3 * 60 * 60 * 1000); // Random duration up to 3 hours

    const mediaFiles = [
      '/recordings/focus_session_coding.mp4',
      '/recordings/team_meeting_recording.mp4',
      '/recordings/study_session.mp4',
      '/recordings/workout_session.mp4',
      '/recordings/creative_work.mp4'
    ];

    setFormData({
      userId: 'user_' + Math.random().toString(36).substr(2, 9),
      startTime: startTime.toISOString().slice(0, 16),
      endTime: endTime.toISOString().slice(0, 16),
      mediaFilePath: mediaFiles[Math.floor(Math.random() * mediaFiles.length)]
    });
  };

  const fetchSessionById = async (sessionId) => {
    try {
      const result = await axios.get(`${API_BASE_URL}/api/focus-session/${sessionId}`, {
        headers: {
          'x-api-key': 'hackathon-demo-key-2024'
        }
      });
      setSelectedSession(result.data.data);
    } catch (error) {
      console.error('Error fetching session by ID:', error);
    }
  };

  const fetchSessionLogs = async (sessionId) => {
    try {
      const result = await axios.get(`${API_BASE_URL}/api/focus-session/${sessionId}/logs`, {
        headers: {
          'x-api-key': 'hackathon-demo-key-2024'
        }
      });
      setSessionLogs(result.data.data);
      setShowLogs(true);
    } catch (error) {
      console.error('Error fetching session logs:', error);
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative">
      {/* Eden.pm Inspired Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-amber-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-gray-800 text-lg">Eden.pm</span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <span>Hackathon Challenge</span>
              <span>•</span>
              <span>Focus Tracking System</span>
              <span>•</span>
              <span className="text-amber-600 font-semibold">Live Demo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 fade-in mt-4">
          <div className="floating-animation">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 tracking-tight flex items-center justify-center gap-3">
              <span className="text-3xl">🌱</span>
              <span className="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                Eden Focus Tracker
              </span>
            </h1>
          </div>
          
          <p className="text-base text-gray-700 mb-4 font-medium leading-relaxed max-w-2xl mx-auto">
            Transform productivity with{' '}
            <span className="font-bold text-amber-700">intelligent session tracking</span>
            {' '}powered by Eden.pm technology
          </p>
          
          <div className="glass-effect rounded-xl p-3 inline-block scale-in">
            <div className="flex items-center justify-center space-x-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-gray-700 font-semibold text-sm">
                🌿 Eden.pm Hackathon Challenge • Enterprise-Grade Processing
              </p>
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="glass-effect rounded-2xl p-5 fade-in floating-animation">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="text-xl mr-2">📝</span>
                Create Focus Session
              </h2>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full pulse-success"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-gray-700 font-semibold text-sm flex items-center">
                  <span className="mr-2">👤</span>
                  User ID
                </label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 focus:outline-none input-focus backdrop-blur-sm"
                  placeholder="Enter your unique user ID"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-gray-700 font-semibold text-sm flex items-center">
                    <span className="mr-2">⏰</span>
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-white/80 text-gray-800 border border-gray-300 focus:border-green-500 focus:outline-none input-focus backdrop-blur-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-gray-700 font-semibold text-sm flex items-center">
                    <span className="mr-2">⏱️</span>
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg bg-white/80 text-gray-800 border border-gray-300 focus:border-red-500 focus:outline-none input-focus backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-gray-700 font-semibold text-sm flex items-center">
                  <span className="mr-2">🎬</span>
                  Media File Path
                </label>
                <input
                  type="text"
                  name="mediaFilePath"
                  value={formData.mediaFilePath}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-purple-500 focus:outline-none input-focus backdrop-blur-sm"
                  placeholder="/path/to/your/media/file.mp4"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center button-hover shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      <span className="loading-dots">Processing</span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🚀</span>
                      Create Session
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={generateRandomSession}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 button-hover shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">🎲</span>
                  Random
                </button>
              </div>
            </form>
          </div>

          {/* Response Section */}
          <div className="space-y-4">
            {/* API Response */}
            {response && (
              <div className="glass-effect rounded-2xl p-6 scale-in border-2 border-green-400/60 bg-green-50/40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-green-800 flex items-center">
                    {response.type === 'success' ? (
                      <>
                        <span className="text-2xl mr-2">✅</span>
                        <span className="text-green-800">Success!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl mr-2">❌</span>
                        <span className="text-red-800">Error</span>
                      </>
                    )}
                  </h3>
                  {response.type === 'success' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                      <span className="text-green-700 font-medium text-sm">Complete</span>
                    </div>
                  )}
                  <button
                    onClick={() => setResponse(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-md ml-4"
                  >
                    ✕
                  </button>
                </div>
                <div className="bg-white rounded-xl p-4 overflow-auto max-h-60 border-2 border-green-300 shadow-inner">
                  <pre className="text-xs text-green-800 whitespace-pre-wrap font-mono leading-relaxed">
                    {JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Sessions List */}
            <div className="glass-effect rounded-2xl p-5 fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                  <span className="text-xl mr-2">📊</span>
                  Recent Sessions
                  {showSessions && sessions.length > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {sessions.length}
                    </span>
                  )}
                </h3>
                <button
                  onClick={toggleSessions}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 button-hover shadow-lg flex items-center"
                >
                  <span className="mr-1">{showSessions ? '👁️‍🗨️' : '👁️'}</span>
                  {showSessions ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showSessions && (
                <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                  {sessions.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">📭</div>
                                          <p className="text-gray-600">No sessions found yet</p>
                    <p className="text-gray-500 text-sm mt-1">Create your first session above!</p>
                    </div>
                  ) : (
                    sessions.map((session, index) => (
                      <div 
                        key={session._id} 
                        className="bg-gradient-to-r from-black/20 to-black/15 rounded-lg p-3 border border-white/20 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">
                                {session.userId.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-gray-800 font-semibold text-sm">{session.userId}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold status-badge ${
                            session.processed 
                              ? 'bg-green-400 text-white pulse-success' 
                              : 'bg-yellow-400 text-black animate-pulse'
                          }`}>
                            {session.processed ? '✅ Done' : '⏳ Processing'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-gray-700 text-xs mb-2">
                          <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wide">Duration</p>
                            <p className="font-semibold">{session.sessionDuration} min</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs uppercase tracking-wide">Created</p>
                            <p className="font-semibold">{new Date(session.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => fetchSessionById(session._id)}
                            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs py-1 px-2 rounded transition-all duration-300"
                          >
                            📄 Details
                          </button>
                          <button
                            onClick={() => fetchSessionLogs(session._id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-2 rounded transition-all duration-300"
                          >
                            📋 Logs
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spacer to push API docs below the fold */}
        <div className="h-20"></div>

        {/* API Documentation - Complete endpoint showcase */}
        <div className="max-w-7xl mx-auto mt-12 mb-8">
          <div className="glass-effect rounded-3xl p-8 fade-in border-2 border-amber-200/50 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-3 flex items-center justify-center">
                <span className="text-3xl mr-3">🔧</span>
                Complete API Documentation
              </h3>
              <p className="text-gray-600 text-lg font-medium">
                Professional REST API • Production Ready • Enterprise-Grade
              </p>
              <div className="flex items-center justify-center mt-4 space-x-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  ✅ 6 Endpoints
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  🔐 API Key Protected
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                  ⚡ Live Processing
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-5 border-2 border-green-400 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-3">
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold mr-3">
                    POST
                  </div>
                  <h4 className="text-green-800 font-bold text-sm">/api/focus-session</h4>
                </div>
                <p className="text-green-700 text-sm mb-4">Create session with automated processing</p>
                <div className="bg-white rounded-lg p-3 border border-green-300 shadow-inner">
                  <code className="text-green-800 text-xs font-mono">
                    curl -X POST {API_BASE_URL}/api/focus-session
                  </code>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-5 border-2 border-blue-400 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold mr-3">
                    GET
                  </div>
                  <h4 className="text-blue-800 font-bold text-sm">/api/focus-session</h4>
                </div>
                <p className="text-blue-700 text-sm mb-4">Retrieve all sessions with metadata</p>
                <div className="bg-white rounded-lg p-3 border border-blue-300 shadow-inner">
                  <code className="text-blue-800 text-xs font-mono">
                    curl -H "x-api-key: demo-key" {API_BASE_URL}/api/focus-session
                  </code>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl p-5 border-2 border-purple-400 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold mr-3">
                    GET
                  </div>
                  <h4 className="text-purple-800 font-bold text-sm">/api/focus-session/:id</h4>
                </div>
                <p className="text-purple-700 text-sm mb-4">Get specific session details</p>
                <div className="bg-white rounded-lg p-3 border border-purple-300 shadow-inner">
                  <code className="text-purple-800 text-xs font-mono">
                    curl -H "x-api-key: demo-key" {API_BASE_URL}/api/focus-session/123
                  </code>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-5 border-2 border-amber-400 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-3">
                  <div className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold mr-3">
                    GET
                  </div>
                  <h4 className="text-amber-800 font-bold text-sm">/api/focus-session/:id/logs</h4>
                </div>
                <p className="text-amber-700 text-sm mb-4">Get detailed processing logs</p>
                <div className="bg-white rounded-lg p-3 border border-amber-300 shadow-inner">
                  <code className="text-amber-800 text-xs font-mono">
                    curl -H "x-api-key: demo-key" {API_BASE_URL}/api/focus-session/123/logs
                  </code>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-5 border-2 border-teal-400 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-3">
                  <div className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold mr-3">
                    GET
                  </div>
                  <h4 className="text-teal-800 font-bold text-sm">/api/health</h4>
                </div>
                <p className="text-teal-700 text-sm mb-4">Check API server status</p>
                <div className="bg-white rounded-lg p-3 border border-teal-300 shadow-inner">
                  <code className="text-teal-800 text-xs font-mono">
                    curl {API_BASE_URL}/api/health
                  </code>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl p-5 border-2 border-rose-400 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center mb-3">
                  <div className="bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-bold mr-3">
                    GET
                  </div>
                  <h4 className="text-rose-800 font-bold text-sm">/</h4>
                </div>
                <p className="text-rose-700 text-sm mb-4">API welcome & feature overview</p>
                <div className="bg-white rounded-lg p-3 border border-rose-300 shadow-inner">
                  <code className="text-rose-800 text-xs font-mono">
                    curl {API_BASE_URL}/
                  </code>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200 shadow-lg">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">🚀 API Features & Capabilities</h4>
                <p className="text-gray-600 text-lg">Built for scalability, security, and performance</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center bg-white rounded-xl p-6 shadow-md border border-amber-200 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-3">⚡</div>
                  <h5 className="text-gray-800 font-semibold text-base mb-2">Live Processing</h5>
                  <p className="text-gray-600 text-sm">FFmpeg simulation with real-time logs and progress tracking</p>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-md border border-blue-200 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-3">☁️</div>
                  <h5 className="text-gray-800 font-semibold text-base mb-2">Cloud Ready</h5>
                  <p className="text-gray-600 text-sm">MongoDB Atlas & AWS S3 integration with presigned URLs</p>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-md border border-green-200 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-3">🛡️</div>
                  <h5 className="text-gray-800 font-semibold text-base mb-2">Secure & Protected</h5>
                  <p className="text-gray-600 text-sm">API key authentication with rate limiting and error handling</p>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-md border border-purple-200 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-3">📊</div>
                  <h5 className="text-gray-800 font-semibold text-base mb-2">Analytics Ready</h5>
                  <p className="text-gray-600 text-sm">Detailed processing logs and comprehensive session tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Details Modal */}
        {selectedSession && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                             <div className="flex items-center justify-between mb-4">
                 <div>
                   <h3 className="text-xl font-bold text-gray-800">📄 Session Details</h3>
                   <p className="text-gray-600 text-sm">{selectedSession.userId}</p>
                   <div className="mt-2 bg-amber-50 px-3 py-1 rounded-lg inline-block">
                     <code className="text-amber-700 text-xs font-mono">GET /api/focus-session/{selectedSession._id}</code>
                   </div>
                 </div>
                                    <button
                     onClick={() => setSelectedSession(null)}
                     className="text-gray-500 hover:text-gray-800 text-2xl"
                   >
                     ×
                   </button>
               </div>
                             <div className="space-y-4 text-gray-800">
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="text-gray-600 text-sm">Session ID</p>
                     <p className="font-mono text-xs">{selectedSession._id}</p>
                   </div>
                   <div>
                     <p className="text-gray-600 text-sm">User ID</p>
                     <p className="font-semibold">{selectedSession.userId}</p>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="text-gray-600 text-sm">Duration</p>
                     <p className="font-semibold">{selectedSession.sessionDuration} minutes</p>
                   </div>
                   <div>
                     <p className="text-gray-600 text-sm">Status</p>
                     <span className={`px-2 py-1 rounded text-xs text-white ${selectedSession.processed ? 'bg-green-500' : 'bg-yellow-500'}`}>
                       {selectedSession.processed ? '✅ Processed' : '⏳ Processing'}
                     </span>
                   </div>
                 </div>
                 <div>
                   <p className="text-gray-600 text-sm">Media File Path</p>
                   <p className="font-mono text-sm bg-gray-100 p-2 rounded">{selectedSession.mediaFilePath}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="text-gray-600 text-sm">Created At</p>
                     <p className="text-sm">{new Date(selectedSession.createdAt).toLocaleString()}</p>
                   </div>
                   {selectedSession.processedAt && (
                     <div>
                       <p className="text-gray-600 text-sm">Processed At</p>
                       <p className="text-sm">{new Date(selectedSession.processedAt).toLocaleString()}</p>
                     </div>
                   )}
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Session Logs Modal */}
        {showLogs && sessionLogs && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                             <div className="flex items-center justify-between mb-4">
                 <div>
                   <h3 className="text-xl font-bold text-gray-800">📋 Processing Logs</h3>
                   <p className="text-gray-600 text-sm">{sessionLogs.userId}</p>
                   <div className="mt-2 bg-green-50 px-3 py-1 rounded-lg inline-block">
                     <code className="text-green-700 text-xs font-mono">GET /api/focus-session/{sessionLogs.sessionId}/logs</code>
                   </div>
                 </div>
                                    <button
                     onClick={() => setShowLogs(false)}
                     className="text-gray-500 hover:text-gray-800 text-2xl"
                   >
                     ×
                   </button>
               </div>
                             <div className="space-y-4 text-gray-800">
                 <div className="grid grid-cols-3 gap-4 text-sm">
                   <div>
                     <p className="text-gray-600">Processing Status</p>
                     <p className="font-semibold capitalize">{sessionLogs.processingStatus}</p>
                   </div>
                   <div>
                     <p className="text-gray-600">Processing Time</p>
                     <p className="font-semibold">{sessionLogs.totalProcessingTime}s</p>
                   </div>
                   <div>
                     <p className="text-gray-600">Log Count</p>
                     <p className="font-semibold">{sessionLogs.logCount} entries</p>
                   </div>
                 </div>
                 <div>
                   <p className="text-gray-600 text-sm mb-2">Detailed Processing Logs</p>
                   <div className="bg-gray-100 rounded-lg p-4 max-h-60 overflow-y-auto">
                     {sessionLogs.detailedLogs.map((log, index) => (
                       <div key={index} className="text-green-700 font-mono text-xs mb-1">
                         {index + 1}. {log}
                       </div>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
                     </div>
         )}

         {/* Eden.pm Inspired Footer */}
         <div className="mt-4 bg-white/90 backdrop-blur-sm border-t border-amber-200">
           <div className="container mx-auto px-4 py-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div>
                 <div className="flex items-center space-x-3 mb-4">
                   <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-500 rounded-lg flex items-center justify-center">
                     <span className="text-white font-bold text-sm">E</span>
                   </div>
                   <span className="font-bold text-gray-800 text-lg">Eden.pm</span>
                 </div>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Empowering productivity through intelligent automation and seamless workflow management.
                 </p>
               </div>
               
               <div>
                 <h4 className="font-semibold text-gray-800 mb-3">Challenge Features</h4>
                 <ul className="space-y-2 text-sm text-gray-600">
                   <li>🔧 RESTful API Design</li>
                   <li>🗄️ MongoDB Integration</li>
                   <li>🎬 FFmpeg Processing</li>
                   <li>☁️ AWS S3 Simulation</li>
                   <li>🔐 API Authentication</li>
                 </ul>
               </div>
               
               <div>
                 <h4 className="font-semibold text-gray-800 mb-3">Tech Stack</h4>
                 <ul className="space-y-2 text-sm text-gray-600">
                   <li>⚡ Node.js & Express</li>
                   <li>⚛️ Next.js & React</li>
                   <li>🍃 MongoDB Atlas</li>
                   <li>🎨 Tailwind CSS</li>
                   <li>🔧 RESTful API Design</li>
                 </ul>
               </div>
             </div>
             
             <div className="border-t border-amber-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
               <p className="text-gray-600 text-sm">
                 Built for Eden.pm Hackathon Challenge 2025
               </p>
               <div className="flex items-center space-x-4 mt-4 md:mt-0">
                 <span className="text-sm text-gray-500">Powered by</span>
                 <div className="flex items-center space-x-2">
                   <span className="text-2xl">🌱</span>
                   <span className="font-semibold text-amber-600">Eden Focus Tracker</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 } 