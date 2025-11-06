/**
 * AnimatedBall Component
 *
 * A sphere that travels along the Penrose stairs path, creating the illusion
 * of endless ascent. The ball follows the step positions and seamlessly loops
 * back to the start, reinforcing the impossible geometry illusion.
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { MODEL_SCALE } from "./PenroseStairs";

interface AnimatedBallProps {
  stepsPerSide?: number;
  stepHeight?: number;
  stepWidth?: number;
  stepDepth?: number;
  speed?: number;
  showTrueGeometry?: boolean;
}

export function AnimatedBall({
  stepsPerSide = 4,
  stepHeight = 0.5,
  stepWidth = 2,
  stepDepth = 2,
  speed = 2,
  showTrueGeometry = false,
}: AnimatedBallProps) {
  const ballRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);

  /**
   * Calculate the path coordinates for the ball to follow.
   * This creates a smooth path along the center of each step.
   */
  const scaledStepHeight = stepHeight * MODEL_SCALE;
  const scaledStepWidth = stepWidth * MODEL_SCALE;
  const scaledStepDepth = stepDepth * MODEL_SCALE;
  const offsetX = (stepsPerSide * scaledStepWidth) / 2;
  const offsetY = (stepsPerSide * scaledStepDepth) / 2;

  const ballRadius = 0.3 * MODEL_SCALE;
  const surfaceClearance = 0.12 * MODEL_SCALE;
  const hoverOffset = ballRadius + surfaceClearance;
  const bounceAmplitude = 0.05 * MODEL_SCALE;

  const pathPoints = useMemo(() => {
    const points: Array<{ x: number; y: number; z: number }> = [];
    const totalSteps = stepsPerSide * 4;

    // Generate path through all steps including up to 3rd orange step (index 14)
    for (let i = 0; i < totalSteps - 1; i++) {
      const side = Math.floor(i / stepsPerSide);
      const stepInSide = i % stepsPerSide;

      let x = 0,
        y = 0,
        z = 0;

      // Calculate position at center of each step
      if (side === 0) {
        // Right side
        x = stepInSide * scaledStepWidth + scaledStepWidth / 2;
        y = scaledStepDepth / 2;
      } else if (side === 1) {
        // Back side
        x = stepsPerSide * scaledStepWidth - scaledStepWidth / 2;
        y = stepInSide * scaledStepDepth + scaledStepDepth / 2;
      } else if (side === 2) {
        // Left side
        x = (stepsPerSide - stepInSide) * scaledStepWidth - scaledStepWidth / 2;
        y = stepsPerSide * scaledStepDepth + scaledStepDepth / 2;
      } else {
        // Forward side (orange)
        x = scaledStepWidth / 2;
        y = (stepsPerSide - stepInSide) * scaledStepDepth - scaledStepDepth / 2;
      }

      x -= offsetX;
      y -= offsetY;

      // Move all orange steps forward to connect with cyan
      if (side === 3) {
        y -= scaledStepDepth;
      }

      // Height calculation
      if (showTrueGeometry) {
        z = i * scaledStepHeight + scaledStepHeight;
      } else {
        z = i * scaledStepHeight + scaledStepHeight;
      }

      points.push({ x, y, z });
    }

    // After 3rd orange step (last point added), jump to 2nd red step
    // 2nd red step is at index 1 (stepInSide = 1, side = 0)
    const x = 1 * scaledStepWidth + scaledStepWidth / 2 - offsetX;
    const y = scaledStepDepth / 2 - offsetY;
    const z = 1 * scaledStepHeight + scaledStepHeight;
    points.push({ x, y, z });

    return points;
  }, [
    stepsPerSide,
    scaledStepHeight,
    scaledStepWidth,
    scaledStepDepth,
    showTrueGeometry,
    offsetX,
    offsetY,
  ]);

  /**
   * Animation loop: smoothly interpolate the ball's position along the path
   */
  useFrame((_state, delta) => {
    if (!ballRef.current) return;

    // Update progress (0 to pathPoints.length)
    progressRef.current += delta * speed;
    if (progressRef.current >= pathPoints.length - 1) {
      progressRef.current = 1; // Loop back to 2nd red step (index 1)
    }

    // Interpolate between current and next point
    const index = Math.floor(progressRef.current);
    const nextIndex = (index + 1) % pathPoints.length;
    const t = progressRef.current - index; // Interpolation factor (0 to 1)

    const current = pathPoints[index];
    const next = pathPoints[nextIndex];

    // Smooth interpolation - adjusted for rotated coordinate system
    // After rotation: original Z becomes Y, original Y becomes -Z
    ballRef.current.position.x = THREE.MathUtils.lerp(current.x, next.x, t);
    ballRef.current.position.y =
      THREE.MathUtils.lerp(current.z, next.z, t) + hoverOffset;
    ballRef.current.position.z = -THREE.MathUtils.lerp(current.y, next.y, t);

    // Add a subtle bounce effect
    const bouncePhase = (Math.sin(progressRef.current * Math.PI * 2) + 1) * 0.5;
    const bounce = bouncePhase * bounceAmplitude;
    ballRef.current.position.y += bounce;
  });

  return (
    <mesh ref={ballRef} castShadow>
      <sphereGeometry args={[ballRadius, 32, 32]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFA500"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}
