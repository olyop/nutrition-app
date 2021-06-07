/* eslint-disable node/no-process-env */

import {
	TITLE,
	KEYWORDS,
	DESCRIPTION,
} from "@oly_op/nutrition-app-common/metadata"

import path from "path"
import { Configuration } from "webpack"
import DotenvPlugin from "dotenv-webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import { InjectManifest } from "workbox-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"

const IS_DEV = process.env.NODE_ENV === "development"

const ROOT_PATH = __dirname

const BUILD_PATH = path.join(ROOT_PATH, "build", "server", "public")

const SRC_PATH = path.join(ROOT_PATH, "src")
const CLIENT_PATH = path.join(SRC_PATH, "client")
const CLIENT_SW_PATH = path.join(CLIENT_PATH, "sw.ts")
const CLIENT_ROOT_PATH = path.join(CLIENT_PATH, "index.tsx")
const CLIENT_ENTRY_PATH = path.join(CLIENT_PATH, "index.html")

export const proxyContext = [
	"/graphql",
	"/robots.txt",
	"/favicon.ico",
	"/security.txt",
	"/icons/192.png",
	"/icons/512.png",
	"/service-worker.js",
	"/manifest.webmanifest",
]

const config: Configuration = {
	entry: CLIENT_ROOT_PATH,
	mode: IS_DEV ? "development" : "production",
	devtool: IS_DEV ? "inline-source-map" : false,
	output: {
		publicPath: "/",
		path: BUILD_PATH,
		filename: "[fullhash].js",
	},
	ignoreWarnings: [
		/Failed to parse source map/,
	],
	devServer: {
		hot: true,
		quiet: true,
		open: false,
		noInfo: true,
		overlay: true,
		compress: true,
		contentBase: false,
		clientLogLevel: "debug",
		stats: "errors-warnings",
		historyApiFallback: true,
		port: parseInt(process.env.CLIENT_PORT!),
		proxy: [{
			logLevel: "silent",
			context: proxyContext,
			target: `http://127.0.0.1:${process.env.SERVER_PORT!}`,
		}],
	},
	resolve: {
		symlinks: false,
		extensions: [".js", ".ts", ".tsx"],
	},
	module: {
		rules: [{
			test: /\.js$/,
			enforce: "pre",
			loader: "source-map-loader",
		},{
			test: /\.gql$/,
			exclude: /node_modules/,
			loader: "graphql-tag/loader",
		},{
			test: /\.tsx?$/,
			loader: "ts-loader",
			exclude: /node_modules/,
			options: {
				onlyCompileBundledFiles: true,
			},
		},{
			test: /\.scss$/,
			use: [
				IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader,
				"css-loader",
				"sass-loader",
			],
		}],
	},
	plugins: [
		new DotenvPlugin(),
		new InjectManifest({
			swSrc: CLIENT_SW_PATH,
			maximumFileSizeToCacheInBytes: 1000 * 1024 * 1024,
		}),
		new HtmlWebpackPlugin({
			title: TITLE,
			minify: true,
			filename: "index.html",
			template: CLIENT_ENTRY_PATH,
			meta: {
				"og:type": "PWA",
				"og:title": TITLE,
				"twitter:dnt": "on",
				"keywords": KEYWORDS,
				"google": "notranslate",
				"robots": "index,follow",
				"theme-color": "#ffffff",
				"application-name": TITLE,
				"author": "Oliver Plummer",
				"description": DESCRIPTION,
				"og:image": "/icons/192.png",
				"og:description": DESCRIPTION,
				"mobile-web-app-capable": "yes",
				"viewport": `
					minimum-scale=1,
					initial-scale=1,
					shrink-to-fit=no,
					width=device-width
				`,
			},
		}),
		...(IS_DEV ? [] : [
			new CompressionPlugin(),
			new CssMinimizerPlugin(),
			new MiniCssExtractPlugin({ filename: "[hash].css" }),
		]),
	],
}

export default config