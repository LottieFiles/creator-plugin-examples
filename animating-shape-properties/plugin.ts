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
      const layer = scene.createShapeLayer({ position: sceneCenter });
      const rectangle = layer.createRectangle();
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });

      // Animate the rectangle shape's size
      rectangle.size.addKeyframes([
        { frame: 0, value: { width: 50, height: 50 } },
        { frame: 30, value: { width: 200, height: 100 } },
        { frame: 60, value: { width: 50, height: 50 } },
      ]);
      break;
    }

    case "animate-rect-roundness": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      const rectangle = layer.createRectangle({
        size: { width: 150, height: 150 },
      });
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });

      // Animate roundness from sharp to fully rounded
      rectangle.roundness.addKeyframes([
        { frame: 0, value: 0 },
        { frame: 30, value: 75 },
        { frame: 60, value: 0 },
      ]);
      break;
    }

    case "animate-polygon-points": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      const polygon = layer.createPolygon({ outerRadius: 80 });
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });

      // Animate number of points (triangle to octagon)
      polygon.points.addKeyframes([
        { frame: 0, value: 3 },
        { frame: 30, value: 8 },
        { frame: 60, value: 3 },
      ]);
      break;
    }

    case "animate-star-radius": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      const star = layer.createStar({
        points: 5,
        outerRadius: 80,
      });
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });

      // Animate inner radius to create a pulsing star effect
      star.innerRadius.addKeyframes([
        { frame: 0, value: 20 },
        { frame: 30, value: 60 },
        { frame: 60, value: 20 },
      ]);
      break;
    }

    case "animate-ellipse-size": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      const ellipse = layer.createEllipse();
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });

      // Animate from circle to wide ellipse
      ellipse.size.addKeyframes([
        { frame: 0, value: { width: 100, height: 100 } },
        { frame: 30, value: { width: 200, height: 60 } },
        { frame: 60, value: { width: 100, height: 100 } },
      ]);
      break;
    }
  }
});
