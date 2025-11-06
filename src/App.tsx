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
  const [showTrueGeometry, setShowTrueGeometry] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>🏛️ The Penrose Stairs Illusion</h1>
        <p className="subtitle">An Impossible Staircase in 3D</p>
      </header>

      {/* 3D Scene */}
      <div className="scene-container">
        <Scene
          showTrueGeometry={showTrueGeometry}
          autoRotate={autoRotate}
          animationSpeed={animationSpeed}
        />
      </div>

      {/* Interactive Controls */}
      <Controls
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
