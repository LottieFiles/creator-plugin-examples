/**
 * Basic Plugin Example (React)
 *
 * This example shows how to build a Creator plugin using React.
 * It has the same functionality as basic-plugin-html but uses React components.
 */

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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

export function App() {
  const handleClick = () => {
    // Send a message to the plugin code
    parent.postMessage({ pluginMessage: { type: "create-rectangle" } }, "*");
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Basic Plugin (React)</h3>
      <p style={styles.description}>
        Click the button to create a rectangle in the scene.
      </p>
      <button
        style={styles.button}
        onClick={handleClick}
        onMouseOver={(e) => (e.currentTarget.style.background = "#e8e8e8")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#f5f5f5")}
      >
        Create rectangle
      </button>
    </div>
  );
}
