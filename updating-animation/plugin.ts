creator.ui.show({ width: 300, height: 500 });

interface Message {
  type:
    | "check-animation"
    | "read-keyframes"
    | "update-static"
    | "update-keyframe"
    | "remove-keyframe"
    | "clear-keyframes";
  value?: { x: number; y: number };
}

const SUPPORTED_LAYER_TYPES: ReadonlySet<string> = new Set([
  "SHAPE_LAYER",
  "SCENE_LAYER",
  "IMAGE_LAYER",
  "TEXT_LAYER",
]);

const UNSUPPORTED_MESSAGE = "Select a shape, image, text or scene layer";

function isSupportedLayer(
  node: Shape | Layer,
): node is ShapeLayer | SceneLayer | ImageLayer | TextLayer {
  return SUPPORTED_LAYER_TYPES.has(node.type);
}

creator.ui.onMessage((msg: Message) => {
  const selection = creator.selection.nodes;

  const layer = selection[0];

  if (!layer || !isSupportedLayer(layer)) {
    creator.ui.postMessage({
      type: "error",
      message: UNSUPPORTED_MESSAGE,
    });
    return;
  }

  switch (msg.type) {
    case "check-animation": {
      const isAnimated = layer.position.isAnimated;

      if (!isAnimated) {
        creator.ui.postMessage({
          type: "status",
          message: "Position is not animated (no keyframes)",
        });
        return;
      }

      const keyframeCount = layer.position.keyframes.length;

      creator.ui.postMessage({
        type: "status",
        message: `Position is animated with ${keyframeCount} keyframe(s)`,
      });
      break;
    }

    case "read-keyframes": {
      if (!layer.position.isAnimated) {
        creator.ui.postMessage({
          type: "status",
          message: `No keyframes. Static value: (${layer.position.staticValue.x.toFixed(
            0,
          )}, ${layer.position.staticValue.y.toFixed(0)})`,
        });
        return;
      }

      const keyframeData = layer.position.keyframes.map((kf) => ({
        frame: kf.frame,
        x: kf.value.x.toFixed(0),
        y: kf.value.y.toFixed(0),
      }));

      creator.ui.postMessage({
        type: "keyframes",
        keyframes: keyframeData,
      });
      break;
    }

    case "update-static": {
      const newValue = msg.value;

      if (!newValue) {
        creator.ui.postMessage({
          type: "error",
          message: "No value provided for static update",
        });
        return;
      }

      layer.position.staticValue = newValue;

      creator.ui.postMessage({
        type: "status",
        message: `Static value updated to (${newValue.x}, ${newValue.y})`,
      });
      break;
    }

    case "update-keyframe": {
      const frame = creator.timeline.currentFrame;
      const keyframe = layer.position.getKeyframeAt(frame);

      if (!keyframe) {
        creator.ui.postMessage({
          type: "error",
          message: `No keyframe found at frame ${frame}`,
        });
        return;
      }

      const newValue = msg.value;

      if (!newValue) {
        creator.ui.postMessage({
          type: "error",
          message: "No value provided for keyframe update",
        });
        return;
      }

      keyframe.value = newValue;

      creator.ui.postMessage({
        type: "status",
        message: `Keyframe at frame ${frame} updated to (${newValue.x}, ${newValue.y})`,
      });
      break;
    }

    case "remove-keyframe": {
      const frame = creator.timeline.currentFrame;
      const keyframe = layer.position.getKeyframeAt(frame);

      if (!keyframe) {
        creator.ui.postMessage({
          type: "error",
          message: `No keyframe found at frame ${frame}`,
        });
        return;
      }

      keyframe.remove();

      creator.ui.postMessage({
        type: "status",
        message: `Keyframe at frame ${frame} removed`,
      });
      break;
    }

    case "clear-keyframes": {
      if (!layer.position.isAnimated) {
        creator.ui.postMessage({
          type: "status",
          message: "No keyframes to clear",
        });
        return;
      }

      const count = layer.position.keyframes.length;
      layer.position.clearKeyframes();

      creator.ui.postMessage({
        type: "status",
        message: `Cleared ${count} keyframe(s)`,
      });
      break;
    }
  }
});
