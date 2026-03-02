// Show the plugin UI
creator.ui.show({ width: 300, height: 200 });

interface Message {
  type: "create-rectangle" | "ui-ready";
}

// Listen for messages from the UI
creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  switch (msg.type) {
    case "ui-ready": {
      // Send the current theme to the UI
      const { tokens, themeName } = creator.ui.theme;
      creator.ui.postMessage({ type: "theme:change", tokens, themeName });
      break;
    }
    case "create-rectangle": {
      // Create a rectangle in the active scene
      const layer = scene.createShapeLayer({
        position: { x: scene.size.width / 2, y: scene.size.height / 2 },
      });
      layer.createRectangle();
      layer.createFill({ type: "SOLID", color: { r: 128, g: 128, b: 128 } });
      break;
    }
  }
});

// Update the UI when Creator's theme changes
creator.on("theme:change", ({ tokens, themeName }) => {
  creator.ui.postMessage({ type: "theme:change", tokens, themeName });
});
