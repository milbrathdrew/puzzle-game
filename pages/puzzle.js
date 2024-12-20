// pages/puzzle.js
import PuzzleSection from '../components/PuzzleSection';
import WordFragmentation from '../components/WordFragmentation';
import { useGameState } from '../context/GameContext';
import Layout from '../components/Layout';

export default function PuzzlePage() {
    const { state, dispatch } = useGameState();
    
    console.log('Current Game State:', state);
    
    const handleWordPuzzleComplete = (score) => {
        console.log(`Word Puzzle completed with score: ${score}`);
        dispatch({
            type: 'COMPLETE_PUZZLE',
            payload: {
                puzzleNumber: 'wordPuzzle',
                score: score
            }
        });
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                {/* Debug State Display */}
                <div className="bg-gray-100 p-4 mb-4 rounded">
                    <pre className="text-xs">
                        {JSON.stringify(state, null, 2)}
                    </pre>
                </div>

                {/* Word Fragmentation Puzzle */}
                <div className="mb-8">
                    <WordFragmentation 
                        word="FRAGMENTATION"
                        onComplete={handleWordPuzzleComplete}
                    />
                </div>

                {state.wordPuzzle?.completed && (
                    <div className="flex justify-center items-center">
                        <div className="bg-green-100 p-8 rounded-lg shadow-xl">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-green-800 mb-4">
                                    Nice job, here are your answers! 🎉 4393
                                </h2>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
