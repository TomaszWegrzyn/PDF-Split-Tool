# PDF splitting-tool
Really simple native(electron) application, which allows the user to open any PDF file and split it into multiple documents(each containing single page from original document). 
Main goal of this project was to learn a bit about redux and electron. 
This application is based on <a href="https://github.com/electron-react-boilerplate/electron-react-boilerplate">Electron React Boilerplate</a>

### TODO:
- Show loading indicator while PDf is being split
- Show information about result of PDF split operation(success/fail)
- Allow the user to customize filenamea of generated PDFs

## Install

- **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git and install dependencies:

```bash
git clone --depth 1 --single-branch https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
cd your-project-name
yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn dev
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## License

MIT
