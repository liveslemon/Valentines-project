import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'lavender';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseStyles = "relative w-full rounded-full py-4 px-6 text-lg font-bold shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 z-10 select-none";
  
  const variants = {
    primary: "bg-white text-rose-500 hover:bg-rose-50",
    secondary: "bg-rose-500 text-white hover:bg-rose-600",
    lavender: "bg-violet-400 text-white hover:bg-violet-500 shadow-violet-200",
    outline: "border-2 border-white text-white hover:bg-white/10",
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;