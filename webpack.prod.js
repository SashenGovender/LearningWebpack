const path = require('path');
const common = require("./webpack.common");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = merge(common,{// merge whatever is in common with this object here 
    mode: "production",
    output: {
        filename: "[name].[contentHash].js",//contentHash-Cache burst when code changes
        path: path.resolve(__dirname, "dist") // save the file to the dist folder - __dirname --> current directory name
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
});
