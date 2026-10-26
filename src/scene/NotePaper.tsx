import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import type { Note } from '../core/types';
import { useNoteStore } from '../store/useNoteStore';

interface NotePaperProps {
  note: Note;
}

export const NotePaper: React.FC<NotePaperProps> = ({ note }) => {
  const meshRef = useRef<THREE.Group>(null);
  const { setActiveNote, activeNoteId } = useNoteStore((state) => ({
    setActiveNote: state.setActiveNote,
    activeNoteId: state.activeNoteId,
  }));

  const [hovered, setHovered] = useState(false);
  const isActive = activeNoteId === note.id;

  // Create rounded rectangle shape
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const width = 1.5;
    const height = 2;
    const radius = 0.1;

    s.moveTo(-width / 2 + radius, -height / 2);
    s.lineTo(width / 2 - radius, -height / 2);
    s.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius);
    s.lineTo(width / 2, height / 2 - radius);
    s.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2);
    s.lineTo(-width / 2 + radius, height / 2);
    s.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius);
    s.lineTo(-width / 2, -height / 2 + radius);
    s.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2);

    return s;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Subtle tilt towards the cursor
    const pointer = state.pointer;

    const targetRotX = (pointer.y * 0.2) + (hovered ? Math.sin(state.clock.elapsedTime * 2) * 0.05 : 0);
    const targetRotY = (-pointer.x * 0.2) + (hovered ? Math.cos(state.clock.elapsedTime * 2) * 0.05 : 0);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);

    // Gentle push-away effect when hovered
    if (hovered) {
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0.1, 0.1);
    } else {
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, 0, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
      <group
        ref={meshRef}
        position={[note.position.x, note.position.y, note.position.z]}
        rotation={[note.rotation.x, note.rotation.y, note.rotation.z]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setActiveNote(note.id!)}
      >
        {/* Main Paper Body */}
        <mesh>
          <shapeGeometry args={[shape]} />
          <meshStandardMaterial
            color={isActive ? '#ffffff' : (note.color || '#ffffff')}
            side={THREE.DoubleSide}
            transparent
            opacity={0.95}
            roughness={0.8}
            metalness={0.1}
            emissive={isActive ? '#4ae3ff' : '#000000'}
            emissiveIntensity={isActive ? 0.2 : 0}
          />
        </mesh>

        {/* Subtle Border/Edge */}
        <mesh position={[0, 0, -0.001]}>
          <shapeGeometry args={[shape]} />
          <meshBasicMaterial color="#cccccc" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>

        <Text
          position={[0, 0, 0.02]}
          fontSize={0.12}
          color={isActive ? '#000000' : '#333333'}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.2}
          textAlign="center"
        >
          {note.title}
        </Text>

        {/* Highlight effect when active */}
        {isActive && (
          <mesh position={[0, 0, 0.03]}>
            <shapeGeometry args={[shape]} />
            <meshBasicMaterial color="#4ae3ff" transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </Float>
  );
};
