// WordFragmentation.js
import React, { useState, useEffect } from 'react';
import WordFragment from './WordFragment';

const WordFragmentation = ({ word = "FRAGMENTATION", onComplete }) => {
    const [fragments, setFragments] = useState([]);
    const [placedFragments, setPlacedFragments] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        initializeGame();
    }, [word]);

    const initializeGame = () => {
        const initialFragments = word.split('').map((letter, index) => ({
            id: index,
            letter,
            isPlaced: false
        }));
        setFragments(shuffleArray([...initialFragments]));
        setPlacedFragments(new Array(word.length).fill(null));
        setIsComplete(false);
        setScore(0);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, position) => {
        e.preventDefault();
        const fragmentId = parseInt(e.dataTransfer.getData('fragmentId'));
        const fragment = fragments.find(f => f.id === fragmentId);

        if (fragment && !fragment.isPlaced) {
            const newFragments = fragments.map(f =>
                f.id === fragmentId ? { ...f, isPlaced: true } : f
            );
            setFragments(newFragments);

            const newPlacedFragments = [...placedFragments];
            newPlacedFragments[position] = fragment;
            setPlacedFragments(newPlacedFragments);

            checkCompletion(newPlacedFragments);
        }
    };

    const checkCompletion = (newPlacedFragments) => {
        const completedWord = newPlacedFragments
            .filter(f => f !== null)
            .map(f => f.letter)
            .join('');

        if (completedWord === word) {
            setIsComplete(true);
            setScore(prev => prev + 100);
            if (onComplete) {
                onComplete(score + 100);
            }
        }
    };

    const handleReset = () => {
        initializeGame();
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            <div className="flex justify-between w-full px-4">
                <h2 className="text-xl font-bold">Word Fragmentation Puzzle</h2>
                <div className="text-lg">Score: {score}</div>
            </div>

            {/* Target area */}
            <div className="flex gap-1 p-4 bg-gray-100 rounded-lg">
                {placedFragments.map((fragment, index) => (
                    <div
                        key={index}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className="w-12 h-12 border-2 border-dashed border-gray-400 rounded-md"
                    >
                        {fragment && (
                            <WordFragment fragment={fragment} />
                        )}
                    </div>
                ))}
            </div>

            {/* Available fragments */}
            <div className="flex flex-wrap gap-2 justify-center">
                {fragments.filter(f => !f.isPlaced).map((fragment) => (
                    <WordFragment
                        key={fragment.id}
                        fragment={fragment}
                    />
                ))}
            </div>

            {isComplete && (
                <div className="flex flex-col items-center gap-4">
                    <div className="text-green-500 font-bold text-lg">
                        Congratulations! You completed the word!
                    </div>
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default WordFragmentation;
