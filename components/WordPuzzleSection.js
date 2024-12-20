// components/WordPuzzleSection.js
import React from 'react';
import WordFragmentation from './WordFragmentation';
import { useGameState } from '../context/GameContext';

const WordPuzzleSection = () => {
    const { state, dispatch } = useGameState();
    
    const handlePuzzleComplete = (puzzleId, score) => {
        dispatch({
            type: 'COMPLETE_WORD_PUZZLE',
            payload: {
                puzzleId,
                score
            }
        });
    };

    const allPuzzlesCompleted = Object.values(state.wordPuzzles)
        .every(puzzle => puzzle.completed);

    const calculateTotalProgress = () => {
        const completed = Object.values(state.wordPuzzles)
            .filter(puzzle => puzzle.completed).length;
        return (completed / 4) * 100;
    };

    return (
        <div className="space-y-8">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${calculateTotalProgress()}%` }}
                ></div>
            </div>

            {/* Puzzle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(state.wordPuzzles).map(([puzzleId, puzzle]) => (
                    <div key={puzzleId} className="border rounded-lg p-4">
                        <h3 className="text-lg font-bold mb-4">
                            Trivia {puzzle.order}: {puzzle.word}
                        </h3>
                        {!puzzle.completed ? (
                            <WordFragmentation
                                word={puzzle.word}
                                onComplete={(score) => handlePuzzleComplete(puzzleId, score)}
                            />
                        ) : (
                            <div className="text-green-500">Completed! ✅</div>
                        )}
                    </div>
                ))}
            </div>

            {allPuzzlesCompleted && (
                <div className="text-center p-4 bg-green-100 rounded-lg">
                    <h2 className="text-2xl font-bold text-green-800">
                        Congratulations! All puzzles completed! 🎉
                    </h2>
                </div>
            )}
        </div>
    );
};

export default WordPuzzleSection;
