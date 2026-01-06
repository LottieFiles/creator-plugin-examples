/**
 * Grouping and Ungrouping Example
 *
 * Demonstrates how to:
 * - Create multiple shapes
 * - Group shapes together
 * - Transform groups as a unit
 * - Ungroup shapes
 */

creator.ui.show({ width: 300, height: 280 });

interface Message {
  type: string;
}

creator.ui.onMessage((msg: Message) => {
  const scene = creator.activeScene;

  switch (msg.type) {
    case "create-shapes": {
      // Create a rectangle
      const rect = scene.createRectangleContainer({
        position: { x: 100, y: 100 },
        shape: { size: { width: 80, height: 80 } },
      });
      rect.addFill({ type: "SOLID", color: { r: 66, g: 133, b: 244 } });

      // Create an ellipse next to it
      const ellipse = scene.createEllipseContainer({
        position: { x: 220, y: 100 },
        shape: { size: { width: 80, height: 80 } },
      });
      ellipse.addFill({ type: "SOLID", color: { r: 234, g: 67, b: 53 } });

      // Create a star below
      const star = scene.createStarContainer({
        position: { x: 160, y: 220 },
        shape: {
          points: 5,
          innerRadius: 20,
          outerRadius: 40,
        },
      });
      star.addFill({ type: "SOLID", color: { r: 251, g: 188, b: 5 } });

      creator.ui.postMessage({ type: "shapes-created" });
      break;
    }

    case "group-selected": {
      const selection = creator.selection.nodes;

      if (selection.length < 2) {
        creator.ui.postMessage({
          type: "error",
          message: "Select at least 2 shapes to group",
        });
        return;
      }

      // Find a container to create the group in
      const firstNode = selection[0];
      if (firstNode && "createGroup" in firstNode) {
        // This creates a group containing the selected shapes
        const container = firstNode as { createGroup: (shapes: unknown[]) => unknown };
        container.createGroup(selection);
        creator.ui.postMessage({ type: "grouped" });
      }
      break;
    }

    case "ungroup-selected": {
      const selection = creator.selection.nodes;

      for (const node of selection) {
        if (node.type === "GROUP" && "ungroup" in node) {
          const group = node as { ungroup: () => void };
          group.ungroup();
        }
      }
      creator.ui.postMessage({ type: "ungrouped" });
      break;
    }
  }
});
