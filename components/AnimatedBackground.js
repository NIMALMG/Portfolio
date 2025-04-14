import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate random positions for floating orbs
  const orbs = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: 20 + Math.random() * 80,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5
  }));

  if (!isClient) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden z-[-1]"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Mouse-following light effect */}
      {mousePosition.x > 0 && (
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent pointer-events-none"
          animate={{
            x: mousePosition.x - 300,
            y: mousePosition.y - 300,
            opacity: 0.6,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5
          }}
        />
      )}

      {/* Floating orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-pink-500/20 blur-xl"
          style={{
            width: orb.size,
            height: orb.size,
          }}
          initial={{
            x: `${orb.initialX}%`,
            y: `${orb.initialY}%`,
            opacity: 0
          }}
          animate={{
            x: [`${orb.initialX}%`, `${(orb.initialX + 20) % 100}%`, `${orb.initialX}%`],
            y: [`${orb.initialY}%`, `${(orb.initialY + 20) % 100}%`, `${orb.initialY}%`],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: orb.duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: orb.delay
          }}
        />
      ))}

      {/* Subtle gradient animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20 mix-blend-overlay"
        animate={{
          background: [
            'linear-gradient(to top right, rgba(30, 58, 138, 0.1), transparent, rgba(126, 34, 206, 0.1))',
            'linear-gradient(to top right, rgba(126, 34, 206, 0.1), transparent, rgba(30, 58, 138, 0.1))',
            'linear-gradient(to top right, rgba(30, 58, 138, 0.1), transparent, rgba(126, 34, 206, 0.1))'
          ]
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
