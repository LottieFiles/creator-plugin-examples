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
const EASING: Record<string, Easing> = {
  linear: { type: "LINEAR" },
  easeIn: { type: "CUBIC_BEZIER", x1: 0.42, y1: 0, x2: 1, y2: 1 },
  easeOut: { type: "CUBIC_BEZIER", x1: 0, y1: 0, x2: 0.58, y2: 1 },
  easeInOut: { type: "CUBIC_BEZIER", x1: 0.42, y1: 0, x2: 0.58, y2: 1 },
  bounce: { type: "CUBIC_BEZIER", x1: 0.68, y1: -0.55, x2: 0.265, y2: 1.55 },
};

// Helper to create a layer with position animation
const createLayer = (y: number, easing: Easing) => {
  const layer = creator.activeScene.createRectangleContainer({
    position: { x: 50, y },
    shape: { size: { width: 60, height: 60 } },
  });
  layer.position.addKeyframes([
    { frame: 0, value: { x: 50, y }, easing },
    { frame: 60, value: { x: 350, y } },
  ]);
  return layer;
};

creator.ui.onMessage((msg: Message) => {
  switch (msg.type) {
    case "compare-easings": {
      const linear = createLayer(60, EASING.linear);
      linear.name = "Linear";

      const easeIn = createLayer(140, EASING.easeIn);
      easeIn.name = "Ease In";

      const easeOut = createLayer(220, EASING.easeOut);
      easeOut.name = "Ease Out";

      const easeInOut = createLayer(300, EASING.easeInOut);
      easeInOut.name = "Ease In Out";
      break;
    }

    case "ease-linear": {
      const layer = createLayer(150, EASING.linear);
      layer.name = "Linear Easing";
      break;
    }

    case "ease-in": {
      const layer = createLayer(150, EASING.easeIn);
      layer.name = "Ease In";
      break;
    }

    case "ease-out": {
      const layer = createLayer(150, EASING.easeOut);
      layer.name = "Ease Out";
      break;
    }

    case "ease-in-out": {
      const layer = createLayer(150, EASING.easeInOut);
      layer.name = "Ease In Out";
      break;
    }

    case "ease-bounce": {
      const layer = createLayer(150, EASING.bounce);
      layer.name = "Bounce";
      break;
    }
  }
});
