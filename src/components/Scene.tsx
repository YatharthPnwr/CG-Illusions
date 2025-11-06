/**
 * Scene Component
 *
 * Sets up the 3D scene with proper lighting, camera controls, and environment.
 * This creates the optimal viewing conditions for the Penrose stairs illusion.
 */

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import { PenroseStairs } from "./PenroseStairs";
import { AnimatedBall } from "./AnimatedBall";

interface SceneProps {
  showTrueGeometry: boolean;
  autoRotate: boolean;
  animationSpeed: number;
}

export function Scene({
  showTrueGeometry,
  autoRotate,
  animationSpeed,
}: SceneProps) {
  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      style={{
        background: "linear-gradient(to bottom, #1a1a2e 0%, #0f0f1e 100%)",
      }}
    >
      {/* Camera Setup - positioned to show the illusion optimally */}
      <PerspectiveCamera
        makeDefault
        position={showTrueGeometry ? [16, 24, 16] : [14, 21, 14]}
        fov={50}
      />

      {/* Lighting Setup */}
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.4} />

      {/* Directional light for shadows and depth */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Additional fill lights for better visibility */}
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      <pointLight position={[10, 5, -10]} intensity={0.3} color="#4ECDC4" />

      {/* Environment for realistic reflections */}
      <Environment preset="city" />

      {/* The Penrose Stairs */}
      <PenroseStairs showTrueGeometry={showTrueGeometry} />

      {/* Animated Ball traveling the stairs */}
      <AnimatedBall
        showTrueGeometry={showTrueGeometry}
        speed={animationSpeed}
      />

      {/* Ground plane with shadows */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#16213e" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Grid helper for spatial reference */}
      <gridHelper
        args={[50, 50, "#444444", "#222222"]}
        position={[0, -0.49, 0]}
      />

      {/* Orbit Controls - allows user interaction */}
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
        minDistance={8}
        maxDistance={65}
        maxPolarAngle={Math.PI / 1.4}
        minPolarAngle={Math.PI / 10}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
