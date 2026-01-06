/**
 * Animating Shape Properties Example
 *
 * Demonstrates how to animate shape-specific properties:
 * - Rectangle: size, roundness
 * - Ellipse: size
 * - Polygon: points, outerRadius, outerRoundness
 * - Star: points, innerRadius, outerRadius
 */

creator.ui.show({ width: 300, height: 380 });

interface Message {
  type: string;
}

creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  switch (msg.type) {
    case "animate-rect-size": {
      const rect = scene.createRectangleContainer({
        position: { x: 150, y: 150 },
      });
      rect.addFill({ type: "SOLID", color: { r: 66, g: 133, b: 244 } });

      // Get the rectangle shape and animate its size
      const shape = rect.shapes[0];
      if (shape && shape.type === "RECTANGLE") {
        const rectShape = shape as { size: { addKeyframes: (keyframes: unknown[]) => void } };
        rectShape.size.addKeyframes([
          { frame: 0, value: { width: 50, height: 50 } },
          { frame: 30, value: { width: 200, height: 100 } },
          { frame: 60, value: { width: 50, height: 50 } },
        ]);
      }
      break;
    }

    case "animate-rect-roundness": {
      const rect = scene.createRectangleContainer({
        position: { x: 150, y: 150 },
        shape: { size: { width: 150, height: 150 } },
      });
      rect.addFill({ type: "SOLID", color: { r: 234, g: 67, b: 53 } });

      // Animate roundness from sharp to fully rounded
      const shape = rect.shapes[0];
      if (shape && shape.type === "RECTANGLE") {
        const rectShape = shape as { roundness: { addKeyframes: (keyframes: unknown[]) => void } };
        rectShape.roundness.addKeyframes([
          { frame: 0, value: 0 },
          { frame: 30, value: 75 },
          { frame: 60, value: 0 },
        ]);
      }
      break;
    }

    case "animate-polygon-points": {
      const polygon = scene.createPolygonContainer({
        position: { x: 150, y: 150 },
        shape: { outerRadius: 80 },
      });
      polygon.addFill({ type: "SOLID", color: { r: 251, g: 188, b: 5 } });

      // Animate number of points (triangle to octagon)
      const shape = polygon.shapes[0];
      if (shape && shape.type === "POLYGON") {
        const polyShape = shape as { points: { addKeyframes: (keyframes: unknown[]) => void } };
        polyShape.points.addKeyframes([
          { frame: 0, value: 3 },
          { frame: 30, value: 8 },
          { frame: 60, value: 3 },
        ]);
      }
      break;
    }

    case "animate-star-radius": {
      const star = scene.createStarContainer({
        position: { x: 150, y: 150 },
        shape: {
          points: 5,
          outerRadius: 80,
        },
      });
      star.addFill({ type: "SOLID", color: { r: 52, g: 168, b: 83 } });

      // Animate inner radius to create a pulsing star effect
      const shape = star.shapes[0];
      if (shape && shape.type === "STAR") {
        const starShape = shape as { innerRadius: { addKeyframes: (keyframes: unknown[]) => void } };
        starShape.innerRadius.addKeyframes([
          { frame: 0, value: 20 },
          { frame: 30, value: 60 },
          { frame: 60, value: 20 },
        ]);
      }
      break;
    }

    case "animate-ellipse-size": {
      const ellipse = scene.createEllipseContainer({
        position: { x: 150, y: 150 },
      });
      ellipse.addFill({ type: "SOLID", color: { r: 156, g: 39, b: 176 } });

      // Animate from circle to wide ellipse
      const shape = ellipse.shapes[0];
      if (shape && shape.type === "ELLIPSE") {
        const ellipseShape = shape as { size: { addKeyframes: (keyframes: unknown[]) => void } };
        ellipseShape.size.addKeyframes([
          { frame: 0, value: { width: 100, height: 100 } },
          { frame: 30, value: { width: 200, height: 60 } },
          { frame: 60, value: { width: 100, height: 100 } },
        ]);
      }
      break;
    }
  }
});
