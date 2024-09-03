import { motion, MotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  scrollProgress: MotionValue<number>;
  start: number;
  end: number;
  children: ReactNode;
  className?: string;
}

export default function AnimatedText({
  scrollProgress,
  start,
  end,
  children,
  className,
}: AnimatedTextProps) {
  const opacity = useTransform(scrollProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollProgress, [start, end], [1, 1.2]);

  return (
    <motion.p
      style={{ opacity, scale, transformOrigin: "left" }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
