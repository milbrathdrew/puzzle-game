// pages/index.js
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useGameState } from '../context/GameContext';

export default function Home() {
  const router = useRouter();
  const { dispatch } = useGameState();

  const startGame = () => {
    dispatch({ type: 'RESET_GAME' });
    router.push('/puzzle');
  };

  return (
    <Layout title="Welcome to Puzzle Game">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome to the Puzzle Challenge! 🧩
        </h1>

        <div className="space-y-4 text-left bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            How to Play:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>You'll face two puzzles with four clues each</li>
            <li>Solve all clues in Puzzle 1 to unlock Puzzle 2</li>
            <li>Each puzzle will generate two digits</li>
            <li>Combine all digits to crack the final four-digit code</li>
          </ul>
        </div>

        <button
          onClick={startGame}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transform transition-transform hover:scale-105"
        >
          Start Puzzle Challenge 🎮
        </button>
      </div>
    </Layout>
  );
}
