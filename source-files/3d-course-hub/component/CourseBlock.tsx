import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, useCursor, Float } from '@react-three/drei';
import * as THREE from 'three';
import { BlockProps } from '../types';

// Icons implemented as pure React Three Fiber geometry components
const IconMonitor: React.FC = () => (
  <group position={[0, 0.4, 0.3]} scale={0.8}>
    <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
      <boxGeometry args={[0.8, 0.5, 0.05]} />
      <meshStandardMaterial color="#333" roughness={0.3} />
    </mesh>
    <mesh castShadow receiveShadow position={[0, 0, 0]}>
      <boxGeometry args={[0.1, 0.3, 0.05]} />
      <meshStandardMaterial color="#555" />
    </mesh>
    <mesh castShadow receiveShadow position={[0, -0.15, 0.1]}>
      <boxGeometry args={[0.3, 0.05, 0.2]} />
      <meshStandardMaterial color="#555" />
    </mesh>
    {/* Screen glow */}
    <mesh position={[0, 0.3, 0.03]}>
      <planeGeometry args={[0.7, 0.4]} />
      <meshBasicMaterial color="#00ADEF" opacity={0.8} transparent />
    </mesh>
  </group>
);

const IconKeyboard: React.FC = () => (
  <group position={[0, 0.4, 0.3]} rotation={[0.4, 0, 0]} scale={0.7}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1, 0.6, 0.1]} />
      <meshStandardMaterial color="#eee" />
    </mesh>
    {/* Simple keys */}
    <mesh position={[-0.3, 0.1, 0.06]}>
      <boxGeometry args={[0.2, 0.2, 0.05]} />
      <meshStandardMaterial color="#333" />
    </mesh>
    <mesh position={[0, 0.1, 0.06]}>
      <boxGeometry args={[0.2, 0.2, 0.05]} />
      <meshStandardMaterial color="#333" />
    </mesh>
    <mesh position={[0.3, 0.1, 0.06]}>
      <boxGeometry args={[0.2, 0.2, 0.05]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  </group>
);

const IconPen: React.FC = () => (
  <group position={[0, 0.4, 0.3]} rotation={[0, 0, -0.5]} scale={0.8}>
    <mesh castShadow receiveShadow>
      <capsuleGeometry args={[0.08, 0.8, 4, 8]} />
      <meshStandardMaterial color="#333" metalness={0.6} roughness={0.2} />
    </mesh>
    <mesh position={[0, 0.4, 0]}>
       <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
       <meshStandardMaterial color="#ccc" metalness={0.8} />
    </mesh>
  </group>
);

const IconBook: React.FC = () => (
  <group position={[0, 0.4, 0.3]} scale={0.8}>
    <mesh castShadow receiveShadow rotation={[0, 0.2, 0]}>
      <boxGeometry args={[0.6, 0.8, 0.15]} />
      <meshStandardMaterial color="#fff" />
    </mesh>
    <mesh position={[-0.28, 0, 0.05]} rotation={[0, 0.2, 0]}>
      <boxGeometry args={[0.1, 0.8, 0.18]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
  </group>
);

const IconGlobe: React.FC = () => (
  <mesh position={[0, 0.5, 0.3]} scale={0.4} castShadow>
    <icosahedronGeometry args={[1, 1]} />
    <meshStandardMaterial wireframe color="white" transparent opacity={0.5} />
  </mesh>
);

const CourseBlock: React.FC<BlockProps> = ({ data, isActive, onClick, onHover }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useCursor(hovered);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    onHover(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover(false);
  };

  // Animate the block
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Smooth hover scale effect
      const targetScale = isActive ? 1.1 : hovered ? 1.05 : 1;
      const currentScale = meshRef.current.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 10);
      meshRef.current.scale.setScalar(lerpedScale);
      
      // Gentle floating rotation when hovered or active
      if (hovered || isActive) {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0.1, delta * 5);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0.1, delta * 5);
      } else {
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, delta * 5);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, delta * 5);
      }
    }
  });

  const renderIcon = () => {
    switch (data.icon) {
      case 'monitor': return <IconMonitor />;
      case 'keyboard': return <IconKeyboard />;
      case 'pen': return <IconPen />;
      case 'book': return <IconBook />;
      case 'globe': return <IconGlobe />;
      default: return null;
    }
  };

  return (
    <Float
      speed={isActive ? 0 : 2} 
      rotationIntensity={isActive ? 0 : 0.2} 
      floatIntensity={isActive ? 0 : 0.5}
      position={data.position}
    >
      <group 
        ref={meshRef}
        onClick={() => onClick(data.id)}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <RoundedBox
          args={[2.2, 2.2, 0.4]} // Width, Height, Depth
          radius={0.3} // Corner radius
          smoothness={4}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color={data.color}
            roughness={0.4}
            metalness={0.1}
          />
        </RoundedBox>

        {/* Text Label - Removed custom font URL to prevent loading issues */}
        <Text
          position={[0, -0.2, 0.26]} 
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          outlineWidth={0.01}
          outlineColor="rgba(0,0,0,0.2)"
        >
          {data.title}
        </Text>

        {/* 3D Icon Representation */}
        {renderIcon()}
      </group>
    </Float>
  );
};

export default CourseBlock;