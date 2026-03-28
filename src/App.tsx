import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SetupScreen from './components/SetupScreen';
import PassDeviceScreen from './components/PassDeviceScreen';
import RevealScreen from './components/RevealScreen';
import DiscussionScreen from './components/DiscussionScreen';
import VotingScreen from './components/VotingScreen';
import ResultsScreen from './components/ResultsScreen';
import { categories } from './lib/words';

type GamePhase = 'SETUP' | 'PASS_DEVICE' | 'REVEAL_ROLE' | 'DISCUSSION' | 'VOTING' | 'RESULTS';

interface Player {
  id: string;
  name: string;
  role: 'imposter' | 'citizen';
}

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('SETUP');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [secretWord, setSecretWord] = useState('');
  const [imposterHint, setImposterHint] = useState('');
  const [timerMinutes, setTimerMinutes] = useState(3);
  const [showHint, setShowHint] = useState(true);
  const [votes, setVotes] = useState<Record<string, string>>({});
  const [lastSettings, setLastSettings] = useState<any>(null);

  // Load last settings from local storage
  useEffect(() => {
    const saved = localStorage.getItem('imposterSettings');
    if (saved) {
      try {
        setLastSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse settings');
      }
    }
  }, []);

  const startGame = (playerNames: string[], imposterCount: number, categoryId: string, timerMins: number, hint: boolean) => {
    // Save settings
    const settings = { playerNames, imposterCount, categoryId, timerMins, hint };
    localStorage.setItem('imposterSettings', JSON.stringify(settings));
    setLastSettings(settings);

    // Select random word
    let randomWordObj;
    if (categoryId === 'random') {
      const allCategories = Object.values(categories);
      const randomCat = allCategories[Math.floor(Math.random() * allCategories.length)];
      randomWordObj = randomCat.words[Math.floor(Math.random() * randomCat.words.length)];
    } else {
      const category = categories[categoryId as keyof typeof categories];
      randomWordObj = category.words[Math.floor(Math.random() * category.words.length)];
    }
    
    setSecretWord(randomWordObj.word);
    setImposterHint(randomWordObj.hint);
    setTimerMinutes(timerMins);
    setShowHint(hint);

    // Assign roles
    const shuffledNames = [...playerNames].sort(() => Math.random() - 0.5);
    const newPlayers: Player[] = shuffledNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      role: index < imposterCount ? 'imposter' : 'citizen',
    }));

    // Shuffle again so imposters aren't always first
    const finalPlayers = newPlayers.sort(() => Math.random() - 0.5);

    setPlayers(finalPlayers);
    setCurrentPlayerIndex(0);
    setVotes({});
    setPhase('PASS_DEVICE');
  };

  const handleRematch = () => {
    if (lastSettings) {
      startGame(lastSettings.playerNames, lastSettings.imposterCount, lastSettings.categoryId, lastSettings.timerMins, lastSettings.hint);
    } else {
      setPhase('SETUP');
    }
  };

  const handleRevealDone = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setPhase('PASS_DEVICE');
    } else {
      if (timerMinutes === 0) {
        setCurrentPlayerIndex(0);
        setPhase('VOTING');
      } else {
        setPhase('DISCUSSION');
      }
    }
  };

  const handleVote = (voterId: string, votedForId: string) => {
    setVotes(prev => ({ ...prev, [voterId]: votedForId }));
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
    } else {
      setPhase('RESULTS');
    }
  };

  const renderPhase = () => {
    switch (phase) {
      case 'SETUP':
        return <SetupScreen onStart={startGame} />;
      case 'PASS_DEVICE':
        return (
          <PassDeviceScreen
            playerName={players[currentPlayerIndex]?.name}
            onReady={() => setPhase('REVEAL_ROLE')}
          />
        );
      case 'REVEAL_ROLE':
        return (
          <RevealScreen
            playerName={players[currentPlayerIndex]?.name}
            role={players[currentPlayerIndex]?.role}
            secretWord={secretWord}
            imposterHint={imposterHint}
            showHint={showHint}
            onDone={handleRevealDone}
          />
        );
      case 'DISCUSSION':
        return (
          <DiscussionScreen
            timerMinutes={timerMinutes}
            onTimeUp={() => {
              setCurrentPlayerIndex(0);
              setPhase('VOTING');
            }}
            onSkip={() => {
              setCurrentPlayerIndex(0);
              setPhase('VOTING');
            }}
          />
        );
      case 'VOTING':
        return (
          <VotingScreen
            players={players}
            currentPlayerIndex={currentPlayerIndex}
            onVote={handleVote}
          />
        );
      case 'RESULTS':
        return (
          <ResultsScreen
            players={players}
            votes={votes}
            secretWord={secretWord}
            onRematch={handleRematch}
            onNewGame={() => setPhase('SETUP')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-hidden relative selection:bg-neon-pink/30">
      {/* Background ambient glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-neon-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-neon-pink/10 blur-[120px] rounded-full pointer-events-none" />
      
      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {renderPhase()}
        </AnimatePresence>
      </main>
    </div>
  );
}
