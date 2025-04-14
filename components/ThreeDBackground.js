import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeDBackground = () => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const positionArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      // Position
      positionArray[i * 3] = (Math.random() - 0.5) * 10;
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Scale
      scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Material with custom shader
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 150 },
        uColor: { value: new THREE.Color('#ff3333') },
        uMouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uSize;
        uniform vec2 uMouse;
        attribute float aScale;
        
        varying vec3 vPosition;
        
        void main() {
          vPosition = position;
          
          // Mouse influence
          vec3 pos = position;
          float dist = distance(pos.xy, uMouse);
          float influence = smoothstep(2.0, 0.0, dist);
          pos.z += influence * 0.5 * sin(uTime);
          
          // Animation
          pos.x += sin(pos.y * 1.0 + uTime * 0.5) * 0.1;
          pos.y += cos(pos.x * 1.0 + uTime * 0.5) * 0.1;
          pos.z += sin(pos.x * pos.y + uTime * 0.2) * 0.1;
          
          vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
          gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPosition.z);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        varying vec3 vPosition;
        
        void main() {
          // Circular particle
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - strength;
          strength = pow(strength, 3.0);
          
          // Color variation based on position and time
          vec3 color = uColor;
          color.r += sin(vPosition.x * 2.0 + uTime * 0.5) * 0.2;
          color.g += sin(vPosition.y * 2.0 + uTime * 0.7) * 0.1;
          color.b += sin(vPosition.z * 2.0 + uTime * 0.3) * 0.1;
          
          gl_FragColor = vec4(color, strength);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Camera position
    camera.position.z = 5;
    
    // Mouse move event
    const updateMousePosition = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      particlesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update uniforms
      particlesMaterial.uniforms.uTime.value = elapsedTime;
      particlesMaterial.uniforms.uMouse.value.x = mousePosition.current.x;
      particlesMaterial.uniforms.uMouse.value.y = mousePosition.current.y;
      
      // Rotate particles
      particles.rotation.y = elapsedTime * 0.05;
      
      // Render
      renderer.render(scene, camera);
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ThreeDBackground;
