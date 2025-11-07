/**
 * Main App Component
 *
 * The Penrose Stairs Illusion - An Interactive 3D Educational Demonstration
 *
 * This application demonstrates the famous Penrose stairs optical illusion,
 * an impossible staircase that appears to ascend continuously in a closed loop.
 * Users can interact with the scene to understand how perspective and geometry
 * manipulation create the illusion of infinite ascent.
 */

import { useState } from "react";
import { Scene } from "./components/Scene";
import { Controls } from "./components/Controls";
import { InfoPanel } from "./components/InfoPanel";
import "./App.css";

function App() {
  const [illusionType, setIllusionType] = useState<
    "stairs" | "triangle" | "cube"
  >("stairs");
  const [showTrueGeometry, setShowTrueGeometry] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  const getTitle = () => {
    switch (illusionType) {
      case "stairs":
        return "The Penrose Stairs Illusion";
      case "triangle":
        return "The Penrose Triangle Illusion";
      case "cube":
        return "The Impossible Cube Illusion";
    }
  };

  const getSubtitle = () => {
    switch (illusionType) {
      case "stairs":
        return "An Impossible Staircase in 3D";
      case "triangle":
        return "An Impossible Triangle in 3D";
      case "cube":
        return "The Escher Cube - Ambiguous Perspective";
    }
  };

  const cycleIllusionType = () => {
    if (illusionType === "stairs") {
      setIllusionType("triangle");
    } else if (illusionType === "triangle") {
      setIllusionType("cube");
    } else {
      setIllusionType("stairs");
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>🏛️ {getTitle()}</h1>
        <p className="subtitle">{getSubtitle()}</p>
      </header>

      {/* 3D Scene */}
      <div className="scene-container">
        <Scene
          illusionType={illusionType}
          showTrueGeometry={showTrueGeometry}
          autoRotate={autoRotate}
          animationSpeed={animationSpeed}
        />
      </div>

      {/* Interactive Controls */}
      <Controls
        illusionType={illusionType}
        onToggleIllusionType={cycleIllusionType}
        showTrueGeometry={showTrueGeometry}
        onToggleGeometry={() => setShowTrueGeometry(!showTrueGeometry)}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        animationSpeed={animationSpeed}
        onSpeedChange={setAnimationSpeed}
        onShowInfo={() => setShowInfo(true)}
      />

      {/* Educational Info Panel */}
      <InfoPanel isOpen={showInfo} onClose={() => setShowInfo(false)} />

      {/* Floating Status Badge */}
      <div className="status-badge">
        {showTrueGeometry ? (
          <span className="status-true">📐 True Geometry Revealed</span>
        ) : (
          <span className="status-illusion">✨ Illusion Active</span>
        )}
      </div>
    </div>
  );
}

export default App;
