// components/WordFragmentation.js
import React, { useState, useEffect, useRef } from 'react';
import WordFragment from './WordFragment';



const WordFragmentation = ({ word = "FRAGMENTATION", letters, onComplete, completed, triviaNumber }) => {
    const [fragments, setFragments] = useState([]);
    const [placedFragments, setPlacedFragments] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    const [isIncorrect, setIsIncorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [hasAttempted, setHasAttempted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showHintGraphic, setShowHintGraphic] = useState(false);


    const audioRef = useRef(null);
    const backgroundMusicRef = useRef(null);

    const hints = {
        1: "Born of fear, I hunt in shadow. Who am I?",
        2: "I corrupt kings and burden bearers. What am I?",
        3: "I consume plans and leave nothing behind. What am I?",
        4: "My glow reveals nothing but greed. What am I?"
    };

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Initialize game effect
    useEffect(() => {
        if (!completed) {
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
        }
    }, [completed, word, letters]);

// Add a new ref to track if audio has been initialized
const audioInitializedRef = useRef(false);

// Modify your background music useEffect
useEffect(() => {
    const bgMusic = backgroundMusicRef.current;
    
    // Only initialize audio once
    if (bgMusic && !audioInitializedRef.current) {
        audioInitializedRef.current = true;
        bgMusic.volume = 0.3;
        
        // Add event listener for when the audio can play
        const playAudio = () => {
            bgMusic.play().catch(error => {
                console.error("Background music playback failed:", error);
            });
        };

        // Check if the document is ready for audio playback
        if (document.readyState === 'complete') {
            playAudio();
        } else {
            window.addEventListener('load', playAudio);
        }
    }

    return () => {
        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            audioInitializedRef.current = false;
        }
        window.removeEventListener('load', playAudio);
    };
}, []); // Empty dependency array

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
                setHasAttempted(true);
                setTimeout(() => {
                    setIsIncorrect(false);
                    setPlacedFragments(new Array(word.length).fill(null));
                    setFragments(prev => prev.map(f => ({ ...f, isPlaced: false })));
                }, 2000);
            }
        }
    };

    // Modify the handleShowHint function
    const handleShowHint = () => {
        setShowHint(true);
        setShowHintGraphic(true); // Show the graphic

        // Existing audio logic...
        if (audioRef.current && backgroundMusicRef.current) {
            const currentVolume = backgroundMusicRef.current.volume;
            backgroundMusicRef.current.volume = 0;

            audioRef.current.play()
                .then(() => {
                    audioRef.current.addEventListener('ended', () => {
                        if (backgroundMusicRef.current) {
                            backgroundMusicRef.current.volume = currentVolume;
                        }
                        // Hide the graphic after hint audio ends
                        setTimeout(() => {
                            setShowHintGraphic(false);
                        }, 1000); // Adjust timing as needed
                    }, { once: true });
                })
                .catch(error => {
                    console.error("Audio playback failed:", error);
                    if (backgroundMusicRef.current) {
                        backgroundMusicRef.current.volume = currentVolume;
                    }
                });
        }
    };

    return (
        <div className="p-4 relative">
            {/* Hint Graphic Overlay */}
            <div className={`hint-graphic ${showHintGraphic ? 'visible' : ''}`}>
                <img
                    src="/images/tjlaughing.png"
                    alt="teej laughing"
                    className="hint-image"
                />
            </div>

            <audio ref={audioRef} src="/audio/TJLAUGHING.mp3" preload="auto" />
            <audio
                ref={backgroundMusicRef}
                src="/audio/All I Want For Christmas Is You (Wii Shop).mp3"
                loop
                preload="auto"
            />

            <div className="mb-4 text-center">
                <h2 className="text-xl font-bold mb-2">
                    Word Fragmentation Puzzle
                </h2>
                <p className="text-lg">Score: {score}</p>
            </div>

            <div className="flex justify-center space-x-2 mb-8">
                {placedFragments.map((fragment, index) => (
                    <div
                        key={index}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`w-12 h-12 border-2 border-dashed rounded-md flex items-center justify-center transition-colors duration-300
                        ${isIncorrect ? 'border-red-400' : isComplete ? 'border-green-400' : 'border-gray-400'}`}
                    >
                        {fragment && (
                            <div className="text-xl font-bold">
                                {fragment.letter}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isIncorrect && (
                <div className="text-center mb-4">
                    <p className="text-red-500 font-bold">
                        Try again! That's not the correct word.
                    </p>
                </div>
            )}

            {hasAttempted && !isComplete && (
                <div className="text-center mt-4">
                    <button
                        onClick={handleShowHint}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
                    >
                        I really don't know much about movies and need help
                    </button>
                    {showHint && (
                        <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
                            <p className="text-gray-700">{hints[triviaNumber]}</p>
                        </div>
                    )}
                </div>
            )}

            <div className="flex justify-center flex-wrap gap-2 mt-8">
                {fragments.filter(f => !f.isPlaced).map((fragment) => (
                    <WordFragment key={fragment.id} fragment={fragment} />
                ))}
            </div>

            {isComplete && (
                <div className="mt-8">
                    <div className="bg-green-100 p-4 rounded-lg">
                        <p className="text-green-700 text-center font-bold">
                            Congratulations! You completed the word!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WordFragmentation;
