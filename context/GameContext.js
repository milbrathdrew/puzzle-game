// context/GameContext.js
import React, { createContext, useContext, useReducer } from 'react';

const GameStateContext = createContext();
const GameDispatchContext = createContext();

const initialState = {
    puzzle1: {
        completed: false,
        score: 0
    },
    puzzle2: {
        completed: false,
        score: 0
    },
    wordPuzzles: {  // Make sure this is in the initial state
        bat: {
            completed: false,
            score: 0,
            word: "BAT",
            order: 1
        },
        ring: {
            completed: false,
            score: 0,
            word: "RING",
            order: 2
        },
        flame: {
            completed: false,
            score: 0,
            word: "FLAME",
            order: 3
        },
        suitcase: {
            completed: false,
            score: 0,
            word: "SUITCASE",
            order: 4
        }
    }
};

function gameReducer(state, action) {
    switch (action.type) {
        case 'COMPLETE_WORD_PUZZLE':
            return {
                ...state,
                wordPuzzles: {
                    ...state.wordPuzzles,
                    [action.payload.puzzleId]: {
                        ...state.wordPuzzles[action.payload.puzzleId],
                        completed: true,
                        score: action.payload.score
                    }
                }
            };
        case 'COMPLETE_PUZZLE':
            const puzzleKey = `puzzle${action.payload.puzzleNumber}`;
            return {
                ...state,
                [puzzleKey]: {
                    completed: true,
                    score: action.payload.score
                }
            };
        case 'RESET_GAME':
            return initialState;
        default:
            return state;
    }
}

export function GameProvider({ children }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameStateContext.Provider value={state}>
            <GameDispatchContext.Provider value={dispatch}>
                {children}
            </GameDispatchContext.Provider>
        </GameStateContext.Provider>
    );
}

export function useGameState() {
    const state = useContext(GameStateContext);
    const dispatch = useContext(GameDispatchContext);
    
    if (state === undefined || dispatch === undefined) {
        throw new Error('useGameState must be used within a GameProvider');
    }
    
    return { state, dispatch };
}
