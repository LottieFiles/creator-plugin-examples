// TODO: Update after Plugin API renaming

creator.ui.show({ width: 300, height: 340 });

interface Message {
  type:
    | "animate-position"
    | "animate-rotation"
    | "animate-scale"
    | "animate-opacity"
    | "animate-combined";
}

const sceneCenter = {
  x: creator.activeScene.size.width / 2,
  y: creator.activeScene.size.height / 2,
};

creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  const createRectangleLayer = () => {
    const rect = scene.createRectangleContainer({
      position: sceneCenter,
      shape: { size: { width: 100, height: 100 } },
    });
    return rect;
  };

  switch (msg.type) {
    case "animate-position": {
      const layer = createRectangleLayer();

      // Animate position: move from left to right
      layer.position.addKeyframes([
        { frame: 0, value: { x: 50, y: 150 } },
        { frame: 30, value: { x: 300, y: 150 } },
        { frame: 60, value: { x: 50, y: 150 } },
      ]);
      break;
    }

    case "animate-rotation": {
      const layer = createRectangleLayer();

      // Animate rotation: full 360 degree spin
      layer.rotation.addKeyframes([
        { frame: 0, value: 0 },
        { frame: 60, value: 360 },
      ]);
      break;
    }

    case "animate-scale": {
      const layer = createRectangleLayer();

      // Animate scale: pulse effect
      layer.scale.addKeyframes([
        { frame: 0, value: { x: 100, y: 100 } },
        { frame: 30, value: { x: 150, y: 150 } },
        { frame: 60, value: { x: 100, y: 100 } },
      ]);
      break;
    }

    case "animate-opacity": {
      const layer = createRectangleLayer();

      // Animate opacity: fade in and out
      layer.opacity.addKeyframes([
        { frame: 0, value: 100 },
        { frame: 30, value: 20 },
        { frame: 60, value: 100 },
      ]);
      break;
    }

    case "animate-combined": {
      const layer = createRectangleLayer();

      // Combine multiple animations
      layer.position.addKeyframes([
        { frame: 0, value: { x: 50, y: 200 } },
        { frame: 60, value: { x: 300, y: 100 } },
      ]);

      layer.rotation.addKeyframes([
        { frame: 0, value: 0 },
        { frame: 60, value: 180 },
      ]);

      layer.scale.addKeyframes([
        { frame: 0, value: { x: 50, y: 50 } },
        { frame: 30, value: { x: 120, y: 120 } },
        { frame: 60, value: { x: 100, y: 100 } },
      ]);

      layer.opacity.addKeyframes([
        { frame: 0, value: 50 },
        { frame: 30, value: 100 },
        { frame: 60, value: 80 },
      ]);
      break;
    }
  }
});
