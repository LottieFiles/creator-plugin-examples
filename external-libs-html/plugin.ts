/**
 * External Libraries Example (HTML/JS)
 *
 * Demonstrates how to use external JavaScript libraries via CDN
 * in a plain HTML/JS plugin. This example uses a color picker library.
 */

creator.ui.show({ width: 300, height: 400 });

interface Message {
  type: string;
  color?: string;
}

// Helper to parse hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      }
    : { r: 0, g: 0, b: 0 };
}

creator.ui.onMessage((msg: Message) => {
  switch (msg.type) {
    case "create-colored-shape": {
      if (!msg.color) return;

      const rgb = hexToRgb(msg.color);
      const rect = creator.activeScene.createRectangleContainer({
        position: { x: 150, y: 150 },
        shape: { size: { width: 120, height: 120 }, roundness: 12 },
      });
      rect.addFill({ type: "SOLID", color: rgb });
      break;
    }

    case "apply-to-selected": {
      if (!msg.color) return;

      const rgb = hexToRgb(msg.color);
      const selection = creator.selection.nodes;

      for (const node of selection) {
        // Check if node supports fills
        if ("fills" in node && "addFill" in node) {
          const container = node as {
            fills: unknown[];
            addFill: (fill: { type: string; color: { r: number; g: number; b: number } }) => void;
            removeFill: (fill: unknown) => void;
          };

          // Remove existing fills
          while (container.fills.length > 0) {
            container.removeFill(container.fills[0]);
          }

          // Add new fill
          container.addFill({ type: "SOLID", color: rgb });
        }
      }
      break;
    }
  }
});
