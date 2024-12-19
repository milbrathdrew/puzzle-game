// pages/success.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useGameState } from '../context/GameContext';

export default function SuccessPage() {
  const router = useRouter();
  const { state } = useGameState();

  // Redirect to home if someone tries to access success page directly
  useEffect(() => {
    if (!state.finalCode) {
      router.push('/');
    }
  }, []);

  return (
    <Layout title="Congratulations!">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <h1 className="text-4xl font-bold text-center text-green-600">
          🎉 Congratulations! 🎉
        </h1>
        
        <div className="text-center space-y-4">
          <p className="text-xl">You've successfully solved all the puzzles!</p>
          <p className="text-2xl font-bold">
            Your final code is: <span className="text-blue-600">{state.finalCode}</span>
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push('/')}
            variant="primary"
            className="w-full"
          >
            Play Again
          </Button>
          
          <Button
            onClick={() => {
              // Add share functionality here
              navigator.clipboard.writeText(`I solved the puzzle and got code: ${state.finalCode}`);
              alert('Copied to clipboard!');
            }}
            variant="secondary"
            className="w-full"
          >
            Share Result
          </Button>
        </div>
      </div>
    </Layout>
  );
}
