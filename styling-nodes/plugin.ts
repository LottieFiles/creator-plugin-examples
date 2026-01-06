/**
 * Styling Nodes Example
 *
 * Demonstrates how to style shapes with:
 * - Solid color fills
 * - Linear gradients
 * - Radial gradients
 * - Strokes with various properties
 */

creator.ui.show({ width: 300, height: 420 });

interface Message {
  type: string;
  color?: { r: number; g: number; b: number };
}

creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  switch (msg.type) {
    case "solid-fill": {
      const rect = scene.createRectangleContainer({
        position: { x: 100, y: 100 },
        shape: { size: { width: 150, height: 150 } },
      });

      // Add a solid color fill
      rect.addFill({
        type: "SOLID",
        color: msg.color || { r: 66, g: 133, b: 244 },
      });
      break;
    }

    case "linear-gradient": {
      const rect = scene.createRectangleContainer({
        position: { x: 100, y: 100 },
        shape: { size: { width: 150, height: 150 } },
      });

      // Add a linear gradient fill
      rect.addFill({
        type: "GRADIENT_LINEAR",
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        stops: [
          { offset: 0, color: { r: 102, g: 126, b: 234 }, opacity: 1 },
          { offset: 1, color: { r: 118, g: 75, b: 162 }, opacity: 1 },
        ],
      });
      break;
    }

    case "radial-gradient": {
      const ellipse = scene.createEllipseContainer({
        position: { x: 100, y: 100 },
        shape: { size: { width: 150, height: 150 } },
      });

      // Add a radial gradient fill
      ellipse.addFill({
        type: "GRADIENT_RADIAL",
        start: { x: 0.3, y: 0.3 },
        end: { x: 0.5, y: 0.5 },
        stops: [
          { offset: 0, color: { r: 255, g: 255, b: 255 }, opacity: 1 },
          { offset: 0.5, color: { r: 255, g: 193, b: 7 }, opacity: 1 },
          { offset: 1, color: { r: 255, g: 87, b: 34 }, opacity: 1 },
        ],
      });
      break;
    }

    case "stroke-solid": {
      const rect = scene.createRectangleContainer({
        position: { x: 100, y: 100 },
        shape: { size: { width: 150, height: 150 } },
      });

      // Add a solid stroke
      rect.addStroke({
        fill: { type: "SOLID", color: { r: 33, g: 33, b: 33 } },
        width: 4,
      });
      break;
    }

    case "stroke-dashed": {
      const rect = scene.createRectangleContainer({
        position: { x: 100, y: 100 },
        shape: { size: { width: 150, height: 150 } },
      });

      // Add a stroke (note: dashed strokes not supported in current API)
      rect.addStroke({
        fill: { type: "SOLID", color: { r: 76, g: 175, b: 80 } },
        width: 3,
      });
      break;
    }

    case "combined": {
      const star = scene.createStarContainer({
        position: { x: 150, y: 150 },
        shape: {
          points: 5,
          innerRadius: 40,
          outerRadius: 80,
        },
      });

      // Add gradient fill
      star.addFill({
        type: "GRADIENT_LINEAR",
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        stops: [
          { offset: 0, color: { r: 255, g: 215, b: 0 }, opacity: 1 },
          { offset: 1, color: { r: 255, g: 152, b: 0 }, opacity: 1 },
        ],
      });

      // Add stroke
      star.addStroke({
        fill: { type: "SOLID", color: { r: 230, g: 81, b: 0 } },
        width: 2,
      });
      break;
    }
  }
});
