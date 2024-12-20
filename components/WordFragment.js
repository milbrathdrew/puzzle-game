// components/WordFragment.js
import React from 'react';

const WordFragment = ({ id, letter }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('fragmentId', id.toString());
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="w-10 h-10 bg-blue-500 text-white rounded flex items-center justify-center font-bold cursor-move hover:bg-blue-600 transition-colors"
        >
            {letter}
        </div>
    );
};

export default WordFragment;
