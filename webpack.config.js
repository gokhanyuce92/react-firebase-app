import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    entry: path.resolve(__dirname, "src/main.tsx"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        configFile: "tsconfig.app.json",
                    },
                },
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src"),
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, "public"),
        },
        port: 3000,
        historyApiFallback: true,
        open: true,
    },
    target: "web",
    mode: "development",
    devtool: "eval-cheap-module-source-map", // Hızlı source map
};
