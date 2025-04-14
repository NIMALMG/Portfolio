import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ScrollAnimations = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Parallax effect for sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      const background = section.querySelector('.bg-element');
      const content = section.querySelector('.content-element');
      
      if (background && content) {
        gsap.to(background, {
          y: '30%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    });

    // Reveal animations for elements
    const revealElements = document.querySelectorAll('.reveal-element');
    revealElements.forEach((el) => {
      gsap.fromTo(el, 
        { 
          y: 50, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Stagger animations for lists
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach((container) => {
      const items = container.querySelectorAll('.stagger-item');
      
      gsap.fromTo(items, 
        { 
          y: 30, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom-=150',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Text reveal animations
    const textRevealElements = document.querySelectorAll('.text-reveal');
    textRevealElements.forEach((el) => {
      // Split text into lines
      const lines = el.innerHTML.split('<br>');
      el.innerHTML = '';
      
      lines.forEach((line) => {
        const lineWrapper = document.createElement('div');
        lineWrapper.classList.add('line-wrapper');
        lineWrapper.style.overflow = 'hidden';
        
        const lineContent = document.createElement('div');
        lineContent.classList.add('line-content');
        lineContent.innerHTML = line;
        lineContent.style.transform = 'translateY(100%)';
        
        lineWrapper.appendChild(lineContent);
        el.appendChild(lineWrapper);
      });
      
      const lineContents = el.querySelectorAll('.line-content');
      
      gsap.to(lineContents, {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=100',
          toggleActions: 'play none none none',
        }
      });
    });

    // Horizontal scroll for projects
    const horizontalSections = document.querySelectorAll('.horizontal-scroll');
    horizontalSections.forEach((section) => {
      const container = section.querySelector('.scroll-container');
      
      if (container) {
        const scrollWidth = container.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        gsap.to(container, {
          x: -(scrollWidth - viewportWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    });

    // Clean up on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null; // This is just a utility component, no rendering needed
};

export default ScrollAnimations;
