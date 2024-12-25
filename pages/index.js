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
      <div className="min-h-screen bg-gradient-to-b from-[#c41e3a] to-[#1a5152]">
        <main className="container mx-auto px-4 py-8">
          <div className="rounded-lg p-6 bg-white/10 backdrop-blur-sm max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#ffd700] flex items-center justify-center">
              <span className="mr-2">🎄</span>
              Welcome to Ashley's Christmas Challenge!
            </h1>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-[#ffd700] flex items-center">
                <span className="mr-2">🎁</span>
                How to Play:
              </h2>

              <ul className="text-white space-y-3 list-inside list-disc">
                <li>Answer all Puzzle 1 Questions to Unlock Puzzle 2</li>
                <li>Answer all Puzzle 2 Questions to Unlock Puzzle 3</li>
                <li>Answer all Puzzle 3 Questions to Unlock Puzzle 4</li>
                <li>Use your clues on the page to determine the final passcode</li>
                <li>Doing this correctly will unlock your big gift, and small gift!</li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={startGame}
                className="px-6 py-3 bg-[#c41e3a] text-white rounded-lg hover:bg-[#a01830] transition-colors text-lg font-bold"
              >
                Start Puzzle Challenge 🎅
              </button>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
