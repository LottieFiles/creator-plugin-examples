/**
 * Animating Transforms Example
 *
 * Demonstrates how to animate transform properties:
 * - Position (x, y movement)
 * - Rotation (degrees)
 * - Scale (x, y scaling)
 * - Opacity (0-100)
 */

creator.ui.show({ width: 300, height: 340 });

interface Message {
  type: string;
}

creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  // Helper to create a sample shape
  const createSampleShape = () => {
    const rect = scene.createRectangleContainer({
      position: { x: 100, y: 150 },
      shape: { size: { width: 100, height: 100 } },
    });
    rect.addFill({ type: "SOLID", color: { r: 66, g: 133, b: 244 } });
    return rect;
  };

  switch (msg.type) {
    case "animate-position": {
      const shape = createSampleShape();

      // Animate position: move from left to right
      shape.position.addKeyframes([
        { frame: 0, value: { x: 50, y: 150 } },
        { frame: 30, value: { x: 300, y: 150 } },
        { frame: 60, value: { x: 50, y: 150 } },
      ]);
      break;
    }

    case "animate-rotation": {
      const shape = createSampleShape();

      // Animate rotation: full 360 degree spin
      shape.rotation.addKeyframes([
        { frame: 0, value: 0 },
        { frame: 60, value: 360 },
      ]);
      break;
    }

    case "animate-scale": {
      const shape = createSampleShape();

      // Animate scale: pulse effect
      shape.scale.addKeyframes([
        { frame: 0, value: { x: 1, y: 1 } },
        { frame: 30, value: { x: 1.5, y: 1.5 } },
        { frame: 60, value: { x: 1, y: 1 } },
      ]);
      break;
    }

    case "animate-opacity": {
      const shape = createSampleShape();

      // Animate opacity: fade in and out
      shape.opacity.addKeyframes([
        { frame: 0, value: 100 },
        { frame: 30, value: 20 },
        { frame: 60, value: 100 },
      ]);
      break;
    }

    case "animate-combined": {
      const shape = createSampleShape();

      // Combine multiple animations
      shape.position.addKeyframes([
        { frame: 0, value: { x: 50, y: 200 } },
        { frame: 60, value: { x: 300, y: 100 } },
      ]);

      shape.rotation.addKeyframes([
        { frame: 0, value: 0 },
        { frame: 60, value: 180 },
      ]);

      shape.scale.addKeyframes([
        { frame: 0, value: { x: 0.5, y: 0.5 } },
        { frame: 30, value: { x: 1.2, y: 1.2 } },
        { frame: 60, value: { x: 1, y: 1 } },
      ]);

      shape.opacity.addKeyframes([
        { frame: 0, value: 50 },
        { frame: 30, value: 100 },
        { frame: 60, value: 80 },
      ]);
      break;
    }
  }
});
