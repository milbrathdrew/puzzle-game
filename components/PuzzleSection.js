// components/PuzzleSection.js
import { useState } from 'react';
import { useGameState } from '../context/GameContext';
import Button from './Button';

const puzzleData = {
    1: {
        title: "Add the Digits - Movie Characters Puzzle",
        description: "Answer these movie-related questions to derive two digits. Each answer will help form the final code.",
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
                question: "In The Lord of the Rings: The Fellowship of the Ring, how many members are in the Fellowship?",
                options: ["7", "8", "9", "10"],
                correctAnswer: "9",
                hint: "Count Frodo, Sam, Merry, Pippin, Gandalf, Aragorn, Legolas, Gimli, and Boromir."
            },
            {
                id: 3,
                question: "In Heat, how many criminal heists are planned and executed throughout the movie?",
                options: ["2", "3", "4", "5"],
                correctAnswer: "3",
                hint: "Think about the bank job, armored car robbery, and the final big heist."
            },
            {
                id: 4,
                question: "In Pulp Fiction, how many different storylines are woven throughout the film?",
                options: ["2", "3", "4", "5"],
                correctAnswer: "3",
                hint: "Consider Vincent and Mia's story, Butch's story, and Jules and Vincent's redemption arc."
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

        if (otherPuzzleCompleted) {
            const code = [...state.puzzle1.digits, ...state.puzzle2.digits].join('');
            return (
                <div className="space-y-4 p-6 bg-emerald-50 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-2xl font-bold text-emerald-700 animate-fade-in">
                        Nice job, here are your answers! 🎉
                    </h2>
                    <div className="text-emerald-600">
                        <p className="text-4xl font-bold animate-bounce-in hover:scale-110 transition-transform duration-300 inline-block">
                            {code}
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-4 p-6 bg-card rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-foreground animate-fade-in">
                    Puzzle {puzzleNumber} Completed! 🎉
                </h2>
                {puzzleNumber === 1 && (
                    <p className="text-muted-foreground animate-slide-in">
                        Now proceed to Puzzle 2 to complete the challenge.
                    </p>
                )}
            </div>
        );
    }

    // Return the main puzzle UI if not completed
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{currentPuzzle.title}</h2>
            <p className="text-gray-600 mb-6">{currentPuzzle.description}</p>

            <div className="mb-6">
                <p className="text-lg font-semibold mb-4">
                    Question {currentQuestionIndex + 1} of {currentPuzzle.questions.length}
                </p>
                <p className="text-lg mb-4">{currentQuestion.question}</p>
            </div>

            <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleAnswerSubmit(option)}
                        className="w-full p-3 text-left rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                <Button
                    onClick={() => setShowHint(!showHint)}
                    variant="secondary"
                >
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                </Button>
            </div>

            {showHint && (
                <p className="mt-4 text-gray-600 italic">
                    Hint: {currentQuestion.hint}
                </p>
            )}

            <div className="mt-6 border-t pt-4">
                <p className="text-sm text-gray-500">
                    Progress: {answers.length} / {currentPuzzle.questions.length} questions answered
                </p>
            </div>
        </div>
    );
};