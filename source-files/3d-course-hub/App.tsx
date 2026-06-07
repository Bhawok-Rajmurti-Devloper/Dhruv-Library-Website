import React, { useState } from 'react';
import Scene from './components/Scene';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <main className="relative w-full h-screen bg-gray-50 overflow-hidden">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Scene 
            selectedId={selectedId} 
            onSelect={setSelectedId} 
        />
      </div>

      {/* 2D Overlay Layer */}
      <Overlay 
        selectedId={selectedId} 
        onClose={() => setSelectedId(null)} 
      />
    </main>
  );
};

export default App;
