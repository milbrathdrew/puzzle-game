// components/MatchstickPuzzle.js
import React from 'react';

const MatchstickPuzzle = () => {
  return (
    <div className="text-center p-6 bg-white/10 rounded-lg backdrop-blur-sm">
      {/* Context First */}
      <div className="text-white mb-8">
        <h3 className="text-2xl font-bold mb-4">
          Solve the matchstick puzzle!
        </h3>
        
        <div className="bg-white/20 p-6 rounded-lg mb-6">
          <ul className="space-y-2 text-lg">
            <li>✨ Your task is to identify the next correct number in the sequence.</li>
            <li>✨ Multiply each of the numbers to receive your passcode.</li>
          </ul>
        </div>

        {/* Button Moved Below Context */}
        <a 
          href="https://app.compositor.digital/display/Bjxr" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block px-6 py-3 text-xl font-bold text-white bg-[#c41e3a] hover:bg-[#a01830] rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          🔥 Click here to open Matchstick Compositor
        </a>
      </div>
    </div>
  );
};

export default MatchstickPuzzle;



/* 
import React, { useState, useCallback } from 'react';

const MatchstickNumber = ({ value }) => (
  <div className="text-4xl font-bold p-4">
    {value}
  </div>
);

const MatchstickPuzzle = () => {
  const [currentState, setCurrentState] = useState({
    firstNumber: 8,
    secondNumber: 35,
    result: 43,
    attempts: 0,
    isSolved: false
  });

  const handleNumberClick = useCallback((position) => {
    if (currentState.attempts >= 1) return; // Only allow one move

    setCurrentState(prev => {
      if (position === 'firstNumber') {
        return {
          ...prev,
          firstNumber: 6,
          secondNumber: 85,
          result: 93,
          attempts: prev.attempts + 1,
          isSolved: true
        };
      }
      return {
        ...prev,
        attempts: prev.attempts + 1
      };
    });
  }, [currentState.attempts]);

  return (
    <div className="max-w-3xl mx-auto p-5 text-center">
      <h2 className="text-2xl font-bold mb-4">Matchstick Puzzle Challenge</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-gray-700 mb-4">
          Move one matchstick to make the equation equal 93
        </p>

        <div className="flex items-center justify-center space-x-4 text-4xl">
          <div 
            onClick={() => handleNumberClick('firstNumber')}
            className={`cursor-pointer hover:bg-gray-100 p-2 rounded ${
              currentState.attempts > 0 ? 'cursor-not-allowed' : ''
            }`}
          >
            <MatchstickNumber value={currentState.firstNumber} />
          </div>
          <span>+</span>
          <div className="p-2">
            <MatchstickNumber value={currentState.secondNumber} />
          </div>
          <span>=</span>
          <div className="p-2">
            <MatchstickNumber value={currentState.result} />
          </div>
        </div>

        {currentState.isSolved && (
          <div className="text-green-600 text-xl mt-4 font-bold">
            🎉 Correct! You solved the puzzle!
          </div>
        )}

        {currentState.attempts > 0 && !currentState.isSolved && (
          <div className="text-red-600 text-xl mt-4">
            Try again! Remember, you need to make the equation equal 93.
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
        <ul className="text-left list-disc list-inside">
          <li>Click on the number 8 to move a matchstick</li>
          <li>You can only move ONE matchstick</li>
          <li>The equation must equal 93</li>
        </ul>
      </div>
    </div>
  );
};

export default MatchstickPuzzle;
*/