import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingHeart } from '../types';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const colors = [
      'text-pink-300', 
      'text-rose-300', 
      'text-purple-300', 
      'text-violet-300',
      'text-fuchsia-200'
    ];

    const newHearts: FloatingHeart[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 10 + Math.random() * 25,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={`absolute bottom-[-50px] opacity-40 ${heart.color}`}
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: -1200,
            opacity: [0, 0.5, 0],
            rotate: [0, 45, -45, 0]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;