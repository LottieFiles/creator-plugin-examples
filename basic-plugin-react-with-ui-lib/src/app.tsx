import { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@lottiefiles/creator-plugins-ui";

export const App = () => {
  const [tokens, setTokens] = useState<Record<string, string>>();
  const [themeName, setThemeName] = useState<string>();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const msg = e.data?.pluginMessage;
      if (msg?.type === "theme:change") {
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
      <div className="min-h-screen bg-background p-4 text-foreground">
        <h3 className="mb-2 text-lg font-semibold text-primary">
          Basic Plugin
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Click the button to create a rectangle in the scene.
        </p>
        <Button className="w-full" onClick={handleClick}>
          Create rectangle
        </Button>
      </div>
    </ThemeProvider>
  );
};
