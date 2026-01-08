creator.ui.show({ width: 300, height: 200 });

interface Message {
  type: "create";
}

creator.ui.onMessage((msg: Message) => {
  if (msg.type !== "create") return;

  const scene = creator.activeScene;

  // Create a rectangle container as the parent layer
  const layer = scene.createRectangleContainer({
    position: { x: scene.size.width / 2, y: scene.size.height / 2 },
  });

  const ellipse = layer.createEllipse({
    position: { x: -200, y: 0 },
  });

  const star = layer.createStar({
    position: { x: 200, y: 0 },
  });

  // Group the ellipse and star together
  const group = layer.createGroup([ellipse, star]);

  // Add rotation animation to the group (0° to 360° over the scene duration)
  // This rotation affects ONLY the shapes inside the group (ellipse and star)
  // The rectangle outside the group remains stationary
  const endFrame = scene.duration * scene.framerate;

  group.rotation.addKeyframes([
    { frame: 0, value: 0 },
    { frame: endFrame, value: 360 },
  ]);

  // Likewise, the fill color changes affect only the shapes inside the group
  group.addFill({ type: "SOLID", color: { r: 0, g: 0, b: 255 } });

  creator.ui.postMessage({
    type: "success",
    message: "Created! The group rotates but the rectangle stays still.",
  });
});
