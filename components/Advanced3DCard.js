import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Advanced3DCard = ({ 
  title, 
  description, 
  image, 
  link, 
  color = '#ff3333', 
  index = 0 
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    const rotateX = (mouseY / (rect.height / 2)) * 10;
    const rotateY = (mouseX / (rect.width / 2)) * -10;
    
    setRotation({ x: rotateX, y: rotateY, z: 0 });
    
    // Calculate position for parallax effect inside the card
    setPosition({
      x: (mouseX / rect.width) * 20,
      y: (mouseY / rect.height) * 20
    });
  };
  
  // Reset card position and rotation
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
    setIsHovered(false);
    setRotation({ x: 0, y: 0, z: 0 });
    setPosition({ x: 0, y: 0 });
  };
  
  // Apply smooth animation to card rotation using GSAP
  useEffect(() => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateX: rotation.x,
      rotateY: rotation.y,
      duration: 0.2,
      ease: 'power2.out'
    });
  }, [rotation]);
  
  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-[500px] rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        boxShadow: isHovered 
          ? `0 25px 50px -12px ${color}50, 0 0 30px ${color}30`
          : `0 10px 30px -15px rgba(0,0,0,0.3)`,
        transition: 'box-shadow 0.3s ease'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card background with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"
        style={{ 
          transform: 'translateZ(-20px)',
          backgroundImage: `linear-gradient(135deg, ${color}10, #00000090, #00000095)`,
        }}
      />
      
      {/* Project image with parallax effect */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ transform: 'translateZ(0px)' }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.05 : 1})`,
            transition: isHovered ? 'none' : 'transform 0.5s ease',
            opacity: 0.6
          }}
        />
      </div>
      
      {/* Content overlay with depth */}
      <div 
        className="absolute inset-0 p-8 flex flex-col justify-end"
        style={{ transform: 'translateZ(30px)' }}
      >
        {/* Decorative elements */}
        <div 
          className="absolute top-4 right-4 w-16 h-16 rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${color}80 0%, transparent 70%)`,
            transform: `translate(${position.x * -0.5}px, ${position.y * -0.5}px)`,
          }}
        />
        
        <div 
          className="absolute bottom-16 left-4 w-24 h-24 rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            transform: `translate(${position.x * -0.3}px, ${position.y * -0.3}px)`,
          }}
        />
        
        {/* Project title with 3D effect */}
        <h3 
          className="text-3xl font-bold mb-2 text-white"
          style={{ 
            textShadow: `0 2px 4px rgba(0,0,0,0.3)`,
            transform: `translateY(${position.y * -0.1}px)`,
          }}
        >
          {title}
        </h3>
        
        {/* Project description */}
        <p 
          className="text-gray-300 mb-6 max-w-[90%]"
          style={{ 
            transform: `translateY(${position.y * -0.05}px)`,
          }}
        >
          {description}
        </p>
        
        {/* View project button with hover effect */}
        <motion.a
          href={link}
          className="inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div 
            className="flex items-center space-x-2 text-sm font-medium py-2 px-4 rounded-lg"
            style={{ 
              background: `linear-gradient(135deg, ${color}, ${color}90)`,
              boxShadow: `0 4px 10px ${color}50`,
              transform: `translateY(${position.y * -0.2}px)`,
            }}
          >
            <span>View Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </motion.a>
      </div>
      
      {/* Glare effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(${135 + (rotation.y * 2)}deg, transparent, rgba(255,255,255,0.1), transparent)`,
            transform: 'translateZ(40px)',
          }}
        />
      )}
    </motion.div>
  );
};

export default Advanced3DCard;
