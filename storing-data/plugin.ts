creator.ui.show({ width: 320, height: 530 });

interface Message {
  type:
    | "client-save"
    | "client-load"
    | "client-list"
    | "client-clear"
    | "node-save"
    | "node-load"
    | "node-list"
    | "node-clear";
  key?: string;
  value?: string;
}

creator.ui.onMessage(async (msg: Message) => {
  switch (msg.type) {
    // Client storage operations
    case "client-save": {
      if (msg.key && msg.value) {
        await creator.clientStorage.set(msg.key, msg.value);
        creator.ui.postMessage({
          type: "client-saved",
          message: `Saved "${msg.key}" to client storage`,
        });
      }
      break;
    }

    case "client-load": {
      if (msg.key) {
        const value = await creator.clientStorage.get(msg.key);
        creator.ui.postMessage({
          type: "client-loaded",
          key: msg.key,
          value: value ?? "(not found)",
        });
      }
      break;
    }

    case "client-list": {
      const keys = await creator.clientStorage.keys();
      creator.ui.postMessage({
        type: "client-keys",
        keys,
      });
      break;
    }

    case "client-clear": {
      await creator.clientStorage.clear();
      creator.ui.postMessage({
        type: "client-cleared",
        message: "Client storage cleared",
      });
      break;
    }

    // Node data operations
    case "node-save": {
      const layers = creator.activeScene.layers;
      if (layers.length === 0) {
        creator.ui.postMessage({
          type: "error",
          message: "Create a shape first to store data on it",
        });
        return;
      }

      const layer = layers[0];
      if (msg.key && msg.value && layer) {
        layer.data.set(msg.key, msg.value);
        creator.ui.postMessage({
          type: "node-saved",
          message: `Saved "${msg.key}" to first layer`,
        });
      }
      break;
    }

    case "node-load": {
      const layers = creator.activeScene.layers;
      if (layers.length === 0) {
        creator.ui.postMessage({
          type: "error",
          message: "No layers in scene",
        });
        return;
      }

      const layer = layers[0];
      if (msg.key) {
        const value = layer.data.get(msg.key);
        creator.ui.postMessage({
          type: "node-loaded",
          key: msg.key,
          value: value ?? "(not found)",
        });
      }
      break;
    }

    case "node-list": {
      const layers = creator.activeScene.layers;
      if (layers.length === 0) {
        creator.ui.postMessage({
          type: "error",
          message: "No layers in scene",
        });
        return;
      }

      const layer = layers[0];
      if (layer) {
        const keys = layer.data.keys;
        creator.ui.postMessage({
          type: "node-keys",
          keys,
        });
      }
      break;
    }

    case "node-clear": {
      const layers = creator.activeScene.layers;
      if (layers.length === 0) {
        creator.ui.postMessage({
          type: "error",
          message: "No layers in scene",
        });
        return;
      }

      const layer = layers[0];
      layer.data.clear();

      creator.ui.postMessage({
        type: "node-cleared",
        message: "Node data cleared",
      });
      break;
    }
  }
});
