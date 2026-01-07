// TODO: update after plugin API renaming

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
      const rect = scene.createRectangleContainer({
        position: sceneCenter,
        shape: {
          size: { width: 200, height: 150 },
          roundness: 10,
        },
      });
      break;
    }

    case "create-ellipse": {
      const ellipse = scene.createEllipseContainer({
        position: sceneCenter,
        shape: { size: { width: 200, height: 150 } },
      });
      break;
    }

    case "create-polygon": {
      const polygon = scene.createPolygonContainer({
        position: sceneCenter,
        shape: {
          points: 6,
          outerRadius: 80,
          outerRoundness: 0,
        },
      });
      break;
    }

    case "create-star": {
      const star = scene.createStarContainer({
        position: sceneCenter,
        shape: {
          points: 5,
          innerRadius: 40,
          outerRadius: 80,
        },
      });
      break;
    }

    case "create-path": {
      // Create a custom triangle shape using path points
      const path = scene.createPathContainer({
        position: sceneCenter,
        shape: {
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
        },
      });
      break;
    }
  }
});
