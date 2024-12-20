import React from 'react';

const WordFragment = ({ fragment }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('fragmentId', fragment.id);
  };

  return (
    <div
      draggable={!fragment.isPlaced}
      onDragStart={handleDragStart}
      className={`
        w-12 h-12 
        flex items-center justify-center 
        border-2 border-blue-500 
        rounded-md 
        cursor-move
        ${fragment.isPlaced ? 'bg-green-200' : 'bg-white'}
        transition-colors
      `}
    >
      <span className="text-xl font-bold">{fragment.letter}</span>
    </div>
  );
};

export default WordFragment;
