import { useEffect, useState } from 'react';

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 30 + 20,
          delay: Math.random() * 10,
        });
      }
      setParticles(newParticles);
    };

    createParticles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/8 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      
      {/* Additional floating shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300/5 rounded-full animate-pulse" style={{animationDuration: '8s'}} />
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300/5 rounded-full animate-ping" style={{animationDuration: '12s'}} />
      <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-pink-300/5 rounded-full animate-bounce" style={{animationDuration: '16s'}} />
      <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-cyan-300/5 rounded-full animate-pulse" style={{animationDuration: '10s'}} />
    </div>
  );
};

export default FloatingParticles; 