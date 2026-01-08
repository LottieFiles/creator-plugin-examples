// TODO

creator.ui.show({ width: 300, height: 220 });

interface Message {
  type: "create-shapes" | "group-shapes";
}

creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  switch (msg.type) {
    case "create-shapes": {
      // Create a rectangle container
      const rect = scene.createRectangleContainer({
        position: { x: 100, y: 100 },
        shape: { size: { width: 80, height: 80 } },
      });

      // Create an ellipse container next to it
      const ellipse = scene.createEllipseContainer({
        position: { x: 220, y: 100 },
        shape: { size: { width: 80, height: 80 } },
      });

      // Create a star container below
      const star = scene.createStarContainer({
        position: { x: 160, y: 220 },
        shape: {
          points: 5,
          innerRadius: 20,
          outerRadius: 40,
        },
      });

      creator.ui.postMessage({ type: "shapes-created" });
      break;
    }

    case "group-shapes": {
      // Create a container with multiple shapes, then group them
      const container = scene.createRectangleContainer({
        position: { x: 150, y: 150 },
        shape: { size: { width: 60, height: 60 } },
      });

      // Create additional shapes in the same container
      const ellipse = container.createEllipse({
        size: { width: 40, height: 40 },
      });

      const rect = container.createRectangle({
        size: { width: 30, height: 30 },
      });

      // Group the shapes within the container
      const group = container.createGroup([ellipse, rect]);

      creator.ui.postMessage({
        type: "grouped",
        message: `Created group`,
      });
      break;
    }
  }
});
