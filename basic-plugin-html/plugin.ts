/**
 * Basic Plugin Example (HTML/JS)
 *
 * This is the simplest possible Creator plugin. It demonstrates:
 * - Showing a plugin UI
 * - Receiving messages from the UI
 * - Creating shapes using the Creator API
 */

// Show the plugin UI
creator.ui.show({ width: 300, height: 200 });

// Listen for messages from the UI
creator.ui.onMessage((msg) => {
  if (msg.type === 'create-rectangle') {
    // Create a rectangle in the active scene
    const rect = creator.activeScene.createRectangleContainer({
      position: { x: 100, y: 100 },
      shape: { size: { width: 200, height: 150 } }
    });

    // Add a fill color
    rect.addFill({
      type: 'SOLID',
      color: { r: 66, g: 133, b: 244 }
    });
  }
});
