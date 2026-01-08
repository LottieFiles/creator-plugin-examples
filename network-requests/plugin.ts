creator.ui.show({ width: 320, height: 400 });

interface Message {
  type: "create-layers";
  names?: string[];
}

creator.ui.onMessage(async (msg: Message) => {
  if (msg.type !== "create-layers") return;

  if (!msg.names || msg.names.length === 0) {
    creator.ui.postMessage({
      type: "error",
      message: "No Pokémon names received",
    });
    return;
  }

  try {
    const scene = creator.activeScene;

    // Create a layer for each Pokemon name (first 3)
    const namesToUse = msg.names.slice(0, 3);
    for (let i = 0; i < namesToUse.length; i++) {
      const layer = scene.createEllipseContainer();

      layer.position.staticValue = {
        x: scene.size.width / 2,
        y: 100 + i * 150,
      };
      layer.name = namesToUse[i];
    }

    creator.ui.postMessage({
      type: "success",
      message: `Created layers!`,
    });
  } catch (error) {
    creator.ui.postMessage({
      type: "error",
      message: "Failed to create layers",
    });
  }
});
