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
  const sceneCenter = {
    x: scene.size.width / 2,
    y: scene.size.height / 2,
  };

  switch (msg.type) {
    case "create-rectangle": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createRectangle({
        size: { width: 200, height: 150 },
        roundness: 10,
      });
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });
      break;
    }

    case "create-ellipse": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createEllipse({ size: { width: 200, height: 150 } });
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });
      break;
    }

    case "create-polygon": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createPolygon({
        points: 6,
        outerRadius: 80,
        outerRoundness: 0,
      });
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });
      break;
    }

    case "create-star": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createStar({
        points: 5,
        innerRadius: 40,
        outerRadius: 80,
      });
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });
      break;
    }

    case "create-path": {
      // Create a custom triangle shape using path points
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createPath({
        points: [
          {
            vertex: { x: 0, y: -50 },
            inTan: { x: 0, y: 0 },
            outTan: { x: 0, y: 0 },
          },
          {
            vertex: { x: 50, y: 50 },
            inTan: { x: 0, y: 0 },
            outTan: { x: 0, y: 0 },
          },
          {
            vertex: { x: -50, y: 50 },
            inTan: { x: 0, y: 0 },
            outTan: { x: 0, y: 0 },
          },
        ],
        closed: true,
      });
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });
      break;
    }
  }
});
