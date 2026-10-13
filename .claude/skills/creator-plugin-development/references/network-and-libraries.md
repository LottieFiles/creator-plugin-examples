# Network Requests and External Libraries

## Network Requests

Plugin sandbox code **cannot** make network requests directly. To fetch data from external APIs, make the request from UI code and send the result to the plugin sandbox.

Every host the UI contacts must be declared in the manifest first. See [Declaring network access](#declaring-network-access). The `network-requests` example declares `pokeapi.co`.

### Step 1: UI Fetches Data

```javascript
// In UI code (ui.html <script> or src/app.tsx)
const response = await fetch(`https://api.example.com/icons/${iconId}.svg`);
const svgContent = await response.text();
```

### Step 2: UI Sends Data to Plugin

```javascript
// In UI code
parent.postMessage({
  pluginMessage: {
    type: 'import-svg',
    content: svgContent
  }
}, '*');
```

### Step 3: Plugin Receives and Processes

```typescript
// In plugin sandbox (plugin.ts)
creator.ui.onMessage(async (msg) => {
  if (msg.type === 'import-svg') {
    const svgLayer = await creator.activeScene.import({
      type: 'SVG',
      content: msg.content
    });
  }
});
```

### Step 4: UI Listens for Response

```javascript
// In UI code
window.addEventListener('message', (event) => {
  const msg = event.data.pluginMessage;
  if (msg && msg.type === 'import-success') {
    // Update UI state
  }
});
```

## Declaring Network Access

Creator blocks every network request from the plugin UI to a host the manifest does not declare. List every host the plugin UI contacts in `manifest.json`:

```json
{
  "id": "unique-uuid-v4",
  "name": "My Plugin",
  "apiVersion": "1",
  "entry": "plugin.js",
  "ui": "ui.html",
  "networkAccess": {
    "allowedDomains": ["api.example.com", "*.cdn.example.com"],
    "reasoning": "Loads icon sets from the publisher's API."
  }
}
```

- `allowedDomains` is required. Use `[]` for a plugin that makes no network requests.
- `reasoning` is optional. Reviewers read it.
- Plugins submitted to Creator Extensions must include `networkAccess`.

### Entry format

| Entry | Valid? |
| --- | --- |
| `api.example.com` | Yes: exact host |
| `*.example.com` | Yes: any subdomain at any depth, but **not** `example.com` itself |
| `live.example.com:8443` | Yes: that port only |
| `https://api.example.com` | No: no scheme |
| `api.example.com/v1` | No: no path or query |
| `*` or `*.com` | No: too broad |
| `192.168.0.1`, `localhost` | No: no IP addresses or local hosts |

- A plugin that needs both `example.com` and its subdomains declares both.
- Each host is allowed over `https` and `wss`. Plain `http` and `ws` are not allowed.
- If a request redirects, declare the host it redirects to as well.
- Declare the STUN and TURN servers the plugin uses for WebRTC too.

### What the declaration covers

Declared hosts apply to these requests from the UI:

- `fetch`, `XMLHttpRequest`, `WebSocket` and `navigator.sendBeacon`
- images, video, audio, fonts and stylesheets

The sandbox's `scene.import({ url })` must also use a declared host.

### What is blocked even from a declared host

- **Scripts:** `<script src="https://...">`, `import("https://...")`, and workers started from a remote URL. Bundle every script into `ui.html`.
- **Remote WebAssembly:** a `.wasm` file fetched from a URL, unless its host is declared and the manifest declares `wasm`. Bundle it instead (see [WebAssembly](#webassembly)). Creator Extensions reviews remote WebAssembly by hand.
- **Frames and embeds:** `<iframe>`, `<object>` and `<embed>`.
- **Form posts:** `<form action="...">`. Use `fetch` instead.
- **Scripts added at runtime:** a `<script>` element created while the plugin runs. Only the inline scripts already in `ui.html` run. `eval` and `new Function` also need the `codeGeneration` capability (see [Capabilities](#capabilities)).
- **`javascript:` URLs:** `<a href="javascript:...">` does not run. Use `addEventListener`. Inline event handlers written in your HTML (`<button onclick="...">`) do run, but a handler attribute added from script does not.
- **Navigating the plugin page:** setting `location.href`, a `<meta http-equiv="refresh">`, or a link to another page replaces the plugin UI with an error page. To open a web page, send a message to the sandbox and call `creator.openLink(url)`, which opens it in the user's browser.

### Development

- The Develop tab applies the same rules to dev plugins.
- Creator allows the dev server's own address and its hot-reload socket automatically.
- Creator also allows data connections to any `localhost` or `127.0.0.1` port, such as a local API server. Do not declare these hosts.
- Each blocked request logs a console warning in the browser: `Creator blocked <host> (<directive>)`. Add the host to `allowedDomains`, or bundle the resource.

## Never Run Fetched Text as Code

Fetch data, not code. JSON, SVG markup and Lottie JSON are fine. Never pass fetched text to `eval`, `new Function`, or a new `<script>` element. Creator always blocks new `<script>` elements, and blocks `eval` and `new Function` unless the manifest declares `codeGeneration`. Creator Extensions reviews every plugin that declares it.

## Capabilities

Some features are off unless the manifest declares them:

```json
{
  "capabilities": ["wasm"]
}
```

| Capability | What it allows |
| --- | --- |
| `wasm` | Compiling and running WebAssembly in the UI |
| `codeGeneration` | `eval`, `new Function` and the other function constructors, in the UI and in the plugin sandbox |

- Without `codeGeneration`, `eval` and `new Function` are unavailable in the sandbox and blocked in the UI.
- Some libraries use `new Function` internally. For example, the full `lottie-web` build uses it for expressions. Use the library's build without it, such as `lottie-web/build/player/lottie_light`, or declare `codeGeneration`.
- Declaring any capability sends the plugin to manual review on Creator Extensions.
- Declare only what the plugin uses.

## External Libraries

Bundle every library into the plugin. A script from a CDN is blocked even when its host is declared. Bundling the library's stylesheet too means the CDN host does not need declaring.

### HTML plugins — inline the library

Without a bundler, copy the library's built file into `ui.html`:

1. Download the library's minified file, for example `pickr.min.js`, from npm or the project's releases.
2. Paste its contents into an inline `<script>` in `ui.html`, before the script that uses it. Keep the license comment at the top of the file.
3. Paste any stylesheet the library needs into a `<style>` element.

```html
<style>
  /* Pickr nano theme, pasted from @simonwep/pickr/dist/themes/nano.min.css */
</style>
<!-- ... -->
<script>
  /*! Pickr 1.10.2 MIT | https://github.com/simonwep/pickr */
  /* contents of @simonwep/pickr/dist/pickr.min.js */
</script>
<script>
  const pickr = Pickr.create({ el: '#color-picker', theme: 'nano' });
</script>
```

The `external-libs-html` example inlines Pickr this way. For more than one or two libraries, switch to a React plugin so Vite bundles them.

### React plugins — npm packages

The React template uses Vite for bundling. Install npm packages normally:

```bash
npm install react-colorful
```

Then import and use in UI components:

```typescript
import { HexColorPicker } from 'react-colorful';

function ColorSelector() {
  const [color, setColor] = useState('#000000');

  const handleChange = (newColor: string) => {
    setColor(newColor);
    parent.postMessage({
      pluginMessage: { type: 'set-color', color: newColor }
    }, '*');
  };

  return <HexColorPicker color={color} onChange={handleChange} />;
}
```

`@lottiefiles/vite-plugin-creator` inlines every script, stylesheet and asset into `ui.html`, so the built plugin makes no request for them.

### Fonts

- Bundle font files and reference them with `@font-face`. Vite inlines them into `ui.html`.
- To load fonts from Google Fonts instead, declare both `fonts.googleapis.com` and `fonts.gstatic.com`.

## WebAssembly

1. Bundle the `.wasm` file: import it with Vite's `?url` suffix. `@lottiefiles/vite-plugin-creator` turns it into a `data:` URL inside `ui.html`.
2. Point the library at the bundled file. Many players download their `.wasm` from a CDN by default, even when installed from npm, and that download is blocked.
3. Declare `"capabilities": ["wasm"]`.

dotlottie player:

```typescript
import { DotLottie } from '@lottiefiles/dotlottie-web';
import wasmUrl from '@lottiefiles/dotlottie-web/dotlottie-player.wasm?url';

DotLottie.setWasmUrl(wasmUrl);
```

`@lottiefiles/dotlottie-react` exports `setWasmUrl` too. The file still comes from `@lottiefiles/dotlottie-web`.

ThorVG player: its package does not export the `.wasm` file, so copy `node_modules/@thorvg/lottie-player/dist/thorvg.wasm` into `src/` and import the copy:

```typescript
import '@thorvg/lottie-player';
import wasmUrl from './thorvg.wasm?url';

const player = document.querySelector('lottie-player');
player.wasmUrl = wasmUrl;
```

- The bundled file makes `ui.html` larger. The dotlottie player adds about 2.3 MB.
- Multithreaded WebAssembly and `SharedArrayBuffer` are not available in plugins.

## Key Constraint

External libraries can only be used in UI code (`ui.html` or `src/`). The plugin sandbox (`plugin.ts`) runs in isolation and cannot import external packages at runtime.
