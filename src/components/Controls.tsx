/**
 * Controls Component
 *
 * Interactive controls panel for toggling between illusion and true geometry views,
 * adjusting animation speed, and accessing educational information.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Controls.css";

interface ControlsProps {
  illusionType: "stairs" | "triangle";
  onToggleIllusionType: () => void;
  showTrueGeometry: boolean;
  onToggleGeometry: () => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  animationSpeed: number;
  onSpeedChange: (speed: number) => void;
  onShowInfo: () => void;
}

export function Controls({
  illusionType,
  onToggleIllusionType,
  showTrueGeometry,
  onToggleGeometry,
  autoRotate,
  onToggleAutoRotate,
  animationSpeed,
  onSpeedChange,
  onShowInfo,
}: ControlsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="controls-panel"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="collapse-button"
              onClick={() => setIsExpanded(false)}
              aria-label="Collapse controls"
              title="Hide controls"
            >
              ✕
            </button>

            <div className="control-group">
              <h3>🎮 View Controls</h3>

              {/* Toggle Illusion Type */}
              <div className="control-item">
                <label>
                  Illusion Type:
                  <span className={`mode-indicator illusion-type`}>
                    {illusionType === "stairs"
                      ? "🪜 Penrose Stairs"
                      : "🔺 Penrose Triangle"}
                  </span>
                </label>
                <button
                  className="toggle-button"
                  onClick={onToggleIllusionType}
                >
                  {illusionType === "stairs"
                    ? "Switch to Triangle"
                    : "Switch to Stairs"}
                </button>
                <p className="control-description">
                  Choose between the impossible staircase and the impossible
                  triangle.
                </p>
              </div>

              {/* Toggle Geometry Button */}
              <div className="control-item">
                <label>
                  View Mode:
                  <span
                    className={`mode-indicator ${
                      showTrueGeometry ? "true" : "illusion"
                    }`}
                  >
                    {showTrueGeometry ? "📐 True Geometry" : "✨ Illusion Mode"}
                  </span>
                </label>
                <button
                  className={`toggle-button ${
                    showTrueGeometry ? "active" : ""
                  }`}
                  onClick={onToggleGeometry}
                >
                  {showTrueGeometry ? "🔍 Show Illusion" : "🎭 Reveal Truth"}
                </button>
                <p className="control-description">
                  {showTrueGeometry
                    ? "Showing the impossible geometry revealed - notice the height discrepancy!"
                    : "The illusion is active - stairs appear to ascend infinitely!"}
                </p>
              </div>

              {/* Auto Rotate Toggle */}
              <div className="control-item">
                <label>
                  <input
                    type="checkbox"
                    checked={autoRotate}
                    onChange={onToggleAutoRotate}
                    className="checkbox"
                  />
                  🔄 Auto-Rotate Camera
                </label>
                <p className="control-description">
                  Automatically rotate the view to see the illusion from
                  different angles.
                </p>
              </div>

              {/* Animation Speed Slider */}
              <div className="control-item">
                <label>
                  ⚡ Animation Speed:{" "}
                  <span className="speed-value">
                    {animationSpeed.toFixed(1)}x
                  </span>
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={animationSpeed}
                  onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                  className="slider"
                />
                <p className="control-description">
                  Adjust how fast the golden ball travels up the stairs.
                </p>
              </div>
            </div>

            {/* Info Button */}
            <button className="info-button" onClick={onShowInfo}>
              ℹ️ Learn About This Illusion
            </button>

            {/* Instructions */}
            <div className="instructions">
              <p>
                🖱️ <strong>Click and drag</strong> to rotate the view
              </p>
              <p>
                🔍 <strong>Scroll</strong> to zoom in/out
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button to show controls when collapsed */}
      {!isExpanded && (
        <motion.button
          className="show-controls-button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsExpanded(true)}
          title="Show controls"
        >
          ⚙️ Controls
        </motion.button>
      )}
    </>
  );
}
