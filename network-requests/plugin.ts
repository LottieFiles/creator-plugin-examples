/**
 * Network Requests Example
 *
 * Plugin code runs in a sandbox and cannot make network requests directly.
 * This example shows the pattern:
 * 1. UI makes the fetch request
 * 2. UI sends the data to plugin via postMessage
 * 3. Plugin uses the data (e.g., imports SVG into scene)
 */

creator.ui.show({ width: 320, height: 340 });

interface Message {
  type: string;
  content?: string;
  error?: string;
}

creator.ui.onMessage(async (msg: Message) => {
  switch (msg.type) {
    case "import-fetched-svg": {
      if (!msg.content) {
        creator.ui.postMessage({
          type: "error",
          message: "No SVG content received",
        });
        return;
      }

      try {
        // Import the SVG content that was fetched by the UI
        const svg = await creator.activeScene.import({
          type: "SVG",
          content: msg.content,
        });

        svg.position.staticValue = { x: 150, y: 150 };
        svg.scale.staticValue = { x: 2, y: 2 };

        creator.ui.postMessage({
          type: "success",
          message: "SVG imported successfully!",
        });
      } catch (error) {
        creator.ui.postMessage({
          type: "error",
          message: "Failed to import SVG",
        });
      }
      break;
    }

    case "fetch-error": {
      creator.ui.postMessage({
        type: "error",
        message: msg.error || "Network request failed",
      });
      break;
    }
  }
});
