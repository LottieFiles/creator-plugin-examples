/**
 * Creating Shapes Example
 *
 * Demonstrates how to create different shape types using the Creator API:
 * - Rectangle
 * - Ellipse
 * - Polygon
 * - Star
 * - Path (custom vector shape)
 */

creator.ui.show({ width: 300, height: 380 });

interface Message {
  type:
    | "create-rectangle"
    | "create-ellipse"
    | "create-polygon"
    | "create-star"
    | "create-path";
}

creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  switch (msg.type) {
    case "create-rectangle": {
      const rect = scene.createRectangleContainer({
        position: { x: 100, y: 100 },
        shape: {
          size: { width: 200, height: 150 },
          roundness: 10,
        },
      });
      rect.addFill({ type: "SOLID", color: { r: 66, g: 133, b: 244 } });
      break;
    }

    case "create-ellipse": {
      const ellipse = scene.createEllipseContainer({
        position: { x: 100, y: 100 },
        shape: { size: { width: 200, height: 150 } },
      });
      ellipse.addFill({ type: "SOLID", color: { r: 234, g: 67, b: 53 } });
      break;
    }

    case "create-polygon": {
      const polygon = scene.createPolygonContainer({
        position: { x: 150, y: 150 },
        shape: {
          points: 6,
          outerRadius: 80,
          outerRoundness: 0,
        },
      });
      polygon.addFill({ type: "SOLID", color: { r: 251, g: 188, b: 5 } });
      break;
    }

    case "create-star": {
      const star = scene.createStarContainer({
        position: { x: 150, y: 150 },
        shape: {
          points: 5,
          innerRadius: 40,
          outerRadius: 80,
          innerRoundness: 0,
          outerRoundness: 0,
        },
      });
      star.addFill({ type: "SOLID", color: { r: 52, g: 168, b: 83 } });
      break;
    }

    case "create-path": {
      // Create a custom triangle shape using path points
      const path = scene.createPathContainer({
        position: { x: 150, y: 150 },
        shape: {
          points: [
            { vertex: { x: 0, y: -50 }, inTan: { x: 0, y: 0 }, outTan: { x: 0, y: 0 } },
            { vertex: { x: 50, y: 50 }, inTan: { x: 0, y: 0 }, outTan: { x: 0, y: 0 } },
            { vertex: { x: -50, y: 50 }, inTan: { x: 0, y: 0 }, outTan: { x: 0, y: 0 } },
          ],
          closed: true,
        },
      });
      path.addFill({ type: "SOLID", color: { r: 233, g: 30, b: 99 } });
      break;
    }
  }
});
