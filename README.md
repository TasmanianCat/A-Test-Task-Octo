# Installation packages for development

## Create a package.json

```
npm init -y
```

## Installation Sass

```
npm install sass --save-dev
```

## Installation PostCSS and Autoprefixer

```
npm install --save-dev postcss postcss-cli autoprefixer
```

## Installation CSS minifier/optimizer

```
npm install --save-dev cssnano
```

## Add file 'postcss.config.js' to the root folder

```
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({ preset: 'default' })
  ]
};
```

## Add necessary scripts to the package.json

```
"scripts": {
  "build:sass": "sass assets/scss/styles.scss assets/css/styles.css",
  "watch:sass": "sass --watch assets/scss:assets/css",
  "build:css": "postcss assets/css/styles.css -o assets/css/styles.min.css",
  "build": "npm run build:sass && npm run build:css"
}
```

## Add the Browsers List to the package.json

```
"browserslist": [
    ">0.5%",
    "not dead",
    "not op_mini all"
  ]
```

# Use commands:

## Run Sass watch

```
npm run watch:sass
```

## Run PostCSS only for production

```
npm run build
```

## Install Rollup and plugins

```
npm install --save-dev rollup rollup-plugin-terser @rollup/plugin-node-resolve @rollup/plugin-commonjs
```

## Add file 'postcss.config.js' to the root folder

```
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'assets/js/main.js',       // your entry JS file
  output: {
    file: 'assets/js/bundle.min.js', // bundled output
    format: 'iife',                  // immediately-invoked function for browser
    sourcemap: true                  // optional: source maps for debugging
  },
  plugins: [
    resolve(),       // resolve node_modules imports
    commonjs(),      // convert CJS modules to ESM
    terser()         // minify for production
  ]
};
```

## Update your package.json scripts

```
"scripts": {
  "build:js": "rollup -c",
  "watch:js": "rollup -c -w"
}
```

## Build and Watch Rollup

```
npm run build:js   # build once
npm run watch:js   # auto rebuild during development
```
