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
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to the Puzzle Challenge! 🧩
          </h1>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              How to Play:
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>You'll face two puzzles with four clues each</li>
              <li>Solve all clues in Puzzle 1 to unlock Puzzle 2</li>
              <li>Each puzzle will generate two digits</li>
              <li>Combine all digits to crack the final four-digit code</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
          >
            Start Puzzle Challenge 🎮
          </button>
        </div>
      </div>
    </Layout>
  );
}
