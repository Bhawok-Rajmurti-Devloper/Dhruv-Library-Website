import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// A simple grid of dots
const DotGrid: React.FC<{ position: [number, number, number], rows?: number, cols?: number, color?: string }> = ({ 
  position, 
  rows = 5, 
  cols = 5,
  color = '#333'
}) => {
  const points = [];
  const spacing = 0.3;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      points.push(
        <mesh key={`${i}-${j}`} position={[j * spacing, i * spacing, 0]}>
          <circleGeometry args={[0.03, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      );
    }
  }

  return (
    <group position={position}>
      {points}
    </group>
  );
};

const GeometricShape: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state, delta) => {
        if(meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1} position={[6, -2, -2]}>
             <Icosahedron ref={meshRef} args={[2, 1]}>
                <meshBasicMaterial wireframe color="#333" transparent opacity={0.2} />
             </Icosahedron>
        </Float>
    )
}

export const Decorations: React.FC = () => {
  return (
    <>
      {/* Top Right Dots */}
      <DotGrid position={[3.5, 3, -2]} rows={6} cols={6} color="#444" />
      
      {/* Bottom Left Dots */}
      <DotGrid position={[-5, -3.5, -2]} rows={4} cols={8} color="#444" />

      {/* Background Geometric Shape (Bottom Right) */}
      <GeometricShape />

      {/* Abstract lines Top Left */}
      <group position={[-5, 3, -3]} rotation={[0,0, -Math.PI / 4]}>
        <mesh position={[0,0,0]}>
            <boxGeometry args={[3, 0.2, 0.1]} />
            <meshStandardMaterial color="#FF0080" />
        </mesh>
        <mesh position={[0.5, 0.5, 0]}>
            <boxGeometry args={[3, 0.2, 0.1]} />
            <meshStandardMaterial color="#FFD700" />
        </mesh>
        <mesh position={[-0.2, -0.4, 0]} rotation={[0,0,0.2]}>
            <circleGeometry args={[0.3, 32]} />
            <meshBasicMaterial color="#FF0080" />
        </mesh>
      </group>
    </>
  );
};
