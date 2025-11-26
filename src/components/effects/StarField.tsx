"use client";

import React, { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- Configuration ---
    // --- Configuration ---
    const STAR_COUNT = 600; // High density for gold dust effect
    const SPEED = 0.5; // Slow, graceful movement
    const MAX_DEPTH = 1000; // How far away stars spawn

    // Colors
    const COLORS = [
      '239, 232, 202', // #EFE8CA (Pale Gold)
      '212, 175, 55',  // #D4AF37 (Metallic Gold)
      '255, 248, 231', // #FFF8E7 (Cosmic Latte/White Gold)
    ];

    // State for mouse/steering
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // --- Star Class ---
    class Star {
      x: number;
      y: number;
      z: number;
      color: string;
      sizeBase: number;

      constructor() {
        // Random x, y in a large field centered on 0,0
        this.x = (Math.random() - 0.5) * window.innerWidth * 2;
        this.y = (Math.random() - 0.5) * window.innerHeight * 2;
        // Start at random depth
        this.z = Math.random() * MAX_DEPTH;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.sizeBase = Math.random() * 0.5 + 0.2; // Very tiny base size
      }

      reset() {
        this.x = (Math.random() - 0.5) * window.innerWidth * 2;
        this.y = (Math.random() - 0.5) * window.innerHeight * 2;
        this.z = MAX_DEPTH; // Reset to far away
      }

      update() {
        // Move star towards screen (decrease Z)
        this.z -= SPEED;

        // If star passes screen, reset it
        if (this.z <= 0) {
          this.reset();
        }
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
        // Project 3D coordinates to 2D screen space
        // Perspective projection: screenX = x / z
        const k = 128.0 / this.z; // Field of view factor
        const px = this.x * k + centerX;
        const py = this.y * k + centerY;

        // Calculate size based on proximity
        // Calculate size based on proximity
        const size = (1 - this.z / MAX_DEPTH) * 1.5 * this.sizeBase;

        // Calculate opacity based on proximity (fade in as they get closer)
        const opacity = (1 - this.z / MAX_DEPTH);

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          ctx.fillStyle = `rgba(${this.color}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // --- Initialization ---
    const stars = Array.from({ length: STAR_COUNT }, () => new Star());

    // --- Resize Handler ---
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-center mouse target on resize
      mouseX = canvas.width / 2;
      mouseY = canvas.height / 2;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // --- Mouse Handler ---
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    const animate = () => {
      // Create a trail effect by not fully clearing the canvas
      // ctx.clearRect(0, 0, canvas.width, canvas.height); // Standard clear
      ctx.fillStyle = 'rgba(25, 17, 36, 0.3)'; // Deep purple background with trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate the "vanishing point" based on mouse
      // We want the stars to flow away from the mouse, or rather, we steer INTO the stars
      // So the vanishing point tracks the mouse
      const centerX = mouseX;
      const centerY = mouseY;

      stars.forEach(star => {
        star.update();
        star.draw(ctx, centerX, centerY);
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#191124' }} // Fallback background color
    />
  );
}