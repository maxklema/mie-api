const path = require('path');

module.exports = { 
  entry: "./index.js",
  target: "node",
  node: {
    __dirname: false, // Use the actual dirname
    __filename: false, // Use the actual filename
  },
  resolve: {
    extensions: ['.js', '.json'], // Add common Node.js extensions
  },
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'commonjs2' // or 'umd' for broader compatibility
  },
};