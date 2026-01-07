// TODO: Update after Plugin API renaming

creator.ui.show({ width: 300, height: 380 });

interface Message {
  type:
    | "animate-rect-size"
    | "animate-rect-roundness"
    | "animate-polygon-points"
    | "animate-star-radius"
    | "animate-ellipse-size";
}

const sceneCenter = {
  x: creator.activeScene.size.width / 2,
  y: creator.activeScene.size.height / 2,
};

creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  switch (msg.type) {
    case "animate-rect-size": {
      const rect = scene.createRectangleContainer({
        position: sceneCenter,
      });

      // Get the rectangle shape and animate its size
      const shape = rect.shapes[0];
      if (shape && shape.type === "RECTANGLE") {
        shape.size.addKeyframes([
          { frame: 0, value: { width: 50, height: 50 } },
          { frame: 30, value: { width: 200, height: 100 } },
          { frame: 60, value: { width: 50, height: 50 } },
        ]);
      }
      break;
    }

    case "animate-rect-roundness": {
      const rect = scene.createRectangleContainer({
        position: sceneCenter,
        shape: { size: { width: 150, height: 150 } },
      });

      // Animate roundness from sharp to fully rounded
      const shape = rect.shapes[0];
      if (shape && shape.type === "RECTANGLE") {
        shape.roundness.addKeyframes([
          { frame: 0, value: 0 },
          { frame: 30, value: 75 },
          { frame: 60, value: 0 },
        ]);
      }
      break;
    }

    case "animate-polygon-points": {
      const polygon = scene.createPolygonContainer({
        position: sceneCenter,
        shape: { outerRadius: 80 },
      });

      // Animate number of points (triangle to octagon)
      const shape = polygon.shapes[0];
      if (shape && shape.type === "POLYGON") {
        shape.points.addKeyframes([
          { frame: 0, value: 3 },
          { frame: 30, value: 8 },
          { frame: 60, value: 3 },
        ]);
      }
      break;
    }

    case "animate-star-radius": {
      const star = scene.createStarContainer({
        position: sceneCenter,
        shape: {
          points: 5,
          outerRadius: 80,
        },
      });

      // Animate inner radius to create a pulsing star effect
      const shape = star.shapes[0];
      if (shape && shape.type === "STAR") {
        shape.innerRadius.addKeyframes([
          { frame: 0, value: 20 },
          { frame: 30, value: 60 },
          { frame: 60, value: 20 },
        ]);
      }
      break;
    }

    case "animate-ellipse-size": {
      const ellipse = scene.createEllipseContainer({
        position: sceneCenter,
      });

      // Animate from circle to wide ellipse
      const shape = ellipse.shapes[0];
      if (shape && shape.type === "ELLIPSE") {
        shape.size.addKeyframes([
          { frame: 0, value: { width: 100, height: 100 } },
          { frame: 30, value: { width: 200, height: 60 } },
          { frame: 60, value: { width: 100, height: 100 } },
        ]);
      }
      break;
    }
  }
});
