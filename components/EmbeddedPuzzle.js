// components/EmbeddedPuzzle.js
import { useEffect, useRef } from 'react';

export default function EmbeddedPuzzle() {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <iframe
        src="https://app.compositor.digital/display/Bjxr"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px',
        }}
        allow="fullscreen"
      />
    </div>
  );
}
