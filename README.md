# webpack-tidy-plugin

A [Webpack](https://webpack.js.org) plugin that cleans up unnecessary files in the output directory

## Why does this exist?

This plugin supplies TypeScript definitions, so you can use a typed Webpack configuration.

## Usage

Add this to the `plugins` array to your `webpack.config.ts`, like so:

```
yarn add webpack-tidy-plugin
```

```typescript
import webpack from 'webpack';
import TidyPlugin from 'webpack-tidy-plugin';

const config: webpack.Configuration = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.tsx',
  output: { 
    path: path.resolve(__dirname, 'dist'),
  }
  plugins: [
    new TidyPlugin()
  ]
};

export default config;
```

## License

Copyright 2020 Alex Lindeman.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
