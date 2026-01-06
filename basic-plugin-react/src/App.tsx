/**
 * Basic Plugin Example (React)
 *
 * This example shows how to build a Creator plugin using React.
 * It has the same functionality as basic-plugin-html but uses React components.
 */

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
    margin: "0 0 16px 0",
    fontSize: 16,
    fontWeight: 600,
  },
  description: {
    margin: "0 0 16px 0",
    fontSize: 13,
    color: "#999",
    lineHeight: 1.5,
  },
  button: {
    background: "#0066ff",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: 6,
    fontSize: 14,
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
        onMouseOver={(e) => (e.currentTarget.style.background = "#0052cc")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#0066ff")}
      >
        Create Rectangle
      </button>
    </div>
  );
}
