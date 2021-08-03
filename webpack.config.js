const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ["@babel/polyfill","./src/index.js"],
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    devtool:"source-map",
    module:{
        rules:[
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: [
                        ["@babel/preset-env", {
                        "useBuiltIns": "entry"
                      }], "@babel/preset-react"
                      ]
                    }
                  }
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader']
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({template:'./src/index.html'})
    ]
}