// components/WordFragment.js
import React from 'react';

const WordFragment = ({ fragment }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('fragmentId', fragment.id.toString());
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="w-12 h-12 border-2 border-gray-400 rounded-md flex items-center justify-center cursor-move bg-white hover:border-blue-500"
        >
            <span className="text-xl font-bold">{fragment.letter}</span>
        </div>
    );
};

export default WordFragment;

