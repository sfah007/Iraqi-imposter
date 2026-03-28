import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface RevealScreenProps {
  playerName: string;
  role: 'imposter' | 'citizen';
  secretWord: string;
  imposterHint: string;
  showHint: boolean;
  onDone: () => void;
}

export default function RevealScreen({ playerName, role, secretWord, imposterHint, showHint, onDone }: RevealScreenProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    setIsRevealed(true);
    setHasSeen(true);
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const handlePressEnd = () => {
    setIsRevealed(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-300">أهلاً {playerName}</h2>
        <p className="text-red-400 font-bold animate-pulse">لا تخلي أحد يشوف شاشتك!</p>
      </div>

      <div 
        className="relative w-full max-w-sm glass-panel flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl transition-colors duration-300 overflow-hidden"
        style={{ backgroundColor: isRevealed ? 'var(--color-dark-bg)' : 'rgba(0,0,0,0.8)' }}
      >
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-4 w-full min-h-[300px] z-10"
            >
              <EyeOff size={56} className="text-gray-500" />
              <p className="text-gray-400 font-semibold text-xl text-center">اضغط مطولاً حتى تشوف دورك</p>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-6 w-full min-h-[300px] z-10"
            >
              {role === 'imposter' ? (
                <>
                  <h3 className="text-3xl sm:text-4xl font-black text-neon-pink neon-text-pink leading-tight text-center">أنت الإمبوستر! 🕵️‍♂️</h3>
                  <p className="text-lg sm:text-xl text-gray-300 text-center">أنت خارج السالفة، حاول تعرف الكلمة من كلامهم.</p>
                  {showHint && imposterHint && (
                    <div className="bg-neon-pink/10 border border-neon-pink/50 rounded-xl p-4 mt-4 w-full text-center">
                      <p className="text-sm text-neon-pink mb-2">تلميح (كلمة مشابهة):</p>
                      <p className="text-2xl sm:text-3xl font-bold text-white break-words leading-normal">{imposterHint}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl text-gray-400 text-center">السالفة هي:</h3>
                  <p className="text-4xl sm:text-5xl md:text-6xl font-black text-neon-blue neon-text-blue break-words text-center leading-normal py-4">{secretWord}</p>
                  <p className="text-base sm:text-lg text-gray-300 mt-4 text-center">حاول تلمح للكلمة بدون ما تفضحها للإمبوستر!</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interaction Layer */}
        <div
          className="absolute inset-0 z-20 cursor-pointer select-none touch-none"
          onPointerDown={handlePressStart}
          onPointerUp={handlePressEnd}
          onPointerLeave={handlePressEnd}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      <AnimatePresence>
        {hasSeen && !isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm"
          >
            <button
              onClick={onDone}
              className="w-full py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 transition-all bg-neon-green/20 text-neon-green border border-neon-green hover:bg-neon-green/30"
              style={{ boxShadow: '0 0 10px var(--color-neon-green), inset 0 0 10px var(--color-neon-green)' }}
            >
              <CheckCircle2 />
              شفت دوري، كمل
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
