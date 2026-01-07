creator.ui.show({ width: 300, height: 400 });

interface Message {
  type:
    | "compare-easings"
    | "ease-linear"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "ease-bounce";
}

// Easing presets as cubic bezier values
const EASING = {
  linear: { type: "LINEAR" as const },
  easeIn: { type: "CUBIC_BEZIER" as const, x1: 0.42, y1: 0, x2: 1, y2: 1 },
  easeOut: { type: "CUBIC_BEZIER" as const, x1: 0, y1: 0, x2: 0.58, y2: 1 },
  easeInOut: {
    type: "CUBIC_BEZIER" as const,
    x1: 0.42,
    y1: 0,
    x2: 0.58,
    y2: 1,
  },
  bounce: {
    type: "CUBIC_BEZIER" as const,
    x1: 0.68,
    y1: -0.55,
    x2: 0.265,
    y2: 1.55,
  },
};

creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  // Helper to create a sample shape at a specific Y position
  const createShape = (
    y: number,
    color: { r: number; g: number; b: number }
  ) => {
    const rect = scene.createRectangleContainer({
      position: { x: 50, y },
      shape: { size: { width: 60, height: 60 }, roundness: 8 },
    });
    rect.addFill({ type: "SOLID", color });
    return rect;
  };

  switch (msg.type) {
    case "compare-easings": {
      // Create 4 shapes stacked vertically to compare easings
      const shapes = [
        {
          shape: createShape(60, { r: 66, g: 133, b: 244 }),
          easing: EASING.linear,
          label: "Linear",
        },
        {
          shape: createShape(140, { r: 234, g: 67, b: 53 }),
          easing: EASING.easeIn,
          label: "Ease In",
        },
        {
          shape: createShape(220, { r: 251, g: 188, b: 5 }),
          easing: EASING.easeOut,
          label: "Ease Out",
        },
        {
          shape: createShape(300, { r: 52, g: 168, b: 83 }),
          easing: EASING.easeInOut,
          label: "Ease In Out",
        },
      ];

      // Apply the same position animation with different easings
      shapes.forEach(({ shape, easing }) => {
        shape.position.addKeyframes([
          { frame: 0, value: { x: 50, y: shape.position.staticValue.y } },
          {
            frame: 60,
            value: { x: 350, y: shape.position.staticValue.y },
            easing,
          },
        ]);
      });
      break;
    }

    case "ease-linear": {
      const shape = createShape(150, { r: 66, g: 133, b: 244 });
      shape.position.addKeyframes([
        { frame: 0, value: { x: 50, y: 150 } },
        { frame: 60, value: { x: 350, y: 150 }, easing: EASING.linear },
      ]);
      break;
    }

    case "ease-in": {
      const shape = createShape(150, { r: 234, g: 67, b: 53 });
      shape.position.addKeyframes([
        { frame: 0, value: { x: 50, y: 150 } },
        { frame: 60, value: { x: 350, y: 150 }, easing: EASING.easeIn },
      ]);
      break;
    }

    case "ease-out": {
      const shape = createShape(150, { r: 251, g: 188, b: 5 });
      shape.position.addKeyframes([
        { frame: 0, value: { x: 50, y: 150 } },
        { frame: 60, value: { x: 350, y: 150 }, easing: EASING.easeOut },
      ]);
      break;
    }

    case "ease-in-out": {
      const shape = createShape(150, { r: 52, g: 168, b: 83 });
      shape.position.addKeyframes([
        { frame: 0, value: { x: 50, y: 150 } },
        { frame: 60, value: { x: 350, y: 150 }, easing: EASING.easeInOut },
      ]);
      break;
    }

    case "ease-bounce": {
      const shape = createShape(150, { r: 156, g: 39, b: 176 });
      shape.position.addKeyframes([
        { frame: 0, value: { x: 50, y: 150 } },
        { frame: 60, value: { x: 350, y: 150 }, easing: EASING.bounce },
      ]);
      break;
    }
  }
});
