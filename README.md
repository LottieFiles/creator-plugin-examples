# Creator Plugin Examples

Example plugins for [LottieFiles Creator](https://www.lottiefiles.com/creator). These examples accompany the [Plugin Documentation](https://developers.lottiefiles.com/creator).

## Getting Started

These plugins are written using TypeScript to take advantage of Creator's typed plugin API. Before loading these as development plugins, you'll need to compile the code using the TypeScript compiler.

### Install dependencies

```bash
npm install
```

### Compile an example

```bash
cd basic-plugin-html
tsc
```

### Load in Creator

1. Open [LottieFiles Creator](https://www.lottiefiles.com/creator)
2. Click **Plugins** in the left sidebar
3. Click **Develop** → **New plugin**
4. Serve the example folder locally and enter the URL, or zip the folder and upload it

## Examples

### Getting Started

| Example | Description |
|---------|-------------|
| [basic-plugin-html](./basic-plugin-html) | Minimal plugin with HTML/JS |
| [basic-plugin-react](./basic-plugin-react) | Plugin using React + Vite |

### Shapes & Styling

| Example | Description |
|---------|-------------|
| [creating-shapes](./creating-shapes) | Create rectangles, ellipses, polygons, stars, and paths |
| [grouping-and-ungrouping](./grouping-and-ungrouping) | Group shapes together |
| [styling-nodes](./styling-nodes) | Add fills, gradients, and strokes |

### Animation

| Example | Description |
|---------|-------------|
| [animating-transforms](./animating-transforms) | Animate position, rotation, scale, opacity |
| [animating-shape-properties](./animating-shape-properties) | Animate shape-specific properties |
| [animation-easing](./animation-easing) | Apply easing curves to keyframes |
| [updating-animation](./updating-animation) | Read and modify existing keyframes |

### Assets & Data

| Example | Description |
|---------|-------------|
| [importing-assets](./importing-assets) | Import Lottie, SVG, and images |
| [storing-data](./storing-data) | Persist data with clientStorage and node.data |
| [network-requests](./network-requests) | Fetch data from external APIs |

### External Libraries

| Example | Description |
|---------|-------------|
| [external-libs-html](./external-libs-html) | Use CDN libraries in HTML plugins |
| [external-libs-react](./external-libs-react) | Use npm packages in React plugins |
