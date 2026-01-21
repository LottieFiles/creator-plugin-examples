creator.ui.show({ width: 300, height: 520 });

interface Message {
  type:
    | "solid-fill"
    | "linear-gradient"
    | "radial-gradient"
    | "stroke-solid"
    | "group-fill"
    | "animate-solid"
    | "animate-linear"
    | "animate-radial"
    | "animate-stroke";
}

creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;
  const endFrame = scene.duration * scene.framerate;
  const sceneCenter = { x: scene.size.width / 2, y: scene.size.height / 2 };

  switch (msg.type) {
    case "solid-fill": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createRectangle();

      layer.createFill({
        type: "SOLID",
        color: { r: 66, g: 133, b: 244 },
      });
      break;
    }

    case "linear-gradient": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createRectangle();

      layer.createFill({
        type: "GRADIENT_LINEAR",
        start: { x: -50, y: 0 },
        end: { x: 50, y: 0 },
        stops: [
          { offset: 0, color: { r: 102, g: 126, b: 234 }, opacity: 1 },
          { offset: 1, color: { r: 118, g: 75, b: 162 }, opacity: 1 },
        ],
      });
      break;
    }

    case "radial-gradient": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createEllipse();
      layer.createFill({
        type: "GRADIENT_RADIAL",
        start: { x: -50, y: 0 },
        end: { x: 50, y: 0 },
        highlightAngle: 0,
        highlightLength: 100,
        stops: [
          { offset: 0, color: { r: 255, g: 255, b: 255 }, opacity: 1 },
          { offset: 0.5, color: { r: 255, g: 193, b: 7 }, opacity: 1 },
          { offset: 1, color: { r: 255, g: 87, b: 34 }, opacity: 1 },
        ],
      });
      break;
    }

    case "stroke-solid": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createRectangle();

      layer.createStroke({
        fill: { type: "SOLID", color: { r: 33, g: 33, b: 33 } },
        width: 4,
      });
      break;
    }

    case "group-fill": {
      // Create a layer with multiple shapes
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createRectangle({ size: { width: 60, height: 60 } });

      const ellipse = layer.createEllipse({
        position: { x: -60, y: 0 },
        size: { width: 50, height: 50 },
      });

      const rect = layer.createRectangle({
        position: { x: 60, y: 0 },
        size: { width: 50, height: 50 },
      });

      // Group the shapes - fill applied to group affects all children,
      // but not the shapes in the parent layer
      const group = layer.createGroup({ shapes: [ellipse, rect] });
      group.createFill({ type: "SOLID", color: { r: 255, g: 100, b: 50 } });
      break;
    }

    case "animate-solid": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createRectangle();

      layer.createFill({ type: "SOLID", color: { r: 255, g: 0, b: 0 } });

      // Animate fill color: red -> green -> blue
      const fill = layer.fills[0];
      if (fill.type === "SOLID") {
        fill.color.addKeyframes([
          { frame: 0, value: { r: 255, g: 0, b: 0 } },
          { frame: endFrame / 2, value: { r: 0, g: 255, b: 0 } },
          { frame: endFrame, value: { r: 0, g: 0, b: 255 } },
        ]);
      }
      break;
    }

    case "animate-linear": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createRectangle();

      layer.createFill({
        type: "GRADIENT_LINEAR",
        start: { x: -50, y: 0 },
        end: { x: 50, y: 0 },
        stops: [
          { offset: 0, color: { r: 102, g: 126, b: 234 }, opacity: 1 },
          { offset: 1, color: { r: 118, g: 75, b: 162 }, opacity: 1 },
        ],
      });

      const fill = layer.fills[0];

      // Animate gradient color
      if (fill.type === "GRADIENT_LINEAR") {
        fill.stops.addKeyframes([
          {
            frame: 0,
            value: [
              { offset: 0, color: { r: 102, g: 126, b: 234 }, opacity: 1 },
              { offset: 1, color: { r: 118, g: 75, b: 162 }, opacity: 1 },
            ],
          },
          {
            frame: endFrame / 2,
            value: [
              { offset: 0, color: { r: 76, g: 175, b: 80 }, opacity: 1 },
              { offset: 1, color: { r: 255, g: 193, b: 7 }, opacity: 1 },
            ],
          },
          {
            frame: endFrame,
            value: [
              { offset: 0, color: { r: 102, g: 126, b: 234 }, opacity: 1 },
              { offset: 1, color: { r: 118, g: 75, b: 162 }, opacity: 1 },
            ],
          },
        ]);
      }

      break;
    }

    case "animate-radial": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createEllipse();

      layer.createFill({
        type: "GRADIENT_RADIAL",
        start: { x: -50, y: 0 },
        end: { x: 50, y: 0 },
        highlightAngle: 0,
        highlightLength: 0,
        stops: [
          { offset: 0, color: { r: 255, g: 255, b: 255 }, opacity: 1 },
          { offset: 1, color: { r: 255, g: 87, b: 34 }, opacity: 1 },
        ],
      });

      // Animate gradient color
      const fill = layer.fills[0];
      if (fill.type === "GRADIENT_RADIAL") {
        fill.stops.addKeyframes([
          {
            frame: 0,
            value: [
              { offset: 0, color: { r: 255, g: 255, b: 255 }, opacity: 1 },
              { offset: 1, color: { r: 255, g: 87, b: 34 }, opacity: 1 },
            ],
          },
          {
            frame: endFrame / 2,
            value: [
              { offset: 0, color: { r: 255, g: 193, b: 7 }, opacity: 1 },
              { offset: 1, color: { r: 33, g: 150, b: 243 }, opacity: 1 },
            ],
          },
          {
            frame: endFrame,
            value: [
              { offset: 0, color: { r: 255, g: 255, b: 255 }, opacity: 1 },
              { offset: 1, color: { r: 255, g: 87, b: 34 }, opacity: 1 },
            ],
          },
        ]);
      }
      break;
    }

    case "animate-stroke": {
      const layer = scene.createShapeLayer({ position: sceneCenter });
      layer.createRectangle();

      layer.createStroke({
        fill: { type: "SOLID", color: { r: 255, g: 0, b: 0 } },
        width: 2,
      });

      const stroke = layer.strokes[0];

      // Animate stroke width: thin -> thick -> thin
      stroke.width.addKeyframes([
        { frame: 0, value: 2 },
        { frame: endFrame / 2, value: 12 },
        { frame: endFrame, value: 2 },
      ]);

      // Animate stroke color: red -> blue
      if (stroke.fill.type === "SOLID") {
        stroke.fill.color.addKeyframes([
          { frame: 0, value: { r: 255, g: 0, b: 0 } },
          { frame: endFrame, value: { r: 0, g: 0, b: 255 } },
        ]);
      }
      break;
    }
  }
});
