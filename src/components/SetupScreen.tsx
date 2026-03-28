import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { categories } from '../lib/words';
import { Plus, X, Play } from 'lucide-react';

interface SetupScreenProps {
  onStart: (players: string[], imposterCount: number, category: string, timerMinutes: number, showHint: boolean) => void;
}

export default function SetupScreen({ onStart }: SetupScreenProps) {
  const [players, setPlayers] = useState<string[]>(['أحمد', 'علي', 'زينب']);
  const [newName, setNewName] = useState('');
  const [imposterCount, setImposterCount] = useState(1);
  const [category, setCategory] = useState(Object.keys(categories)[0]);
  const [timerMinutes, setTimerMinutes] = useState(3);
  const [showHint, setShowHint] = useState(true);

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && !players.includes(newName.trim())) {
      setPlayers([...players, newName.trim()]);
      setNewName('');
    }
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleStart = () => {
    if (players.length >= 3) {
      onStart(players, imposterCount, category, timerMinutes, showHint);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto w-full p-6 space-y-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold neon-text-blue text-neon-blue">الإمبوستر</h1>
        <p className="text-gray-400">خارج السالفة</p>
      </div>

      <div className="glass-panel p-6 space-y-6">
        {/* Players Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neon-pink">اللاعبين ({players.length})</h2>
          <form onSubmit={handleAddPlayer} className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="اسم اللاعب..."
              className="flex-1 bg-black/50 border border-glass-border rounded-lg px-4 py-2 focus:outline-none focus:border-neon-blue transition-colors"
            />
            <button
              type="submit"
              className="bg-neon-blue/20 text-neon-blue p-2 rounded-lg hover:bg-neon-blue/30 transition-colors"
            >
              <Plus size={24} />
            </button>
          </form>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
            {players.map((player, idx) => (
              <motion.div
                key={player}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white/10 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{player}</span>
                <button onClick={() => handleRemovePlayer(idx)} className="text-red-400 hover:text-red-300">
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </div>
          {players.length < 3 && (
            <p className="text-red-400 text-sm">لازم عالأقل 3 لاعبين</p>
          )}
        </div>

        {/* Settings Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neon-pink">الإعدادات</h2>
          
          <div className="space-y-2">
            <label className="block text-sm text-gray-300">عدد الإمبوسترية</label>
            <div className="flex gap-2">
              {[1, 2, 3].map(num => (
                <button
                  key={num}
                  onClick={() => setImposterCount(num)}
                  disabled={players.length <= num * 2}
                  className={`flex-1 py-2 rounded-lg border transition-all ${
                    imposterCount === num
                      ? 'border-neon-blue bg-neon-blue/20 text-neon-blue'
                      : 'border-glass-border bg-black/50 text-gray-400 disabled:opacity-50'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-300">السالفة (الفئة)</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black/50 border border-glass-border rounded-lg px-4 py-2 focus:outline-none focus:border-neon-blue"
            >
              <option value="random">عشوائي (كل الفئات)</option>
              {Object.entries(categories).map(([key, cat]) => (
                <option key={key} value={key}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-300">وقت النقاش (دقايق)</label>
            <input
              type="range"
              min="0"
              max="10"
              value={timerMinutes}
              onChange={(e) => setTimerMinutes(Number(e.target.value))}
              className="w-full accent-neon-pink"
            />
            <div className="text-center text-neon-pink font-bold">
              {timerMinutes === 0 ? 'بدون مؤقت' : `${timerMinutes} دقايق`}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-300">تلميح للإمبوستر؟</label>
            <button
              onClick={() => setShowHint(!showHint)}
              className={`w-12 h-6 rounded-full transition-colors relative ${showHint ? 'bg-neon-blue' : 'bg-gray-600'}`}
            >
              <motion.div
                className="w-4 h-4 bg-white rounded-full absolute top-1"
                animate={{ left: showHint ? '4px' : '28px' }}
              />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleStart}
        disabled={players.length < 3}
        className="w-full py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 transition-all bg-neon-blue/20 text-neon-blue border border-neon-blue hover:bg-neon-blue/30 disabled:opacity-50 disabled:cursor-not-allowed neon-border-blue"
      >
        <Play fill="currentColor" />
        يلا نبلش!
      </button>
    </motion.div>
  );
}
