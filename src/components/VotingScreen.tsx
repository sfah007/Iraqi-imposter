import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserX, ArrowRight } from 'lucide-react';

interface VotingScreenProps {
  players: { id: string; name: string }[];
  currentPlayerIndex: number;
  onVote: (voterId: string, votedForId: string) => void;
}

export default function VotingScreen({ players, currentPlayerIndex, onVote }: VotingScreenProps) {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const currentPlayer = players[currentPlayerIndex];

  const handleConfirm = () => {
    if (selectedPlayer) {
      onVote(currentPlayer.id, selectedPlayer);
      setSelectedPlayer(null);
    }
  };

  return (
    <motion.div
      key={currentPlayer.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-8"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gray-300">
          دور <span className="text-neon-blue neon-text-blue">{currentPlayer.name}</span> بالتصويت
        </h2>
        <p className="text-xl text-gray-400">منو تتوقع الإمبوستر؟</p>
      </div>

      <div className="w-full max-w-sm space-y-3">
        {players.filter(p => p.id !== currentPlayer.id).map((player) => (
          <motion.button
            key={player.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPlayer(player.id)}
            className={`w-full p-4 rounded-xl text-xl font-bold flex items-center justify-between transition-all border ${
              selectedPlayer === player.id
                ? 'bg-neon-pink/20 border-neon-pink text-neon-pink neon-border-pink'
                : 'bg-black/50 border-glass-border text-gray-300 hover:bg-white/5'
            }`}
          >
            <span>{player.name}</span>
            {selectedPlayer === player.id && <UserX />}
          </motion.button>
        ))}
      </div>

      <button
        onClick={handleConfirm}
        disabled={!selectedPlayer}
        className="w-full max-w-sm py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 transition-all bg-neon-blue/20 text-neon-blue border border-neon-blue hover:bg-neon-blue/30 disabled:opacity-50 disabled:cursor-not-allowed neon-border-blue"
      >
        أكد التصويت
        <ArrowRight />
      </button>
    </motion.div>
  );
}
