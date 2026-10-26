import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { NotePaper } from './NotePaper';
import { useNoteStore } from '../store/useNoteStore';

export const World: React.FC = () => {
  const { notes, isLoading } = useNoteStore();

  if (isLoading) {
    return (
      <div className="loading-screen">
        <h1 className="loading-title">NOTORA</h1>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="canvas-container">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          enableDamping
          dampingFactor={0.05}
        />

        <color attach="background" args={['#05050a']} />
        <fog attach="fog" args={['#05050a', 10, 25]} />

        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ae3ff" />

        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          {notes.map((note) => (
            <NotePaper key={note.id} note={note} />
          ))}
          <ContactShadows
            position={[0, -4, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
