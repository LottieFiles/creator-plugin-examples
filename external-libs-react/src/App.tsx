/**
 * External Libraries Example (React)
 *
 * Demonstrates how to use npm packages in a React plugin.
 * This example uses react-colorful for a color picker.
 */

import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: 20,
    backgroundColor: "#1e1e1e",
    color: "#fff",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  heading: {
    margin: "0 0 8px 0",
    fontSize: 16,
    fontWeight: 600,
  },
  description: {
    margin: "0 0 16px 0",
    fontSize: 13,
    color: "#999",
    lineHeight: 1.5,
  },
  infoBox: {
    background: "#2a2a2a",
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    fontSize: 12,
    color: "#888",
    lineHeight: 1.5,
  },
  code: {
    background: "#333",
    padding: "2px 6px",
    borderRadius: 3,
    fontFamily: "monospace",
    fontSize: 11,
  },
  pickerWrapper: {
    marginBottom: 16,
  },
  colorInfo: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    border: "2px solid #444",
  },
  colorValue: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#ccc",
  },
  buttons: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  button: {
    background: "#333",
    color: "white",
    border: "1px solid #444",
    padding: "12px 16px",
    borderRadius: 6,
    fontSize: 14,
    cursor: "pointer",
  },
  primaryButton: {
    background: "#0066ff",
    color: "white",
    border: "1px solid #0066ff",
    padding: "12px 16px",
    borderRadius: 6,
    fontSize: 14,
    cursor: "pointer",
  },
};

export function App() {
  const [color, setColor] = useState("#4285f4");

  const handleCreateShape = () => {
    parent.postMessage(
      { pluginMessage: { type: "create-colored-shape", color } },
      "*"
    );
  };

  const handleApplyToSelected = () => {
    parent.postMessage(
      { pluginMessage: { type: "apply-to-selected", color } },
      "*"
    );
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>External Libraries (React)</h3>
      <p style={styles.description}>
        Using npm packages in a React plugin with Vite bundling.
      </p>

      <div style={styles.infoBox}>
        This example uses <code style={styles.code}>react-colorful</code> installed via{" "}
        <code style={styles.code}>npm install react-colorful</code>. Vite bundles it
        automatically.
      </div>

      <div style={styles.pickerWrapper}>
        <HexColorPicker color={color} onChange={setColor} />
        <div style={styles.colorInfo}>
          <div style={{ ...styles.colorPreview, background: color }} />
          <span style={styles.colorValue}>{color}</span>
        </div>
      </div>

      <div style={styles.buttons}>
        <button
          style={styles.primaryButton}
          onClick={handleCreateShape}
          onMouseOver={(e) => (e.currentTarget.style.background = "#0052cc")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#0066ff")}
        >
          Create Shape with Color
        </button>
        <button
          style={styles.button}
          onClick={handleApplyToSelected}
          onMouseOver={(e) => (e.currentTarget.style.background = "#444")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#333")}
        >
          Apply to Selected
        </button>
      </div>
    </div>
  );
}
