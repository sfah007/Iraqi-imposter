import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, CheckCircle2, Pause, Play } from 'lucide-react';

interface DiscussionScreenProps {
  timerMinutes: number;
  onTimeUp: () => void;
  onSkip: () => void;
}

export default function DiscussionScreen({ timerMinutes, onTimeUp, onSkip }: DiscussionScreenProps) {
  const [timeLeft, setTimeLeft] = useState(timerMinutes * 60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft === 0) onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 30;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-12"
    >
      <div className="space-y-6">
        <h2 className="text-4xl font-black text-neon-blue neon-text-blue">وقت النقاش!</h2>
        <p className="text-xl text-gray-300">
          كل واحد يحچي كلمة أو جملة توصف السالفة بدون ما يفضحها.
          <br />
          <span className="text-neon-pink font-bold mt-2 block">حاولوا تصيدون الإمبوستر!</span>
        </p>
      </div>

      <div className={`relative w-64 h-64 rounded-full flex items-center justify-center border-4 transition-colors duration-500 ${isWarning ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'border-neon-blue neon-border-blue'}`}>
        <div className="absolute inset-2 rounded-full border border-glass-border bg-black/50 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center">
          <Timer size={48} className={isWarning ? 'text-red-500 animate-pulse' : 'text-neon-blue'} />
          <span className={`text-6xl font-mono font-bold mt-4 ${isWarning ? 'text-red-500' : 'text-white'}`}>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all border ${
            isActive 
              ? 'bg-gray-800 text-white hover:bg-gray-700 border-gray-600' 
              : 'bg-neon-green/20 text-neon-green border-neon-green hover:bg-neon-green/30'
          }`}
        >
          {isActive ? (
            <>
              <Pause size={24} />
              وقف الوقت
            </>
          ) : (
            <>
              <Play size={24} />
              كمل الوقت
            </>
          )}
        </button>
        <button
          onClick={onSkip}
          className="flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all bg-neon-pink/20 text-neon-pink border border-neon-pink hover:bg-neon-pink/30 neon-border-pink"
        >
          صوّت هسه!
          <CheckCircle2 />
        </button>
      </div>
    </motion.div>
  );
}
