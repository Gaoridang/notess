import { animate as framerAnimate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from 'react';
import CursorBlinker from './CursorBlinker';

interface AnimatedActivityTextareaProps {
  finalText: string;
}

const AnimatedActivityTextarea: React.FC<AnimatedActivityTextareaProps> = ({
  finalText,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    finalText.slice(0, latest)
  );
  const isInView = useInView(containerRef, { once: true, amount: 0.7 });
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  useEffect(() => {
    if (isInView) {
      const controls = framerAnimate(count, finalText.length, {
        type: "tween",
        duration: 3,
        ease: "easeInOut",
        onComplete: () => {
          setIsAnimationComplete(true);
        }
      });
      return controls.stop;
    }
  }, [isInView]);

  return (
    <div>
    <motion.div ref={containerRef} className="rounded-md p-4 shadow-md border relative min-h-[100px]">
      <motion.span className="text-white">{displayText}</motion.span>
      {!isAnimationComplete && <CursorBlinker />}
    </motion.div>

    </div>
  );
};

export default AnimatedActivityTextarea;