import { motion, useInView, useAnimate, AnimatePresence } from "framer-motion";
import AnimatedActivityTextarea from "./AnimatedActivityTextarea";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import ActivityTextarea from "./ActivityTextarea";
import { Textarea } from "./ui/textarea";

const ActivityTextAreaWrapper = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const [scope, animate] = useAnimate();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { width: '150%', height: '150%' }, { duration: 1, ease: 'easeInOut' });
    }
  }, [isInView]);

  return (
    <div ref={ref} className="h-[90vh] bg-white relative z-10 rounded-t-[2.5rem] flex flex-col items-center justify-center overflow-hidden">
      <motion.div ref={scope} className="absolute top-0 right-0 rounded-bl-full bg-slate-800 -z-10" />
      <h2 className="text-2xl font-bold text-white z-10">
        자, 이제 새로운 기억을 만들어보세요.
      </h2>
      <AnimatePresence mode="wait">
        <div className="w-full max-w-xl mx-auto p-8">
        {!isExpanded ? (
            <motion.div layoutId="activity-textarea-wrapper">
              <AnimatedActivityTextarea 
                finalText="지난 주 목요일에 친구들과 함께 새로 오픈한 이탈리안 레스토랑에 갔어요. 파스타와 피자를 먹었는데, 특히 트러플 파스타가 정말 맛있었어요. 식사 후에는 근처 카페에서 티라미수를 먹으며 담소를 나눴죠. 정말 즐거운 저녁이었어요!"
              />
            </motion.div>
        ) : (
            <motion.div layoutId="activity-textarea-wrapper" className="z-10">
              <Textarea rows={10} className="bg-slate-100" /> 
            </motion.div>
          )}
        </div>
      </AnimatePresence>
      <Button className="z-10" onClick={() => setIsExpanded(!isExpanded)}>
        내 첫 기억 만들기
      </Button>
    </div>
  );
};

export default ActivityTextAreaWrapper;