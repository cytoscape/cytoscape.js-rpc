# cytoscape-rpc

Use RPC/JSON to drive a remote Cytoscape.js instance

This project is currently in-progress and is not ready for production use.

## Usage

```js
let Cytoscape = require('cytoscape');
let Rpc = require('cytoscape-rpc');

let cy = new Cytoscape();
let rpc = new Rpc( cy );

rpc.run({
  on, // 'cy' for core, array of ids for eles
  name, // the name of the function to call, like 'select'
  args // an array of args to pass to the function
});
```

TODO document special case functions, like `eles.bfs()`, and special case args, like `eles` or functions.

## Build targets

It's expected that you're running Node v6+ for building.

- `npm run build` : Build the lib using Babel
- `npm test` : Run Mocha tests
