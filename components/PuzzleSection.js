// components/PuzzleSection.js
import { useState } from 'react';
import { useGameState } from '../context/GameContext';
import Button from './Button';

const puzzleData = {
    1: {
        title: "Movie Trivia Puzzle",
        description: "Each answer will help form the final code and answer future puzzles. Answer these movie-related questions to derive two digits.",
        questions: [
            {
                id: 1,
                question: "In The Dark Knight, how many main characters are in the film (including Batman and the Joker)?",
                options: ["3", "4", "5", "6"],
                correctAnswer: "4",
                hint: "Think about Batman, Joker, Harvey Dent, and Rachel."
            },
            {
                id: 2,
                question: "In Pulp Fiction, how many different storylines are woven throughout the film?",
                options: ["2", "3", "4", "5"],
                correctAnswer: "3",
                hint: "Consider Vincent and Mia's story, Butch's story, and Jules and Vincent's redemption arc."
            },
            {
                id: 3,
                question: "In The Lord of the Rings: The Fellowship of the Ring, how many members are in the Fellowship?",
                options: ["7", "8", "9", "10"],
                correctAnswer: "9",
                hint: "Count Frodo, Sam, Merry, Pippin, Gandalf, Aragorn, Legolas, Gimli, and Boromir."
            },
            {
                id: 4,
                question: "In Heat, how many criminal heists are planned and executed throughout the movie?",
                options: ["2", "3", "4", "5"],
                correctAnswer: "3",
                hint: "Think about the bank job, armored car robbery, and the final big heist."
            }
            
        ],
        finalDigits: [4, 3]
    },
    2: {
        title: "Academy Awards & TV Trivia",
        description: "Answer these questions about Academy Awards and TV shows to derive the final two digits.",
        questions: [
            {
                id: 1,
                question: "Which movie won Best Picture at the Academy Awards in 2000?",
                options: ["American Beauty", "Gladiator", "Traffic", "Crouching Tiger, Hidden Dragon"],
                correctAnswer: "Gladiator",
                hint: "This epic historical drama starred Russell Crowe as a Roman general."
            },
            {
                id: 2,
                question: "Which actor won the Best Actor award in 2014 for his role in The Theory of Everything?",
                options: ["Benedict Cumberbatch", "Eddie Redmayne", "Michael Keaton", "Bradley Cooper"],
                correctAnswer: "Eddie Redmayne",
                hint: "He portrayed physicist Stephen Hawking in this biographical drama."
            },
            {
                id: 3,
                question: "Which movie won Best Animated Feature at the 2003 Academy Awards?",
                options: ["Shrek", "Finding Nemo", "Spirited Away", "Monsters, Inc."],
                correctAnswer: "Finding Nemo",
                hint: "This Pixar film features a clownfish searching for his son."
            },
            {
                id: 4,
                question: "Which TV show won Best Drama Series at the 2016 Primetime Emmy Awards?",
                options: ["Game of Thrones", "Better Call Saul", "House of Cards", "Mr. Robot"],
                correctAnswer: "Game of Thrones",
                hint: "This HBO fantasy series was based on George R.R. Martin's novels."
            }
        ],
        finalDigits: [9, 3]
    }
};

export default function PuzzleSection({ puzzleNumber }) {
    const { state, dispatch } = useGameState();
    const [showHint, setShowHint] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const currentPuzzle = puzzleData[puzzleNumber];
    const puzzleState = state[`puzzle${puzzleNumber}`];
    const currentQuestion = currentPuzzle.questions[currentQuestionIndex];

    const handleAnswerSubmit = (selectedAnswer) => {
        if (selectedAnswer === currentQuestion.correctAnswer) {
            const newAnswers = [...answers, selectedAnswer];
            setAnswers(newAnswers);

            if (currentQuestionIndex < currentPuzzle.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setShowHint(false);
            } else {
                console.log('Puzzle completed!');
                console.log('Puzzle number:', puzzleNumber);
                console.log('Final digits:', currentPuzzle.finalDigits);

                // Updated dispatch to match reducer case

                dispatch({
                    type: 'COMPLETE_PUZZLE',
                    payload: {
                        puzzleNumber: puzzleNumber,
                        digits: currentPuzzle.finalDigits
                    }
                });

                // Add debug log after dispatch
                console.log('State after dispatch:', state);

                setCurrentQuestionIndex(0);
                setAnswers([]);
                setShowHint(false);
            }
        } else {
            alert('Incorrect answer. Try again!');
        }
    };

    if (puzzleState.completed) {
        const otherPuzzleCompleted = state[`puzzle${puzzleNumber === 1 ? 2 : 1}`].completed;

        if (otherPuzzleCompleted && puzzleNumber === 2) {
            const code = [...(state.puzzle1.digits || []), ...(state.puzzle2.digits || [])].join('');

            return (
                <div className=" rounded-lg p-6 bg-white/10 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-4 text-[#ffd700] flex items-center">
                        <span className="mr-2">🎄</span>
                        Nice job, here are your answers!
                    </h3>
                    <div className="text-3xl font-bold text-white mb-4">
                        Final Code: {code}
                    </div>
                    <div className="text-[#ffd700]">
                        <p>Puzzle 1 numbers: {(state.puzzle1.digits || []).join('')}</p>
                        <p>Puzzle 2 numbers: {(state.puzzle2.digits || []).join('')}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className=" rounded-lg p-6 bg-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4 text-[#ffd700] flex items-center">
                    <span className="mr-2">🎁</span>
                    Puzzle {puzzleNumber} Completed!
                </h3>
                {puzzleNumber === 1 && (
                    <p className="text-white">
                        Now proceed to Puzzle 2 to complete the challenge.
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className=" rounded-lg p-6 bg-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-[#ffd700] flex items-center">
                <span className="mr-2">🎁</span>
                {currentPuzzle.title}
            </h2>
            <p className="text-white mb-6">{currentPuzzle.description}</p>

            <div className="mb-6">
                <p className="text-lg font-semibold mb-4 text-[#ffd700]">
                    Question {currentQuestionIndex + 1} of {currentPuzzle.questions.length}
                </p>
                <p className="text-lg mb-4 text-white">{currentQuestion.question}</p>
            </div>

            <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleAnswerSubmit(option)}
                        className="w-full p-3 text-left rounded bg-white/20 text-white hover:bg-white/30 transition-colors border border-[#c41e3a]"
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-4 py-2 bg-[#c41e3a] text-white rounded hover:bg-[#a01830] transition-colors"
                >
                    {showHint ? '❄️ Hide Hint' : '🎄 Show Hint'}
                </button>
            </div>

            {showHint && (
                <p className="mt-4 text-[#ffd700] italic">
                    Hint: {currentQuestion.hint}
                </p>
            )}

            <div className="mt-6 border-t border-[#c41e3a] pt-4">
                <p className="text-sm text-[#ffd700]">
                    Progress: {answers.length} / {currentPuzzle.questions.length} questions answered
                </p>
            </div>
        </div>
    );
};
