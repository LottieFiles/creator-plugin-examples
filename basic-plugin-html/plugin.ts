// Show the plugin UI
creator.ui.show({ width: 300, height: 200 });

interface Message {
  type: "create-rectangle";
}

// Listen for messages from the UI
creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  // Check if the message matches what we expect
  if (msg.type === "create-rectangle") {
    // Create a rectangle in the active scene
    const layer = scene.createShapeLayer({
      position: { x: scene.size.width / 2, y: scene.size.height / 2 },
    });
    layer.createRectangle();
    layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });
  }
});
