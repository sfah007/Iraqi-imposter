import { motion } from 'framer-motion';
import { Smartphone, ArrowRight } from 'lucide-react';

interface PassDeviceScreenProps {
  playerName: string;
  onReady: () => void;
}

export default function PassDeviceScreen({ playerName, onReady }: PassDeviceScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-12"
    >
      <div className="space-y-6">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mx-auto w-32 h-32 bg-neon-blue/10 rounded-full flex items-center justify-center border border-neon-blue neon-border-blue"
        >
          <Smartphone size={64} className="text-neon-blue" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-300">
          دور اللاعب: <span className="text-neon-pink neon-text-pink">{playerName}</span>
        </h2>
        <p className="text-xl text-gray-400">مرر الموبايل لـ {playerName}</p>
      </div>

      <button
        onClick={onReady}
        className="w-full max-w-sm py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 transition-all bg-neon-pink/20 text-neon-pink border border-neon-pink hover:bg-neon-pink/30 neon-border-pink"
      >
        أني {playerName}، جاهز!
        <ArrowRight />
      </button>
    </motion.div>
  );
}
