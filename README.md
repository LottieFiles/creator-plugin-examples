# Creator Plugin Examples

Example plugins for [LottieFiles Creator](https://www.lottiefiles.com/creator).

## Getting Started

These plugins are written using TypeScript. Creator provides TypeScript types for the Plugin API. This means that if you're writing plugin with TypeScript, you'll get helpful code hints, and will be able to catch errors early.

To preview these plugins in Creator, you'll need to compile the code into HTML and JavaScript or create a local development URL. Here's how:

### Install dependencies

```bash
npm install
```

### Compile an example

To compile an HTML plugin:

```bash
cd basic-plugin-html
npx tsc
```

To compile a React plugin:

```bash
cd basic-plugin-react
npm run build
```

Or create a local development URL for React plugins:

```bash
cd basic-plugin-react
npm run dev
```

### Load in Creator

1. Open [LottieFiles Creator](https://www.lottiefiles.com/creator)
2. Click **Plugins** in the left sidebar
3. Click **Develop** → **New plugin**
4. Serve the example folder locally and enter the URL, or zip the distribution files (`manifest.json`, `plugin.js`, `ui.html`) and upload it

### AI agent skills

To give your coding agent the Creator plugin skills, install them from [creator-plugin-skills](https://github.com/LottieFiles/creator-plugin-skills):

```bash
npx skills add LottieFiles/creator-plugin-skills --skill '*'
```

## Network access

- Each `manifest.json` lists the hosts its UI contacts in `networkAccess.allowedDomains`.
- Declare every host your UI contacts, and bundle scripts instead of loading them from a CDN.
- The React starter (`npm create @lottiefiles/creator-plugin`) and the React examples automatically inline every imported script, stylesheet and asset into `ui.html` (except for files in `public/`, and full URLs in your code or its libraries, such as `fetch("https://api.example.com")`.

## Examples

### Getting started

| Example | Description |
|---------|-------------|
| [basic-plugin-html](./basic-plugin-html) | Minimal HTML/JS plugin|
| [basic-plugin-react](./basic-plugin-react) | Minimal React + Vite plugin |
| [basic-plugin-react-with-ui-lib](./basic-plugin-react-with-ui-lib) | React + Vite plugin using the Creator Plugins UI library and Tailwind |

### Shapes and styling

| Example | Description |
|---------|-------------|
| [creating-shapes](./creating-shapes) | Create rectangles, ellipses, polygons, stars, and paths |
| [grouping-shapes](./grouping-shapes) | Group shapes together |
| [styling-nodes](./styling-nodes) | Add fills, gradients, and strokes |

### Animation

| Example | Description |
|---------|-------------|
| [animating-transforms](./animating-transforms) | Animate position, rotation, scale, opacity |
| [animating-shape-properties](./animating-shape-properties) | Animate shape-specific properties |
| [animation-easing](./animation-easing) | Apply easing curves to keyframes |
| [updating-animation](./updating-animation) | Read and modify existing keyframes |

### Assets and data

| Example | Description |
|---------|-------------|
| [importing-assets](./importing-assets) | Import Lottie, SVG, and images |
| [storing-data](./storing-data) | Persist data with clientStorage and node.data |
| [network-requests](./network-requests) | Fetch data from external APIs |

### External libraries

| Example | Description |
|---------|-------------|
| [external-libs-html](./external-libs-html) | Copy a library into an HTML plugin's `ui.html` |
| [external-libs-react](./external-libs-react) | Use npm packages in React plugins |
