// 1, npm run build

// Path
const path = require("path");

// Module
module.exports = {
  mode: "development",// productionでuglifyされる
  entry: path.resolve(__dirname, "test/src/main.js"),
  output: {
    path: path.resolve(__dirname, "test/dist"),
    filename: "main.js"
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  }
};