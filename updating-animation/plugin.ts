/**
 * Updating Animation Example
 *
 * Demonstrates how to:
 * - Check if a property has keyframes
 * - Read existing keyframe values
 * - Update static values and keyframe values
 * - Remove individual keyframes or clear all keyframes
 */

creator.ui.show({ width: 300, height: 400 });

interface Message {
  type:
    | "check-animation"
    | "read-keyframes"
    | "update-static"
    | "update-keyframe"
    | "remove-keyframe"
    | "clear-keyframes";
  frame?: number;
  value?: { x: number; y: number };
}

creator.ui.onMessage((msg: Message) => {
  const selection = creator.selection.nodes;

  if (selection.length === 0) {
    creator.ui.postMessage({
      type: "error",
      message: "Please select a layer first",
    });
    return;
  }

  const node = selection[0];

  // Check if the node has a position property (is a layer)
  if (!("position" in node)) {
    creator.ui.postMessage({
      type: "error",
      message: "Selected node doesn't have position property",
    });
    return;
  }

  const layer = node as {
    position: {
      isAnimated: boolean;
      keyframes: ReadonlyArray<{
        frame: number;
        value: { x: number; y: number };
        easing: unknown;
        remove: () => void;
      }>;
      staticValue: { x: number; y: number };
      getKeyframeAt: (frame: number) => {
        frame: number;
        value: { x: number; y: number };
        easing: unknown;
        remove: () => void;
      } | undefined;
      clearKeyframes: () => void;
    };
  };

  switch (msg.type) {
    case "check-animation": {
      const isAnimated = layer.position.isAnimated;
      const keyframeCount = layer.position.keyframes.length;

      creator.ui.postMessage({
        type: "status",
        message: isAnimated
          ? `Position is animated with ${keyframeCount} keyframe(s)`
          : "Position is not animated (no keyframes)",
      });
      break;
    }

    case "read-keyframes": {
      if (!layer.position.isAnimated) {
        creator.ui.postMessage({
          type: "status",
          message: `No keyframes. Static value: (${layer.position.staticValue.x.toFixed(0)}, ${layer.position.staticValue.y.toFixed(0)})`,
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
      const newValue = msg.value || { x: 200, y: 200 };
      layer.position.staticValue = newValue;

      creator.ui.postMessage({
        type: "status",
        message: `Static value updated to (${newValue.x}, ${newValue.y})`,
      });
      break;
    }

    case "update-keyframe": {
      const frame = msg.frame || 0;
      const keyframe = layer.position.getKeyframeAt(frame);

      if (!keyframe) {
        creator.ui.postMessage({
          type: "error",
          message: `No keyframe found at frame ${frame}`,
        });
        return;
      }

      const newValue = msg.value || { x: 300, y: 100 };
      keyframe.value = newValue;

      creator.ui.postMessage({
        type: "status",
        message: `Keyframe at frame ${frame} updated to (${newValue.x}, ${newValue.y})`,
      });
      break;
    }

    case "remove-keyframe": {
      const frame = msg.frame || 0;
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
