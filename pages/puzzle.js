// pages/puzzle.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import PuzzleSection from '../components/PuzzleSection';
import Button from '../components/Button';
import { useGameState } from '../context/GameContext';

export default function PuzzlePage() {
  const router = useRouter();
  const { state, dispatch } = useGameState();

  useEffect(() => {
    if (state.puzzle1.completed && state.puzzle2.completed) {
      const finalCode = [...state.puzzle1.digits, ...state.puzzle2.digits].join('');
      dispatch({ type: 'SET_FINAL_CODE', payload: finalCode });
      router.push('/success');
    }
  }, [state.puzzle1.completed, state.puzzle2.completed]);

  return (
    <Layout title="Solve the Puzzles">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Solve the Puzzles 🧩
        </h1>

        <PuzzleSection puzzleNumber={1} />
        
        {state.puzzle1.completed && (
          <PuzzleSection puzzleNumber={2} />
        )}

        <div className="flex justify-center mt-6">
          <Button
            onClick={() => router.push('/')}
            variant="secondary"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Layout>
  );
}
