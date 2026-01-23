creator.ui.show({ width: 300, height: 320 });

interface Message {
  type: "create-colored-shape";
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
  if (msg.type === "create-colored-shape" && msg.color) {
    const rgb = hexToRgb(msg.color);
    const scene = creator.activeScene;

    // Create rectangle at center of scene
    const layer = scene.createShapeLayer({
      position: { x: scene.size.width / 2, y: scene.size.height / 2 },
    });
    layer.createRectangle({ size: { width: 120, height: 120 }, roundness: 12 });

    // Add a fill with the selected color
    layer.createFill({ type: "SOLID", color: rgb });
  }
});
