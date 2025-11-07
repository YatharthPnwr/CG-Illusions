/**
 * ImpossibleCube Component
 *
 * Creates the impossible cube illusion (also known as the Escher cube or
 * irrational cube). This 3D structure appears to be a cube with
 * ambiguous/impossible depth cues - the corners connect in ways that
 * cannot exist in real 3D space.
 */

import * as THREE from "three";

interface ImpossibleCubeProps {
  size?: number;
  showTrueGeometry?: boolean;
}

const CUBE_SCALE = 3.0;

export function ImpossibleCube({
  size = 4,
  showTrueGeometry = false,
}: ImpossibleCubeProps) {
  const scaledSize = size * CUBE_SCALE;
  const lineWidth = scaledSize * 0.12;

  return (
    <group rotation={[Math.PI / 8, Math.PI / 4, 0]} position={[0, 10, 0]}>
      {/* Outer square frame (back) */}
      <group position={[-scaledSize / 4, scaledSize / 4, lineWidth * 0.01]}>
        {/* Top edge */}
        <mesh position={[0, scaledSize / 2, 0]} castShadow>
          <boxGeometry args={[scaledSize, lineWidth, lineWidth]} />
          <meshStandardMaterial
            color={showTrueGeometry ? "#FF6B6B" : "#404040"}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        {/* Right edge */}
        <mesh position={[scaledSize / 2, 0, 0]} castShadow>
          <boxGeometry args={[lineWidth, scaledSize, lineWidth]} />
          <meshStandardMaterial
            color={showTrueGeometry ? "#FFD93D" : "#303030"}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        {/* Bottom edge */}
        <mesh position={[0, -scaledSize / 2, 0]} castShadow>
          <boxGeometry args={[scaledSize, lineWidth, lineWidth]} />
          <meshStandardMaterial
            color={showTrueGeometry ? "#4ECDC4" : "#505050"}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        {/* Left edge */}
        <mesh position={[-scaledSize / 2, 0, 0]} castShadow>
          <boxGeometry args={[lineWidth, scaledSize, lineWidth]} />
          <meshStandardMaterial
            color={showTrueGeometry ? "#95E1D3" : "#606060"}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
      </group>

      {/* Inner square frame (front) */}
      <group position={[scaledSize / 4, -scaledSize / 4, lineWidth * 1.6]}>
        {/* Top edge */}
        <mesh position={[0, scaledSize / 2, 0]} castShadow>
          <boxGeometry args={[scaledSize, lineWidth, lineWidth]} />
          <meshStandardMaterial
            color={showTrueGeometry ? "#A0A0FF" : "#707070"}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        {/* Right edge */}
        <mesh position={[scaledSize / 2, 0, 0]} castShadow>
          <boxGeometry args={[lineWidth, scaledSize, lineWidth]} />
          <meshStandardMaterial
            color={showTrueGeometry ? "#FFA0FF" : "#909090"}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        {/* Bottom edge */}
        <mesh position={[0, -scaledSize / 2, 0]} castShadow>
          <boxGeometry args={[scaledSize, lineWidth, lineWidth]} />
          <meshStandardMaterial
            color={showTrueGeometry ? "#A0FFA0" : "#909090"}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
        {/* Left edge */}
        <mesh position={[-scaledSize / 2, 0, 0]} castShadow>
          <boxGeometry args={[lineWidth, scaledSize, lineWidth]} />
          <meshStandardMaterial
            color={showTrueGeometry ? "#FFA0A0" : "#909090"}
            roughness={0.7}
            metalness={0.3}
            transparent={false}
            opacity={1}
          />
        </mesh>
      </group>

      {/* Connecting edges - these create the impossible effect */}
      {/* Use thin cylinders instead of lines for better visibility */}
      {/* Top-left corner connection */}
      <mesh
        position={[
          (-scaledSize / 4 - scaledSize / 2 + scaledSize / 4 - scaledSize / 2) /
            2,
          (scaledSize / 4 + scaledSize / 2 + -scaledSize / 4 + scaledSize / 2) /
            2,
          0,
        ]}
        rotation={[9.5, 0, Math.PI / 4]}
        castShadow
      >
        <boxGeometry
          args={[
            (scaledSize * Math.SQRT2) / 2,
            lineWidth * 0.8,
            lineWidth * 0.8,
          ]}
        />
        <meshStandardMaterial
          color={showTrueGeometry ? "#FF0000" : "#202020"}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Top-right corner connection */}
      <mesh
        position={[
          (-scaledSize / 4 + scaledSize / 2 + scaledSize / 4 + scaledSize / 2) /
            2,
          (scaledSize / 4 + scaledSize / 2 + -scaledSize / 4 + scaledSize / 2) /
            2,
          0,
        ]}
        rotation={[0, 0, -Math.PI / 4]}
        castShadow
      >
        <boxGeometry
          args={[
            (scaledSize * Math.SQRT2) / 2,
            lineWidth * 0.8,
            lineWidth * 0.8,
          ]}
        />
        <meshStandardMaterial
          color={showTrueGeometry ? "#00FF00" : "#202020"}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Bottom-right corner connection */}
      <mesh
        position={[
          (-scaledSize / 4 + scaledSize / 2 + scaledSize / 4 + scaledSize / 2) /
            2,
          (scaledSize / 4 - scaledSize / 2 + -scaledSize / 4 - scaledSize / 2) /
            2,
          0,
        ]}
        rotation={[9.2, 0, Math.PI / 4]}
        castShadow
      >
        <boxGeometry
          args={[
            (scaledSize * Math.SQRT2) / 2,
            lineWidth * 0.8,
            lineWidth * 0.8,
          ]}
        />
        <meshStandardMaterial
          color={showTrueGeometry ? "#0000FF" : "#202020"}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Bottom-left corner connection */}
      <mesh
        position={[
          (-scaledSize / 4 - scaledSize / 2 + scaledSize / 4 - scaledSize / 2) /
            2,
          (scaledSize / 4 - scaledSize / 2 + -scaledSize / 4 - scaledSize / 2) /
            2,
          0,
        ]}
        rotation={[0, 0, -Math.PI / 4.5]}
        castShadow
      >
        <boxGeometry
          args={[
            (scaledSize * Math.SQRT2) / 2,
            lineWidth * 0.8,
            lineWidth * 0.8,
          ]}
        />
        <meshStandardMaterial
          color={showTrueGeometry ? "#FFFF00" : "#202020"}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

export { CUBE_SCALE };
