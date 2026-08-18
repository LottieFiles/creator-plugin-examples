import Pickr from "@simonwep/pickr";
import "@simonwep/pickr/dist/themes/nano.min.css";
import { useEffect, useRef, useState } from "react";

export const App = () => {
  const [currentColor, setCurrentColor] = useState("#4285f4");
  const pickerRef = useRef<HTMLDivElement>(null);
  const pickrInstance = useRef<Pickr | null>(null);

  useEffect(() => {
    if (!pickerRef.current || pickrInstance.current) return;

    const pickr = Pickr.create({
      el: pickerRef.current,
      theme: "nano",
      default: currentColor,
      components: {
        preview: true,
        hue: true,
        interaction: {
          input: true,
        },
      },
    });

    pickr.on("change", (color: Pickr.HSVaColor) => {
      const hex = color.toHEXA().toString();
      setCurrentColor(hex);
    });

    pickr.on("hide", () => {
      pickr.applyColor();
    });

    pickrInstance.current = pickr;

    return () => {
      pickr.destroyAndRemove();
      pickrInstance.current = null;
    };
  }, []);

  const handleClick = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "create-colored-shape",
          color: currentColor,
        },
      },
      "*"
    );
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>External Libraries</h3>
      <p style={styles.description}>Using an external color picker library.</p>

      <div style={styles.infoBox}>
        This example uses <code style={styles.code}>@simonwep/pickr</code>{" "}
        installed via npm and bundled with Vite.
      </div>

      <div style={styles.pickerContainer}>
        <div ref={pickerRef}></div>
        <div style={styles.colorValue}>{currentColor}</div>
      </div>

      <button style={styles.button} onClick={handleClick}>
        Create shape with color
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: 16,
    margin: 0,
    background: "#1e1e1e",
    color: "#fff",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  heading: {
    margin: "0 0 8px 0",
    fontSize: 18,
    fontWeight: 600,
    color: "#00C1A2",
  },
  description: {
    margin: "0 0 16px 0",
    fontSize: 13,
    color: "#888",
  },
  infoBox: {
    background: "#2a2a2a",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 12,
    color: "#888",
    lineHeight: 1.5,
  },
  code: {
    background: "#3a3a3a",
    padding: "2px 6px",
    borderRadius: 4,
    fontFamily: "monospace",
  },
  pickerContainer: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  colorValue: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#888",
  },
  button: {
    background: "#f5f5f5",
    color: "#1e1e1e",
    border: "none",
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    width: "100%",
  },
};
