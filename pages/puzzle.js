// pages/puzzle.js
import PuzzleSection from '../components/PuzzleSection';
import WordFragmentation from '../components/WordFragmentation';
import { useGameState } from '../context/GameContext';
import Layout from '../components/Layout';

export default function PuzzlePage() {
    const { state, dispatch } = useGameState();
    
    // Debug logging
    console.log('Current Game State:', state);
    
    const allPuzzlesCompleted = state.puzzle1?.completed && state.puzzle2?.completed;

    const handlePuzzleComplete = (score) => {
        console.log(`Puzzle completed with score: ${score}`);
        dispatch({
            type: 'COMPLETE_PUZZLE',
            payload: {
                puzzleNumber: 1,
                score: score
            }
        });
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                {/* Debug Display */}
                <div className="bg-gray-100 p-4 mb-4 rounded">
                    <p className="text-sm font-mono">Debug State:</p>
                    <pre className="text-xs">
                        {JSON.stringify(state, null, 2)}
                    </pre>
                </div>

                {!allPuzzlesCompleted && (
                    <>
                        <PuzzleSection puzzleNumber={1}>
                            <WordFragmentation 
                                onComplete={handlePuzzleComplete}
                                puzzleNumber={1}
                            />
                        </PuzzleSection>

                        {state.puzzle1?.completed && (
                            <PuzzleSection puzzleNumber={2}>
                                <WordFragmentation 
                                    onComplete={(score) => handlePuzzleComplete(score)}
                                    puzzleNumber={2}
                                />
                            </PuzzleSection>
                        )}
                    </>
                )}
                
                {allPuzzlesCompleted && (
                    <div className="flex justify-center items-center min-h-[50vh]">
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
