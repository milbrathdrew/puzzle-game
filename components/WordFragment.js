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
            className="w-12 h-12 border-2 border-[#c41e3a] rounded-md flex items-center justify-center cursor-move bg-[#1a472a] hover:border-[#ffd700]"
        >
            <span className="text-xl font-bold text-[#ffd700]">{fragment.letter}</span>
        </div>
    );
};

export default WordFragment;
