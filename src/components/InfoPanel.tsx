/**
 * InfoPanel Component
 *
 * Educational overlay explaining the Penrose stairs illusion.
 * Provides context about how and why the illusion works.
 */

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./InfoPanel.css";

interface InfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoPanel({ isOpen, onClose }: InfoPanelProps) {
  // Handle Escape key to close panel
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="info-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="info-panel"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={onClose}
              aria-label="Close info panel"
              title="Close (or press Escape)"
            >
              ✕
            </button>

            <h2>🧩 Understanding the Penrose Stairs Illusion</h2>

            <section className="info-section">
              <h3>🔍 What Is It?</h3>
              <p>
                The Penrose stairs (also called the "impossible staircase") is
                an optical illusion depicting a staircase that appears to ascend
                or descend continuously in a loop. This is physically impossible
                in three-dimensional Euclidean space.
              </p>
            </section>

            <section className="info-section">
              <h3>🎨 How It Works</h3>
              <div className="principle-grid">
                <div className="principle">
                  <span className="principle-icon">👁️</span>
                  <h4>Forced Perspective</h4>
                  <p>
                    Each local connection between steps follows proper
                    perspective rules, tricking your brain into seeing a
                    consistent 3D structure.
                  </p>
                </div>
                <div className="principle">
                  <span className="principle-icon">🔄</span>
                  <h4>Continuous Edges</h4>
                  <p>
                    Unbroken lines create the perception of a continuous path,
                    even though globally the geometry is impossible.
                  </p>
                </div>
                <div className="principle">
                  <span className="principle-icon">🎭</span>
                  <h4>Strategic Occlusion</h4>
                  <p>
                    The "trick" happens at one corner where the heights don't
                    actually match, but this joint is hidden from the ideal
                    viewing angle.
                  </p>
                </div>
                <div className="principle">
                  <span className="principle-icon">🧠</span>
                  <h4>Perceptual Conflict</h4>
                  <p>
                    Your brain processes local depth cues and assumes global
                    consistency, creating the illusion of an impossible object.
                  </p>
                </div>
              </div>
            </section>

            <section className="info-section">
              <h3>🚫 Why It Can't Exist in Reality</h3>
              <p>
                In real 3D space, if you climb <em>N</em> steps of height{" "}
                <em>H</em>, your total elevation change is <em>N × H</em>. For a
                closed loop (returning to the start), the net elevation change{" "}
                <strong>must be zero</strong>.
              </p>
              <p>
                The Penrose stairs violates this by appearing to ascend
                continuously while forming a closed loop—an impossibility that
                only works as a 2D drawing or carefully angled 3D render.
              </p>
            </section>

            <section className="info-section">
              <h3>🎓 Psychology of the Illusion</h3>
              <p>Human visual perception relies on:</p>
              <ul>
                <li>✓ Edge detection and line continuity</li>
                <li>✓ Perspective cues (parallel lines, occlusion)</li>
                <li>✓ Assumptions about 3D structure from 2D views</li>
                <li>✓ Local consistency checking (not global verification)</li>
              </ul>
              <p>
                The illusion exploits these by providing{" "}
                <strong>locally consistent</strong> visual cues that lead to a{" "}
                <strong>globally impossible</strong> interpretation.
              </p>
            </section>

            <section className="info-section credits">
              <h3>📚 Historical Context</h3>
              <p>
                Created by geneticist <strong>Lionel Penrose</strong> and
                mathematician <strong>Roger Penrose</strong> in 1959. Famously
                depicted in M.C. Escher's 1960 lithograph{" "}
                <em>"Ascending and Descending"</em>.
              </p>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
