// pages/puzzle.js
import PuzzleSection from '../components/PuzzleSection';
import { useGameState } from '../context/GameContext';

export default function PuzzlePage() {
    const { state } = useGameState();
    const allPuzzlesCompleted = state.puzzle1.completed && state.puzzle2.completed;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="space-y-8">
                {!allPuzzlesCompleted && (
                    <>
                        <div className="mb-8">
                            <PuzzleSection puzzleNumber={1} />
                        </div>
                        {state.puzzle1.completed && (
                            <div className="mt-8">
                                <PuzzleSection puzzleNumber={2} />
                            </div>
                        )}
                    </>
                )}
                
                {allPuzzlesCompleted && (
                    <PuzzleSection puzzleNumber={1} /> // This will now show the final code
                )}
            </div>
        </div>
    );
}
