creator.ui.show({ width: 320, height: 600 });

interface Message {
  type: "import-lottie" | "import-svg" | "import-image" | "import-svg-content";
  url?: string;
  content?: string;
}

function success(label: string) {
  creator.ui.postMessage({ type: "success", message: `${label} imported!` });
}

function error(label: string) {
  creator.ui.postMessage({ type: "error", message: `Failed to import ${label}` });
}

creator.ui.onMessage(async (msg: Message) => {
  const scene = creator.activeScene;

  switch (msg.type) {
    case "import-lottie":
      try {
        await scene.import({ type: "LOTTIE", url: msg.url });
        success("Lottie");
      } catch {
        error("Lottie");
      }
      break;

    case "import-svg":
      try {
        await scene.import({ type: "SVG", url: msg.url });
        success("SVG");
      } catch {
        error("SVG");
      }
      break;

    case "import-image":
      try {
        await scene.import({ type: "IMAGE", url: msg.url });
        success("Image");
      } catch {
        error("Image");
      }
      break;

    case "import-svg-content":
      try {
        await scene.import({ type: "SVG", content: msg.content });
        success("SVG content");
      } catch {
        error("SVG content");
      }
      break;
  }
});
