import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const DustEffect = ({ positionX }) => (
  <mesh position={[positionX, -0.35, 0]}>
    <planeGeometry args={[2.2, 0.9]} />
    <meshStandardMaterial
      transparent
      opacity={0.25}
      color={'#aaa'}
      roughness={1}
    />
  </mesh>
);

const Car = ({ onFinish }) => {
  const { scene } = useGLTF('/bmw_m4_adro_bodykit.glb');
  const carRef = useRef();
  const [carX, setCarX] = useState(0);
  const [animationState, setAnimationState] = useState('fade-in'); // 'fade-in' → 'drive' → 'done'
  const [opacity, setOpacity] = useState(0);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (!child.material || !child.material.color) {
          child.material = new THREE.MeshStandardMaterial({ color: '#999' });
        }
        child.material.transparent = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (!carRef.current) return;

    const elapsed = startTime ? (Date.now() - startTime) / 1000 : 0;

    // Fade-in at center first
    if (animationState === 'fade-in') {
      const newOpacity = Math.min(opacity + 0.02, 1);
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.opacity = newOpacity;
        }
      });
      setOpacity(newOpacity);
      if (newOpacity >= 1) {
        setAnimationState('drive');
        setStartTime(Date.now());
      }
    }

    // Drive-off and return
    if (animationState === 'drive') {
      if (elapsed <= 1.6) {
        const newX = 0 - (elapsed / 1.6) * 12;
        carRef.current.position.x = newX;
        setCarX(newX);
      } else if (elapsed <= 3.2) {
        const newX = 12 - ((elapsed - 1.6) / 1.6) * 12;
        carRef.current.position.x = newX;
        setCarX(newX);
      } else {
        carRef.current.position.x = 0;
        setCarX(0);
        setAnimationState('done');
        if (onFinish) onFinish();
      }
    }
  });

  return (
    <>
      <primitive
        ref={carRef}
        object={scene}
        scale={[0.9, 1.9, 1.9]}
        position={[-0.5, 0.5, 0.8]}
        rotation={[0, Math.PI / 2, 0]}
      />
      {animationState === 'drive' && <DustEffect positionX={carX} />}
    </>
  );
};

const CarModel = () => {
  return (
    <div className="w-full h-screen relative flex justify-center items-center">
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 40 }}>
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[10, 15, 10]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Environment preset="sunset" background={false} />
        <Car />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default CarModel;
