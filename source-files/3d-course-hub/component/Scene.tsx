import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, PerspectiveCamera, Html, useProgress } from '@react-three/drei';
import CourseBlock from './CourseBlock';
import { Decorations } from './Decorations';
import { COURSES } from '../constants';

interface SceneProps {
  onSelect: (id: string | null) => void;
  selectedId: string | null;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-gray-800 font-bold text-xl">
        {progress.toFixed(0)}% loaded
      </div>
    </Html>
  );
}

const Scene: React.FC<SceneProps> = ({ onSelect, selectedId }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Canvas className="w-full h-full" shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      
      {/* Explicit background color to ensure visibility */}
      <color attach="background" args={['#f8fafc']} />

      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.25} 
        penumbra={1} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#eef" />

      <Suspense fallback={<Loader />}>
        {/* Environment for better reflections */}
        <Environment preset="city" />

        <group position={[0, 0, 0]}>
            {COURSES.map((course) => (
            <CourseBlock
                key={course.id}
                data={course}
                isActive={selectedId === course.id}
                onClick={(id) => onSelect(selectedId === id ? null : id)}
                onHover={setHovered}
            />
            ))}
        </group>

        {/* Decorative background elements */}
        <Decorations />

        <ContactShadows 
            position={[0, -4, 0]} 
            opacity={0.4} 
            scale={30} 
            blur={2.5} 
            far={4.5} 
            color="#000000"
        />
      </Suspense>

      {/* Controls - restricted to keep the view focused */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.8}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />
    </Canvas>
  );
};

export default Scene;