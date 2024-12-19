// context/GameContext.js
import { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  currentPuzzle: 1,
  puzzle1: {
    clues: ['', '', '', ''],
    completed: false,
    digits: [],
  },
  puzzle2: {
    clues: ['', '', '', ''],
    completed: false,
    digits: [],
  },
  finalCode: '',
  attempts: {
    puzzle1: [0, 0, 0, 0],
    puzzle2: [0, 0, 0, 0],
  },
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CLUE':
      const { puzzleNumber, clueIndex, value } = action.payload;
      const puzzleKey = `puzzle${puzzleNumber}`;
      return {
        ...state,
        [puzzleKey]: {
          ...state[puzzleKey],
          clues: state[puzzleKey].clues.map((clue, index) =>
            index === clueIndex ? value : clue
          ),
        },
      };

    case 'COMPLETE_PUZZLE':
      return {
        ...state,
        [`puzzle${action.payload.puzzleNumber}`]: {
          ...state[`puzzle${action.payload.puzzleNumber}`],
          completed: true,
          digits: action.payload.digits,
        },
        currentPuzzle: action.payload.puzzleNumber === 1 ? 2 : state.currentPuzzle,
      };

    case 'SET_FINAL_CODE':
      return {
        ...state,
        finalCode: action.payload,
      };

    case 'INCREMENT_ATTEMPT':
      const { puzzle, clueIdx } = action.payload;
      const attemptsKey = `puzzle${puzzle}`;
      return {
        ...state,
        attempts: {
          ...state.attempts,
          [attemptsKey]: state.attempts[attemptsKey].map((attempt, idx) =>
            idx === clueIdx ? attempt + 1 : attempt
          ),
        },
      };

    case 'RESET_GAME':
      return initialState;

    default:
      return state;
  }
};

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
}
