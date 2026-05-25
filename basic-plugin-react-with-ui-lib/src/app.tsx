import { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@lottiefiles/creator-plugins-ui";

export const App = () => {
  const [tokens, setTokens] = useState<Record<string, string>>();
  const [themeName, setThemeName] = useState<string>();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const msg = e.data?.pluginMessage;
      if (msg?.type === "change:theme") {
        setTokens(msg.tokens);
        setThemeName(msg.themeName);
      }
    };

    window.addEventListener("message", handleMessage);
    // Tell the plugin sandbox we're ready to receive the theme
    parent.postMessage({ pluginMessage: { type: "ui-ready" } }, "*");

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleClick = () => {
    parent.postMessage({ pluginMessage: { type: "create-rectangle" } }, "*");
  };

  return (
    <ThemeProvider tokens={tokens} themeName={themeName}>
      <div className="min-h-screen bg-background p-4">
        <h3 className="mb-2 text-lg font-semibold">Basic Plugin</h3>
        <p className="mb-4 text-sm">
          Click the button to create a rectangle in the scene.
        </p>
        <Button className="mt-4 w-full" onClick={handleClick}>
          Create rectangle
        </Button>
      </div>
    </ThemeProvider>
  );
};
