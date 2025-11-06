/**
 * PenroseStairs Component
 *
 * Creates the 3D Penrose stairs illusion - an impossible staircase that appears
 * to ascend continuously in a closed loop. This illusion works by carefully
 * manipulating perspective and hiding the impossible joint.
 *
 * Key principles:
 * 1. Four flights of stairs arranged in a square
 * 2. Each step appears to be higher than the previous
 * 3. The "trick" happens at one corner where heights don't match geometrically
 * 4. Only works from specific viewing angles
 */

import { useMemo } from "react";
import * as THREE from "three";

interface PenroseStairsProps {
  stepsPerSide?: number;
  stepHeight?: number;
  stepDepth?: number;
  showTrueGeometry?: boolean;
}

export const MODEL_SCALE = 1.8; // Uniform scale factor for the staircase dimensions

export function PenroseStairs({
  stepsPerSide = 4,
  stepHeight = 0.5,
  stepDepth = 2,
  showTrueGeometry = false,
}: PenroseStairsProps) {
  /**
   * Generate the step geometries for the Penrose stairs.
   *
   * In "illusion mode", we cheat the geometry so it appears to ascend continuously
   * In "true geometry mode", we reveal the actual 3D structure (not a perfect loop)
   */
  const steps = useMemo(() => {
    const stepArray: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
      color: string;
      side: number;
      stepIndex: number;
    }> = [];

    const totalSteps = stepsPerSide * 4;
    const colors = [
      "#FF6B6B", // Red side
      "#4ECDC4", // Cyan side
      "#45B7D1", // Blue side
      "#FFA07A", // Orange side
    ];

    const unitLength = stepDepth * MODEL_SCALE;
    const stepRise = stepHeight * MODEL_SCALE;
    const centerOffset = (stepsPerSide * unitLength) / 2;

    for (let i = 0; i < totalSteps; i++) {
      // Which side of the square (0=right, 1=back, 2=left, 3=forward)
      const side = Math.floor(i / stepsPerSide);
      const stepInSide = i % stepsPerSide;

      let x = 0,
        y = 0,
        z = 0,
        rotationY = 0;

      // Calculate position based on which side we're on
      if (side === 0) {
        // Right side: moving in +X direction
        x = stepInSide * unitLength;
        y = 0;
        rotationY = 0;
      } else if (side === 1) {
        // Back side: moving in +Y direction
        x = stepsPerSide * unitLength;
        y = stepInSide * unitLength;
        rotationY = Math.PI / 2;
      } else if (side === 2) {
        // Left side: moving in -X direction
        x = (stepsPerSide - stepInSide) * unitLength;
        y = stepsPerSide * unitLength;
        rotationY = Math.PI;
      } else {
        // Forward side: moving in -Y direction
        x = 0;
        y = (stepsPerSide - stepInSide) * unitLength;
        rotationY = -Math.PI / 2;
      }

      // Height calculation: THE KEY TO THE ILLUSION
      if (showTrueGeometry) {
        // True geometry: reveal the height discrepancy
        z = i * stepRise;
      } else {
        // Illusion mode: create the impossible loop
        // On the last step, we "cheat" by not adding height
        // This creates the visual paradox
        if (i < totalSteps - 1) {
          z = i * stepRise;
        } else {
          // Last step connects back to first - creating impossibility
          z = 0;
        }
      }

      x -= centerOffset;
      y -= centerOffset;

      const adjustedRotationY =
        side === 1 || side === 3 ? rotationY + Math.PI / 2 : rotationY;

      stepArray.push({
        position: [x, y, z],
        rotation: [0, adjustedRotationY, 0],
        color: colors[side],
        side,
        stepIndex: i,
      });
    }

    return stepArray;
  }, [stepsPerSide, stepHeight, stepDepth, showTrueGeometry]);

  return (
    <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {steps.map((step, index) => (
        <Step
          key={index}
          position={step.position}
          rotation={step.rotation}
          color={step.color}
          width={stepDepth * MODEL_SCALE}
          height={stepHeight * MODEL_SCALE}
          depth={stepDepth * MODEL_SCALE}
          opacity={1}
        />
      ))}
    </group>
  );
}

/**
 * Individual Step Component
 * Renders a single step of the staircase with proper dimensions
 */
interface StepProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  width: number;
  height: number;
  depth: number;
  opacity: number;
}

function Step({
  position,
  rotation,
  color,
  width,
  height,
  depth,
  opacity,
}: StepProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Vertical riser (front face of step) */}
      <mesh position={[width / 2, depth / 2, height / 2]}>
        <boxGeometry args={[width, depth, height]} />
        <meshStandardMaterial
          color={color}
          transparent={opacity < 1}
          opacity={opacity}
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>

      {/* Add edge lines for better visibility */}
      <lineSegments position={[width / 2, depth / 2, height / 2]}>
        <edgesGeometry args={[new THREE.BoxGeometry(width, depth, height)]} />
        <lineBasicMaterial color="#000000" linewidth={2} />
      </lineSegments>
    </group>
  );
}
