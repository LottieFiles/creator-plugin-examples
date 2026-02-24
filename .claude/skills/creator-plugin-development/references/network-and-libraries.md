# Network Requests and External Libraries

## Network Requests

Plugin sandbox code **cannot** make network requests directly. To fetch data from external APIs, make the request from UI code and send the result to the plugin sandbox.

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

## External Libraries

### HTML plugins — CDN scripts

Include libraries via CDN script and link tags in `ui.html`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/nano.min.css">
<script src="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.min.js"></script>
```

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

## Key Constraint

External libraries can only be used in UI code (`ui.html` or `src/`). The plugin sandbox (`plugin.ts`) runs in isolation and cannot import external packages at runtime.
