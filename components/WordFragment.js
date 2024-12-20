// components/WordFragment.js
import React from 'react';

const WordFragment = ({ fragment }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('fragmentId', fragment.id);
    };

    return (
        <div
            draggable={!fragment.isPlaced}
            onDragStart={handleDragStart}
            className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-md cursor-move"
        >
            {fragment.letter}
        </div>
    );
};

export default WordFragment;
