// components/WordFragmentation.js
import React, { useState, useEffect } from 'react';
import WordFragment from './WordFragment';

const WordFragmentation = ({ word = "FRAGMENTATION", letters, onComplete, completed }) => {
    const [fragments, setFragments] = useState([]);
    const [placedFragments, setPlacedFragments] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!completed) {
            initializeGame();
        }
    }, [completed]);

    const initializeGame = () => {
        const letterArray = letters || word.split('');
        const initialFragments = letterArray.map((letter, index) => ({
            id: index,
            letter,
            isPlaced: false
        }));
        setFragments(shuffleArray([...initialFragments]));
        setPlacedFragments(new Array(word.length).fill(null));
        setIsComplete(false);
        setIsIncorrect(false);
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
        const isWordComplete = newPlacedFragments.every(f => f !== null);
        
        if (isWordComplete) {
            const completedWord = newPlacedFragments
                .map(f => f.letter)
                .join('');

            if (completedWord === word) {
                setIsComplete(true);
                setIsIncorrect(false);
                const newScore = score + 100;
                setScore(newScore);
                if (onComplete) {
                    onComplete(newScore);
                }
            } else {
                setIsIncorrect(true);
                setTimeout(() => {
                    setIsIncorrect(false);
                    setPlacedFragments(new Array(word.length).fill(null));
                    setFragments(prev => prev.map(f => ({ ...f, isPlaced: false })));
                }, 2000);
            }
        }
    };

    const handleReset = () => {
        initializeGame();
    };

    return (
        <div className="p-4">
            <div className="mb-4 text-center">
                <h2 className="text-xl font-bold mb-2">
                    Word Fragmentation Puzzle
                </h2>
                <p className="text-lg">Score: {score}</p>
            </div>

            <div className={`flex flex-wrap justify-center gap-2 mb-4 min-h-[60px] p-2 rounded transition-colors duration-300
                ${isIncorrect ? 'bg-red-100' : isComplete ? 'bg-green-100' : 'bg-gray-50'}`}>
                {placedFragments.map((fragment, index) => (
                    <div
                        key={`target-${index}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`w-12 h-12 border-2 border-dashed rounded-md flex items-center justify-center transition-colors duration-300
                            ${isIncorrect ? 'border-red-400' : isComplete ? 'border-green-400' : 'border-gray-400'}`}
                    >
                        {fragment && (
                            <div className={`w-10 h-10 text-white rounded flex items-center justify-center font-bold transition-colors duration-300
                                ${isIncorrect ? 'bg-red-500' : isComplete ? 'bg-green-500' : 'bg-blue-500'}`}>
                                {fragment.letter}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isIncorrect && (
                <div className="text-center mt-2 animate-fade-in">
                    <p className="text-red-600">Try again! That's not the correct word.</p>
                </div>
            )}

            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {fragments.filter(f => !f.isPlaced).map((fragment) => (
                    <WordFragment
                        key={fragment.id}
                        id={fragment.id}
                        letter={fragment.letter}
                    />
                ))}
            </div>

            {isComplete && (
                <div className="text-center mt-4">
                    <div className="bg-green-100 p-4 rounded-lg mb-4">
                        <p className="text-green-800 font-bold">
                            Congratulations! You completed the word!
                        </p>
                    </div>
                    <button
                        onClick={handleReset}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default WordFragmentation;
