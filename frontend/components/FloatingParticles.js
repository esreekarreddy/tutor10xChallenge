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
          size: Math.random() * 4 + 2,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
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
          className="absolute rounded-full bg-white/15 animate-float"
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
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300/10 rounded-full animate-pulse" style={{animationDuration: '4s'}} />
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300/10 rounded-full animate-ping" style={{animationDuration: '6s'}} />
      <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-pink-300/10 rounded-full animate-bounce" style={{animationDuration: '8s'}} />
      <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-cyan-300/10 rounded-full animate-pulse" style={{animationDuration: '5s'}} />
    </div>
  );
};

export default FloatingParticles; 