/**
 * PenroseTriangle Component
 *
 * Creates the 3D Penrose triangle (impossible triangle) illusion.
 * Three bars arranged in a triangular configuration where each appears
 * to connect to the others at right angles - an impossible geometry.
 *
 * The illusion works by carefully manipulating perspective and creating
 * impossible joints that only work from specific viewing angles.
 */

import { useMemo } from "react";
import * as THREE from "three";

interface PenroseTriangleProps {
  barWidth?: number;
  barThickness?: number;
  triangleSize?: number;
  showTrueGeometry?: boolean;
}

const TRIANGLE_SCALE = 2.5;

export function PenroseTriangle({
  barWidth = 1,
  triangleSize = 4,
  showTrueGeometry = false,
}: PenroseTriangleProps) {
  const scaledBarWidth = barWidth * TRIANGLE_SCALE;
  const scaledTriangleSize = triangleSize * TRIANGLE_SCALE;

  /**
   * Generate the three bars of the Penrose triangle
   * Simple three-bar configuration forming an equilateral triangle
   */
  const bars = useMemo(() => {
    const segments: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
      dimensions: [number, number, number];
      color: string;
    }> = [];

    const size = scaledTriangleSize;
    const thickness = scaledBarWidth;

    // Height of equilateral triangle
    const height = size * 0.866;

    const depthOffset = showTrueGeometry ? thickness * 1.5 : 0;

    // Bottom bar (Red) - horizontal base at the bottom
    segments.push({
      position: [0, height * 0.6, 0],
      rotation: [0, 0, 0],
      dimensions: [size, thickness, thickness],
      color: "#FF6B6B",
    });

    // Right bar (Cyan) - from bottom-right to top
    segments.push({
      position: [size / 4, height * 0.17, showTrueGeometry ? depthOffset : 0],
      rotation: [0, 0, Math.PI / 3],
      dimensions: [size, thickness, thickness],
      color: "#4ECDC4",
    });

    // Left bar (Blue) - from top to bottom-left
    segments.push({
      position: [
        -size / 2.9,
        height * 0.21,
        showTrueGeometry ? depthOffset * 2.5 : 0,
      ],
      rotation: [0, 0.55, -Math.PI / 3.5],
      dimensions: [size, thickness, thickness],
      color: "#45B7D1",
    });

    return segments;
  }, [scaledBarWidth, scaledTriangleSize, showTrueGeometry]);

  return (
    <group position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {bars.map((segment, index) => (
        <Segment
          key={index}
          position={segment.position}
          rotation={segment.rotation}
          color={segment.color}
          dimensions={segment.dimensions}
        />
      ))}
    </group>
  );
}

/**
 * Individual Segment Component
 * Renders a single segment of the Penrose triangle
 */
interface SegmentProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  dimensions: [number, number, number];
}

function Segment({ position, rotation, color, dimensions }: SegmentProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <boxGeometry args={dimensions} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Edge lines for better visibility */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...dimensions)]} />
        <lineBasicMaterial color="#000000" linewidth={2} />
      </lineSegments>
    </group>
  );
}

export { TRIANGLE_SCALE };
