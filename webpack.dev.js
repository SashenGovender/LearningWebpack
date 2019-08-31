const path = require('path');
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common,{// merge whatever is in common with this object here 
    mode: "development", // this will not minifying the code
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist") // save the file to the dist folder - __dirname --> current directory name
    },
});
