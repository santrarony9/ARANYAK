"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  y?: number;
}

export const Reveal = ({ children, width = "fit-content", delay = 0, duration = 0.5, y = 20 }: RevealProps) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration, delay, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const FadeIn = ({ children, delay = 0, duration = 0.8 }: { children: React.ReactNode, delay?: number, duration?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};
