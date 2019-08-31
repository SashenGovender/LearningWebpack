var webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: "./src/main.ts", //where webpack will look when it starts compiling
    resolve: {
        extensions: ['.ts', '.js'] // what extension to care about
    },
    plugins: [
        new HtmlWebpackPlugin({ //Builds an html file using the provide template and it insert the correct script tags
            template: "./src/template.html", //src file for the html page
            filename: "./index.html" // dist html filename 
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader' // convert ts files to one js file
            },
            {
                test: /\.html$/, //regex $-> must end with html
                use: ["html-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif )$/,
                use:  {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]", // make a copy of each image file and move it to the dist folder with  this name format
                         outputPath: "images" //copy images to folder "images" in dist folder
                    }
                }   
            },
        ]
    },

}


/*
    "start": "node dist/main.js",
    "build": "tsc"
*/