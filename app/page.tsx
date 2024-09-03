"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Lenis from "lenis";
import AnimatedText from "@/components/AnimatedText";
import ActivityTextarea from "@/components/ActivityTextarea";
import AnimatedActivityTextarea from "@/components/AnimatedActivityTextarea";
import ActivityTextAreaWrapper from "@/components/ActivityTextAreaWrapper";

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="bg-neutral-100 min-h-screen relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-200 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-300 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-green-200 rounded-full opacity-40 blur-2xl"></div>
        <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-yellow-200 rounded-full opacity-25 blur-lg"></div>
      </div>

      <h1 className="text-4xl font-bold relative z-10 p-8">
        당신의 기억을 찾아드립니다.
      </h1>

      <motion.section ref={containerRef} className="relative z-10">
        <div className="sticky top-0 flex flex-col justify-center items-start gap-4 h-screen p-8">
          {/* Generate blurred circle left side */}
          <motion.div
            style={{ opacity: opacity }}
            className="absolute -left-48 w-[800px] h-[800px] bg-blue-500 rounded-full opacity-30 blur-3xl"
          ></motion.div>

          {/* Additional decorations */}
          <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-red-200 rounded-full opacity-20 blur-md"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-indigo-200 rounded-full opacity-15 blur-lg"></div>

          <AnimatedText
            scrollProgress={scrollYProgress}
            start={0}
            end={0.2}
            className="text-4xl font-bold"
          >
            지난 주 목요일에 뭐 먹었더라?
          </AnimatedText>
          <AnimatedText
            scrollProgress={scrollYProgress}
            start={0.2}
            end={0.4}
            className="text-xl"
          >
            아마도 맛있는 것을 먹었겠지...
          </AnimatedText>
          <AnimatedText
            scrollProgress={scrollYProgress}
            start={0.4}
            end={0.6}
            className="text-xl"
          >
            그런데 기억이 안 나네..?
          </AnimatedText>
        </div>
        <div className="h-[150vh]"></div>
        <ActivityTextAreaWrapper />
      </motion.section>
    </div>
  );
}
