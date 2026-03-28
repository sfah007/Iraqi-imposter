import { motion } from 'framer-motion';
import { RefreshCcw, Trophy, Skull } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  role: 'imposter' | 'citizen';
}

interface ResultsScreenProps {
  players: Player[];
  votes: Record<string, string>;
  secretWord: string;
  onRematch: () => void;
  onNewGame: () => void;
}

export default function ResultsScreen({ players, votes, secretWord, onRematch, onNewGame }: ResultsScreenProps) {
  // Count votes
  const voteCounts: Record<string, number> = {};
  Object.values(votes).forEach(votedForId => {
    voteCounts[votedForId] = (voteCounts[votedForId] || 0) + 1;
  });

  // Find max votes
  const maxVotes = Math.max(...Object.values(voteCounts), 0);
  const mostVotedIds = Object.keys(voteCounts).filter(id => voteCounts[id] === maxVotes);

  const imposters = players.filter(p => p.role === 'imposter');
  const imposterIds = imposters.map(i => i.id);

  // Determine if citizens won (they caught ALL imposters, or at least one imposter was most voted)
  // For simplicity, if ANY imposter is in the mostVotedIds, citizens win.
  const citizensWon = mostVotedIds.some(id => imposterIds.includes(id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-8"
    >
      <div className="space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          className="mx-auto w-32 h-32 rounded-full flex items-center justify-center border-4 border-neon-blue neon-border-blue bg-black/50"
        >
          {citizensWon ? (
            <Trophy size={64} className="text-neon-blue neon-text-blue" />
          ) : (
            <Skull size={64} className="text-neon-pink neon-text-pink" />
          )}
        </motion.div>
        
        <h2 className={`text-5xl font-black ${citizensWon ? 'text-neon-blue neon-text-blue' : 'text-neon-pink neon-text-pink'}`}>
          {citizensWon ? 'فازوا المواطنين!' : 'فاز الإمبوستر!'}
        </h2>
        <p className="text-2xl text-gray-300">
          السالفة چانت: <span className="font-bold text-white">{secretWord}</span>
        </p>
      </div>

      <div className="w-full max-w-md glass-panel p-6 space-y-6">
        <h3 className="text-2xl font-bold text-neon-pink">الإمبوسترية:</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {imposters.map(imposter => (
            <div key={imposter.id} className="bg-neon-pink/20 border border-neon-pink px-6 py-3 rounded-xl text-xl font-bold text-white neon-border-pink">
              {imposter.name}
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-gray-400">نتائج التصويت:</h3>
          <div className="space-y-2">
            {Object.entries(voteCounts).sort((a, b) => b[1] - a[1]).map(([id, count]) => {
              const player = players.find(p => p.id === id);
              const isImposter = imposterIds.includes(id);
              return (
                <div key={id} className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-glass-border">
                  <span className={`font-bold ${isImposter ? 'text-neon-pink' : 'text-gray-300'}`}>
                    {player?.name} {isImposter && '🕵️‍♂️'}
                  </span>
                  <span className="bg-white/10 px-3 py-1 rounded-full text-sm">
                    {count} أصوات
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-sm gap-4">
        <button
          onClick={onRematch}
          className="w-full py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 transition-all bg-neon-blue/20 text-neon-blue border border-neon-blue hover:bg-neon-blue/30 neon-border-blue"
        >
          <RefreshCcw />
          نفس اللاعبين (إعادة)
        </button>
        <button
          onClick={onNewGame}
          className="w-full py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 transition-all bg-gray-800 text-white border border-gray-600 hover:bg-gray-700"
        >
          لعبة جديدة (تغيير الإعدادات)
        </button>
      </div>
    </motion.div>
  );
}
