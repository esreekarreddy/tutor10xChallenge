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

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingParticles />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <div className="floating-animation">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              <span className="inline-block text-3xl">🎯</span>
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent ml-3">
                Focus Session Tracker
              </span>
            </h1>
          </div>
          
          <p className="text-lg text-white/90 mb-6 font-medium leading-relaxed max-w-2xl mx-auto">
            Transform productivity with{' '}
            <span className="font-bold text-yellow-200">intelligent session tracking</span>
            {' '}and automated media processing
          </p>
          
          <div className="glass-effect rounded-xl p-3 inline-block scale-in">
            <div className="flex items-center justify-center space-x-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-white font-semibold text-sm">
                🏆 Hackathon Demo • Eden.pm Challenge • Live Processing
              </p>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="glass-effect rounded-2xl p-6 fade-in floating-animation">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="text-2xl mr-2">📝</span>
                Create Focus Session
              </h2>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full pulse-success"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm flex items-center">
                  <span className="mr-2">👤</span>
                  User ID
                </label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/15 text-white placeholder-white/70 border border-white/30 focus:border-blue-300 focus:outline-none input-focus backdrop-blur-sm"
                  placeholder="Enter your unique user ID"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-white font-semibold text-sm flex items-center">
                    <span className="mr-2">⏰</span>
                    Start Time
                  </label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/15 text-white border border-white/30 focus:border-green-300 focus:outline-none input-focus backdrop-blur-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-white font-semibold text-sm flex items-center">
                    <span className="mr-2">⏱️</span>
                    End Time
                  </label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/15 text-white border border-white/30 focus:border-red-300 focus:outline-none input-focus backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm flex items-center">
                  <span className="mr-2">🎬</span>
                  Media File Path
                </label>
                <input
                  type="text"
                  name="mediaFilePath"
                  value={formData.mediaFilePath}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/15 text-white placeholder-white/70 border border-white/30 focus:border-purple-300 focus:outline-none input-focus backdrop-blur-sm"
                  placeholder="/path/to/your/media/file.mp4"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center button-hover shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
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
                  className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 button-hover shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">🎲</span>
                  Random
                </button>
              </div>
            </form>
          </div>

          {/* Response Section */}
          <div className="space-y-6">
            {/* API Response */}
            {response && (
              <div className="glass-effect rounded-2xl p-6 scale-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    {response.type === 'success' ? (
                      <>
                        <span className="text-2xl mr-2">✅</span>
                        <span className="text-green-200">Success!</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl mr-2">❌</span>
                        <span className="text-red-200">Error</span>
                      </>
                    )}
                  </h3>
                  {response.type === 'success' && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                      <span className="text-green-200 font-medium text-sm">Complete</span>
                    </div>
                  )}
                </div>
                <div className="bg-black/30 rounded-lg p-4 overflow-auto max-h-60 border border-white/20">
                  <pre className="text-xs text-green-100 whitespace-pre-wrap font-mono leading-relaxed">
                    {JSON.stringify(response.data, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Sessions List */}
            <div className="glass-effect rounded-2xl p-6 fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <span className="text-2xl mr-2">📊</span>
                  Recent Sessions
                  {sessions.length > 0 && (
                    <span className="ml-2 bg-blue-400 text-white text-xs px-2 py-1 rounded-full">
                      {sessions.length}
                    </span>
                  )}
                </h3>
                <button
                  onClick={toggleSessions}
                  className="bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300 button-hover shadow-lg flex items-center"
                >
                  <span className="mr-1">{showSessions ? '👁️‍🗨️' : '👁️'}</span>
                  {showSessions ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showSessions && (
                <div className="space-y-3 max-h-80 overflow-y-auto custom-scrollbar">
                  {sessions.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">📭</div>
                      <p className="text-white/70">No sessions found yet</p>
                      <p className="text-white/50 text-sm mt-1">Create your first session above!</p>
                    </div>
                  ) : (
                    sessions.slice(0, 6).map((session, index) => (
                      <div 
                        key={session._id} 
                        className="bg-gradient-to-r from-black/20 to-black/15 rounded-lg p-4 border border-white/20 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">
                                {session.userId.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-white font-semibold">{session.userId}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold status-badge ${
                            session.processed 
                              ? 'bg-green-400 text-white pulse-success' 
                              : 'bg-yellow-400 text-black animate-pulse'
                          }`}>
                            {session.processed ? '✅ Done' : '⏳ Processing'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-white/80 text-sm">
                          <div>
                            <p className="text-white/60 text-xs uppercase tracking-wide">Duration</p>
                            <p className="font-semibold">{session.sessionDuration} min</p>
                          </div>
                          <div>
                            <p className="text-white/60 text-xs uppercase tracking-wide">Created</p>
                            <p className="font-semibold">{new Date(session.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* API Documentation - Compact bottom section */}
        <div className="max-w-6xl mx-auto mt-12 mb-8">
          <div className="glass-effect rounded-2xl p-6 fade-in">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
                <span className="text-2xl mr-2">🔧</span>
                API Documentation
              </h3>
              <p className="text-white/70 text-sm">
                Professional REST API • Production Ready
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-800/20 to-emerald-800/20 rounded-lg p-4 border border-green-400/30">
                <div className="flex items-center mb-2">
                  <div className="bg-green-400 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                    POST
                  </div>
                  <h4 className="text-white font-bold">/api/focus-session</h4>
                </div>
                <p className="text-green-100 text-sm mb-3">Create session with automated processing</p>
                <div className="bg-black/30 rounded p-2 border border-green-400/20">
                  <code className="text-green-300 text-xs font-mono">
                    curl -X POST {API_BASE_URL}/api/focus-session
                  </code>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-800/20 to-indigo-800/20 rounded-lg p-4 border border-blue-400/30">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-400 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                    GET
                  </div>
                  <h4 className="text-white font-bold">/api/focus-session</h4>
                </div>
                <p className="text-blue-100 text-sm mb-3">Retrieve all sessions with metadata</p>
                <div className="bg-black/30 rounded p-2 border border-blue-400/20">
                  <code className="text-blue-300 text-xs font-mono">
                    curl {API_BASE_URL}/api/focus-session
                  </code>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div className="p-3">
                <div className="text-2xl mb-1">⚡</div>
                <h4 className="text-white font-semibold text-sm mb-1">Live Processing</h4>
                <p className="text-white/60 text-xs">FFmpeg simulation</p>
              </div>
              <div className="p-3">
                <div className="text-2xl mb-1">☁️</div>
                <h4 className="text-white font-semibold text-sm mb-1">Cloud Ready</h4>
                <p className="text-white/60 text-xs">MongoDB & AWS</p>
              </div>
              <div className="p-3">
                <div className="text-2xl mb-1">🛡️</div>
                <h4 className="text-white font-semibold text-sm mb-1">Secure</h4>
                <p className="text-white/60 text-xs">Error handling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 