import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowRight, FaMoon, FaSun } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';

// Theme context for dark/light mode
const ThemeContext = createContext();

// Custom cursor component with advanced animations
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || 
          e.target.tagName === 'BUTTON' || 
          e.target.closest('a') || 
          e.target.closest('button') ||
          e.target.classList.contains('hoverable')) {
        setIsHovering(true);
        setCursorVariant('hover');
      } else if (e.target.classList.contains('text-area') || e.target.closest('.text-area')) {
        setCursorVariant('text');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  // Cursor variants for different states
  const cursorVariants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1,
      backgroundColor: '#7f5af0',
      mixBlendMode: 'difference'
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      backgroundColor: '#2cb67d',
      mixBlendMode: 'difference'
    },
    text: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 1.2,
      backgroundColor: '#7f5af0',
      mixBlendMode: 'difference',
      opacity: 0.7
    },
    clicking: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 0.8,
      backgroundColor: '#2cb67d',
      mixBlendMode: 'difference'
    }
  };
  
  // Outer cursor variants
  const outerCursorVariants = {
    default: {
      x: mousePosition.x - 64,
      y: mousePosition.y - 64,
      scale: 1,
      opacity: 0.15,
      backgroundColor: 'rgba(127, 90, 240, 0.3)'
    },
    hover: {
      x: mousePosition.x - 64,
      y: mousePosition.y - 64,
      scale: 1.4,
      opacity: 0.2,
      backgroundColor: 'rgba(44, 182, 125, 0.3)'
    },
    text: {
      x: mousePosition.x - 64,
      y: mousePosition.y - 64,
      scale: 1.2,
      opacity: 0.1,
      backgroundColor: 'rgba(127, 90, 240, 0.2)'
    },
    clicking: {
      x: mousePosition.x - 64,
      y: mousePosition.y - 64,
      scale: 0.9,
      opacity: 0.25,
      backgroundColor: 'rgba(44, 182, 125, 0.4)'
    }
  };
  
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 hidden md:block"
        variants={cursorVariants}
        animate={isClicking ? 'clicking' : cursorVariant}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-40 hidden md:block blur-sm"
        variants={outerCursorVariants}
        animate={isClicking ? 'clicking' : cursorVariant}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.8
        }}
      />
      {/* Cursor trail effect */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#7f5af0]/30 pointer-events-none z-30 hidden md:block"
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: 1 - (i * 0.15),
            opacity: 1 - (i * 0.2)
          }}
          transition={{
            duration: 0.2,
            delay: i * 0.05
          }}
        />
      ))}
    </>
  );
};

// Advanced glass background component with particle effects
const GlassBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base color */}
      <div className="absolute inset-0 bg-[#1e1e2f]"/>
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#7f5af0]/20 to-[#2cb67d]/10 blur-3xl"
        animate={{ 
          x: ['-20%', '10%', '-20%'],
          y: ['10%', '30%', '10%'],
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Secondary gradient orb */}
      <motion.div 
        className="absolute w-[600px] h-[600px] right-0 rounded-full bg-gradient-to-l from-[#7f5af0]/10 to-[#2cb67d]/20 blur-3xl"
        animate={{ 
          x: ['10%', '-5%', '10%'],
          y: ['20%', '0%', '20%'],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Small floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div 
          key={i}
          className={`absolute w-${1 + (i % 3)} h-${1 + (i % 3)} rounded-full bg-[#7f5af0]/${10 + (i % 20)} blur-sm`}
          style={{
            left: `${(i * 5) % 100}%`,
            top: `${(i * 7) % 100}%`,
          }}
          animate={{ 
            y: [0, -20, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            duration: 5 + (i % 5),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2
          }}
        />
      ))}
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.03]"/>
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-[rgba(255,255,255,0.05)]"/>
    </div>
  );
};

// Theme switcher component
const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[#7f5af0]/30"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
       <div className="text-xl transition-colors duration-300">
        {theme === 'dark' ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-blue-400" />
        )}
      </div>

      {/* Tooltip */}
      <span className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </motion.button>
  );
};

// Marquee text component for scrolling text effect
const MarqueeText = ({ children }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4 my-8">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="inline-block"
      >
        {children} {children}
      </motion.div>
    </div>
  );
};

// Ultra-advanced Project card component with interactive animations and effects
const ProjectCard = ({ title, image, delay }) => {
  const cardRef = useRef(null);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltValues({ x, y });
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setTiltValues({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: '0 15px 40px rgba(127, 90, 240, 0.4)'
      }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: `perspective(1000px) rotateX(${tiltValues.y * 10}deg) rotateY(${-tiltValues.x * 10}deg)`,
        transformStyle: 'preserve-3d'
      }}
      className="group cursor-pointer bg-[rgba(255,255,255,0.1)] backdrop-blur-lg rounded-xl overflow-hidden p-4 border border-[rgba(255,255,255,0.1)] relative"
    >
      {/* Animated border glow effect */}
      <motion.div 
        className="absolute -inset-0.5 bg-gradient-to-r from-[#7f5af0] via-[#2cb67d] to-[#7f5af0] rounded-xl opacity-0 group-hover:opacity-70 blur-md -z-10"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%' }}
      />
      
      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#7f5af0] rounded-tl-md -mt-1 -ml-1 z-20" 
        style={{ 
          transform: isHovered ? 'translate(-2px, -2px)' : 'translate(0, 0)',
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#7f5af0] rounded-br-md -mb-1 -mr-1 z-20" 
        style={{ 
          transform: isHovered ? 'translate(2px, 2px)' : 'translate(0, 0)',
          transition: 'transform 0.3s ease-out'
        }}
      />
      
      <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6 relative" style={{ transform: 'translateZ(20px)' }}>
        {/* Main image with enhanced effects */}
        <img 
          src={`/images/${image}`} 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-700"
          style={{
            filter: isHovered ? 'saturate(1.2) contrast(1.1)' : 'saturate(0.9)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Scanline effect */}
        <motion.div 
          className="absolute inset-0 overflow-hidden opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="w-full h-1 bg-[#7f5af0]/50 blur-sm"
            animate={{ 
              y: ['-100%', '200%'],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
        
        {/* Grid overlay */}
        <motion.div 
          className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-0 mix-blend-overlay pointer-events-none"
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Enhanced hover overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[#1e1e2f]/90 via-[#1e1e2f]/50 to-transparent transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative overflow-hidden rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.span 
                className="flex items-center gap-2 px-5 py-2 bg-[#7f5af0] text-white rounded-full relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Project <FaArrowRight />
              </motion.span>
              
              {/* Button glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#7f5af0] via-[#2cb67d] to-[#7f5af0] opacity-80 rounded-full"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 200%' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Project title with animated underline */}
      <div className="relative overflow-hidden">
        <motion.h3 
          className="text-2xl font-bold mb-2 relative inline-block"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          style={{ transform: 'translateZ(15px)' }}
        >
          {title}
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] w-0"
            animate={{ width: isHovered ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.h3>
      </div>
      
      {/* Project description with tech tags */}
      <div className="flex justify-between items-center" style={{ transform: 'translateZ(10px)' }}>
        <motion.p 
          className="text-gray-400 text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          UI/UX Design • Development
        </motion.p>
        
        {/* Tech tags */}
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          <motion.span 
            className="text-xs px-2 py-0.5 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-full border border-[#7f5af0]/30 text-[#7f5af0]"
            whileHover={{ y: -2 }}
          >
            2023
          </motion.span>
        </motion.div>
      </div>
      
      {/* Particle effects */}
      {isHovered && Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`card-particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-[#7f5af0]"
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0
          }}
          animate={{
            x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 10)],
            y: [0, -30 - i * 10],
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1 + i * 0.2,
            ease: 'easeOut'
          }}
          style={{
            left: `${50 + (i - 1) * 20}%`,
            top: '50%',
            zIndex: 30
          }}
        />
      ))}
    </motion.div>
  );
};

// Ultra-advanced Photo component with 3D effects and animations
const Photo = () => {
  const photoRef = useRef(null);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltValues({ x, y });
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setTiltValues({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div 
      ref={photoRef}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: `perspective(1000px) rotateX(${tiltValues.y * 10}deg) rotateY(${-tiltValues.x * 10}deg)`,
        transformStyle: 'preserve-3d'
      }}
      className="relative z-10 w-full md:w-1/2 max-w-md"
    >
      <div className="relative">
        {/* Animated border */}
        <motion.div 
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#7f5af0] via-[#2cb67d] to-[#7f5af0] opacity-75 blur-sm"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          style={{ 
            transform: 'translateZ(5px)',
            backgroundSize: '200% 200%' 
          }}
        />
        
        {/* Main photo with frame */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-[#7f5af0]/50 shadow-2xl shadow-[#7f5af0]/20 bg-[#1e1e2f]">
          {/* Animated grid overlay */}
          <motion.div 
            className="absolute inset-0 z-10 bg-[url('/images/grid.svg')] opacity-0 mix-blend-overlay"
            animate={{ opacity: isHovered ? 0.2 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: 'translateZ(25px)' }}
          />
          
          {/* Scanline effect */}
          <motion.div 
            className="absolute inset-0 z-10 overflow-hidden"
            style={{ transform: 'translateZ(25px)' }}
          >
            <motion.div 
              className="w-full h-1 bg-[#7f5af0]/20 blur-sm"
              animate={{ 
                y: ['-100%', '200%'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          
          {/* User's photo with advanced effects */}
          <div className="aspect-[4/5] relative overflow-hidden" style={{ transform: 'translateZ(20px)' }}>
            {/* Glitch effect layers */}
            <motion.div 
              className="absolute inset-0 opacity-0"
              animate={{ 
                x: [0, -5, 5, -2, 0],
                opacity: [0, 0.1, 0, 0.1, 0],
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
            >
              <img 
                src="/images/nim2-Photoroom.png" 
                alt="Glitch effect" 
                className="w-full h-full object-cover filter hue-rotate-15"
              />
            </motion.div>
            
            <motion.div 
              className="absolute inset-0 opacity-0"
              animate={{ 
                x: [0, 5, -5, 2, 0],
                opacity: [0, 0.1, 0, 0.1, 0],
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5, delay: 0.1 }}
            >
              <img 
                src="/images/nim2-Photoroom.png" 
                alt="Glitch effect" 
                className="w-full h-full object-cover filter hue-rotate-180"
              />
            </motion.div>
            
            {/* Main photo */}
            <img 
              src="/images/nim2-Photoroom.png" 
              alt="NIMAL MG - Creative Developer" 
              className="w-full h-full object-cover relative z-10"
            />
            
            {/* Interactive hover overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-[#7f5af0]/30 to-transparent opacity-0 z-20"
              animate={{ opacity: isHovered ? 0.5 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Decorative elements with enhanced animations */}
          <motion.div 
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#7f5af0] to-[#2cb67d] blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: 'easeInOut',
              rotate: { duration: 20, ease: 'linear' }
            }}
          />
          
          <motion.div 
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-[#7f5af0] to-[#2cb67d] blur-xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.7, 0.5],
              rotate: [360, 270, 180, 90, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: 'easeInOut', 
              delay: 1,
              rotate: { duration: 25, ease: 'linear' }
            }}
          />
        </div>
        
        {/* Floating badge with enhanced animations */}
        <motion.div 
          className="absolute -right-10 top-1/4 bg-[rgba(255,255,255,0.1)] backdrop-blur-md px-4 py-2 rounded-xl border border-[#7f5af0]/30 overflow-hidden group"
          initial={{ opacity: 0, x: 20, rotate: 6 }}
          whileInView={{ opacity: 1, x: 0, rotate: 6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ y: -5, rotate: 0, scale: 1.05 }}
          style={{ transform: 'translateZ(15px)' }}
        >
          {/* Badge glow effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#7f5af0]/0 via-[#7f5af0]/30 to-[#7f5af0]/0 opacity-0 group-hover:opacity-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          
          <motion.p 
            className="text-xs text-red-400"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            Creative Developer
          </motion.p>
          
          <motion.p 
            className="text-sm font-bold text-black"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            Since 2023
          </motion.p>
        </motion.div>
        
        {/* Floating particles around photo */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`photo-particle-${i}`}
            className={`absolute w-1 h-1 rounded-full bg-[#7f5af0]`}
            style={{
              left: `${(i * 20) % 100}%`,
              top: `${(i * 25) % 100}%`,
              zIndex: 20
            }}
            animate={{ 
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              y: [0, i % 2 === 0 ? -20 : 20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [theme, setTheme] = useState('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);
  
  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    });
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div 
        ref={mainRef}
        onMouseMove={handleMouseMove}
        className={`min-h-screen ${theme === 'dark' ? 'bg-[#1e1e2f] text-white' : 'bg-white text-black'} transition-colors duration-300`}
      >
        <Head>
          <title>NIMAL MG | Creative Developer</title>
          <meta name="description" content="Portfolio of NIMAL MG, Creative Developer specializing in interactive web experiences" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>
        
        <GlassBackground />
        
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7f5af0] via-[#2cb67d] to-[#7f5af0] origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed w-full p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center z-40 bg-[rgba(255,255,255,0.1)] backdrop-blur-md border-b border-[#7f5af0]/20"
        >
          <div className="text-xs sm:text-sm tracking-wider mb-2 sm:mb-0 font-light">
            INDIA - CHENNAI
          </div>
          <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm tracking-wider">
            <Link href="/" className="hover:text-[#7f5af0] transition-colors duration-300">HOME</Link>
            <Link href="#about" className="hover:text-[#7f5af0] transition-colors duration-300">ABOUT</Link>
            <Link href="#projects" className="hover:text-[#7f5af0] transition-colors duration-300">PROJECTS</Link>
            <Link href="#contact" className="hover:text-[#7f5af0] transition-colors duration-300">CONTACT</Link>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-20 relative overflow-hidden">
          <motion.div
            style={{ y: backgroundY, opacity: backgroundOpacity }}
            className="relative z-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-5xl sm:text-7xl md:text-9xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white"
            >
              CREATIVE<br />TECHNOLOGIST
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="text-lg md:text-xl text-gray-400 max-w-xl mb-8"
            >
              Building digital experiences that blend creativity with technical excellence
            </motion.p>
            <motion.div 
              className="flex gap-6 mt-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              <motion.a 
                href="https://github.com/NIMALMG" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5, color: '#6366f1' }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-[#7f5af0] transition-colors duration-300"
              >
                <FaGithub size={24} className="sm:w-7 sm:h-7" />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/nimal-mg/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5, color: '#6366f1' }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-[#7f5af0] transition-colors duration-300"
              >
                <FaLinkedin size={24} className="sm:w-7 sm:h-7" />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5, color: '#6366f1' }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-[#7f5af0] transition-colors duration-300"
              >
                <FaInstagram size={24} className="sm:w-7 sm:h-7" />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
          >
            <motion.div 
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div 
                className="w-1 h-2 bg-white rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <p className="text-xs text-center mt-2">SCROLL</p>
          </motion.div>
        </section>

        {/* Photo Section */}
        <section className="min-h-screen px-4 sm:px-6 md:px-20 py-20 sm:py-32 relative flex flex-col md:flex-row items-center justify-center gap-12 overflow-hidden">
          <Photo />
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="relative z-10 w-full md:w-1/2"
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#7f5af0] to-[#2cb67d]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Turning Ideas Into Digital Reality
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              I'm a creative developer with a passion for building beautiful, functional, and user-friendly digital experiences. With expertise in front-end development and UI/UX design, I bring ideas to life through code.
            </motion.p>
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.6 }}
            >
              <motion.div 
                className="px-4 py-3 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-lg border border-[#7f5af0]/30 flex items-center justify-center"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(127, 90, 240, 0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#7f5af0] font-medium">Web Development</span>
              </motion.div>
              <motion.div 
                className="px-4 py-3 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-lg border border-[#7f5af0]/30 flex items-center justify-center"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(127, 90, 240, 0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#7f5af0] font-medium">UI/UX Design</span>
              </motion.div>
              <motion.div 
                className="px-4 py-3 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-lg border border-[#7f5af0]/30 flex items-center justify-center"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(127, 90, 240, 0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#7f5af0] font-medium">3D Animation</span>
              </motion.div>
              <motion.div 
                className="px-4 py-3 bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-lg border border-[#7f5af0]/30 flex items-center justify-center"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(127, 90, 240, 0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-[#7f5af0] font-medium">Mobile Apps</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen px-4 sm:px-6 md:px-20 py-20 sm:py-32 relative">
          <div className="text-xs sm:text-sm tracking-wider text-gray-400 mb-4">02 // 05 - SCROLL</div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7f5af0] to-[#2cb67d]">
              Hi, I am NIMAL MG
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Independent creative developer based in Chennai, India. I bring a unique blend of technical expertise 
              and artistic vision to every project. I'm not only a full-stack developer, proficient in both web 
              and mobile development, but also a skilled designer and technology enthusiast. This comprehensive 
              skillset allows me to craft beautiful, user-friendly, and innovative solutions that stand out from the crowd.
            </p>
          </motion.div>
          
          <MarqueeText>
            <span className="text-3xl sm:text-5xl font-bold opacity-20 mx-4 sm:mx-8 text-[#7f5af0]">
              CREATIVE DEVELOPER • FULL-STACK • DESIGNER • WEB • MOBILE • DEVELOPER •
            </span>
          </MarqueeText>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          >
            <div className="p-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-[#7f5af0]/20 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-[#7f5af0]">Web Development</h3>
              <p className="text-gray-400">Creating responsive, performant websites and web applications using modern frameworks and technologies.</p>
            </div>
            <div className="p-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-[#7f5af0]/20 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-[#7f5af0]">UI/UX Design</h3>
              <p className="text-gray-400">Designing intuitive, beautiful interfaces that enhance user experience and engagement.</p>
            </div>
            <div className="p-6 bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-[#7f5af0]/20 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-[#7f5af0]">Mobile Development</h3>
              <p className="text-gray-400">Building cross-platform mobile applications that deliver native-like experiences.</p>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen px-4 sm:px-6 md:px-20 py-20 sm:py-32 relative">
          <div className="text-xs sm:text-sm tracking-wider text-gray-400 mb-4">03 // 05 - SCROLL</div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7f5af0] to-[#2cb67d]">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              Here are some selected works that showcase my passion for creating products and bringing brands to life
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <ProjectCard 
              title="Digital Experience Platform" 
              image="project1.png" 
              delay={0}
            />
            <ProjectCard 
              title="E-Commerce Redesign" 
              image="project2.png" 
              delay={0.2}
            />
            <ProjectCard 
              title="Mobile Banking App" 
              image="project3.png" 
              delay={0.4}
            />
          </div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          >
            <motion.a 
              href="#" 
              className="inline-block text-base sm:text-lg border border-[#7f5af0] px-8 py-4 rounded-full hover:bg-gradient-to-r hover:from-[#7f5af0] hover:to-[#2cb67d] hover:border-transparent transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                View All Projects
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FaArrowRight />
                </motion.span>
              </span>
            </motion.a>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen px-4 sm:px-6 md:px-20 py-20 sm:py-32 relative">
          <div className="text-xs sm:text-sm tracking-wider text-gray-400 mb-4">05 // 05 - SCROLL</div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-4xl relative z-10"
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7f5af0] to-[#2cb67d]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              INTERESTED IN<br />WORKING TOGETHER?
            </motion.h2>
            <motion.p 
              className="text-gray-400 text-lg mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Thanks for your visit! If you wanna know more, check out my social pages or send me a message 😄
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ContactForm />
            </motion.div>
          </motion.div>
          
          {/* Background accent */}
          <motion.div 
            className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#7f5af0]/20 via-[#2cb67d]/10 to-transparent rounded-tl-full blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </section>

        {/* Footer */}
        <footer className="px-4 sm:px-6 md:px-20 py-8 border-t border-[#7f5af0]/30 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="text-xs sm:text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              2025 - ALL RIGHTS RESERVED
            </motion.div>
            <div className="flex gap-6">
              <motion.a 
                href="https://github.com/NIMALMG" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5, color: '#6366f1' }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-[#7f5af0] transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/nimal-mg/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5, color: '#6366f1' }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-[#7f5af0] transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <FaLinkedin size={20} />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5, color: '#6366f1' }}
                whileTap={{ scale: 0.9 }}
                className="hover:text-[#7f5af0] transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FaInstagram size={20} />
              </motion.a>
            </div>
            <motion.div 
              className="text-xs sm:text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              DESIGN AND DEVELOPED BY GEN-Z
            </motion.div>
          </motion.div>
        </footer>

        <CustomCursor />
        <ThemeSwitcher />
      </div>
    </ThemeContext.Provider>
  );
}

export default Home;
