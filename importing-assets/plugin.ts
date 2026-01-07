/**
 * Importing Assets Example
 *
 * Demonstrates how to import external assets:
 * - Lottie animations from URL
 * - SVG graphics from URL
 * - Images from URL
 * - Content from strings (ImportFromContent)
 */

creator.ui.show({ width: 320, height: 380 });

interface Message {
  type: "import-lottie" | "import-svg" | "import-image" | "import-svg-content";
  url?: string;
  content?: string;
}

creator.ui.onMessage(async (msg: Message) => {
  const scene = creator.activeScene;

  switch (msg.type) {
    case "import-lottie": {
      try {
        // Import a Lottie animation from URL
        const animation = await scene.import({
          type: "LOTTIE",
          url: msg.url || "https://assets2.lottiefiles.com/packages/lf20_UJNc2t.json",
        });

        // Position and scale the imported animation
        animation.position.staticValue = { x: 200, y: 200 };
        animation.scale.staticValue = { x: 0.5, y: 0.5 };

        creator.ui.postMessage({ type: "success", message: "Lottie imported!" });
      } catch (error) {
        creator.ui.postMessage({ type: "error", message: "Failed to import Lottie" });
      }
      break;
    }

    case "import-svg": {
      try {
        // Import an SVG from URL
        const svg = await scene.import({
          type: "SVG",
          url: msg.url || "https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg",
        });

        svg.position.staticValue = { x: 150, y: 150 };
        svg.scale.staticValue = { x: 2, y: 2 };

        creator.ui.postMessage({ type: "success", message: "SVG imported!" });
      } catch (error) {
        creator.ui.postMessage({ type: "error", message: "Failed to import SVG" });
      }
      break;
    }

    case "import-image": {
      try {
        // Import an image from URL
        const image = await scene.import({
          type: "IMAGE",
          url: msg.url || "https://picsum.photos/200/200",
        });

        image.position.staticValue = { x: 100, y: 100 };

        creator.ui.postMessage({ type: "success", message: "Image imported!" });
      } catch (error) {
        creator.ui.postMessage({ type: "error", message: "Failed to import image" });
      }
      break;
    }

    case "import-svg-content": {
      try {
        // Import SVG from raw content string
        const svgContent =
          msg.content ||
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="#4285f4"/>
            <circle cx="35" cy="40" r="8" fill="white"/>
            <circle cx="65" cy="40" r="8" fill="white"/>
            <path d="M 30 65 Q 50 80 70 65" stroke="white" stroke-width="4" fill="none"/>
          </svg>`;

        const svg = await scene.import({
          type: "SVG",
          content: svgContent,
        });

        svg.position.staticValue = { x: 150, y: 150 };

        creator.ui.postMessage({ type: "success", message: "SVG content imported!" });
      } catch (error) {
        creator.ui.postMessage({ type: "error", message: "Failed to import SVG content" });
      }
      break;
    }
  }
});
