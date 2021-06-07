import cors from "cors"
import http from "http"
import morgan from "morgan"
import helmet from "helmet"
import express from "express"
import { json } from "body-parser"
import compression from "compression"

import {
	PORT,
	IS_DEV,
	LOG_FORMAT,
	PUBLIC_PATH,
	CORS_OPTIONS,
	HELMET_OPTIONS,
	EXPRESS_STATIC_OPTIONS,
	APOLLO_MIDDLEWARE_OPTIONS,
} from "./globals"

import apollo from "./apollo"
import serveClient from "./serve-client"

const app = express()

app.use(
	// @ts-ignore
	morgan(LOG_FORMAT),
	helmet(HELMET_OPTIONS),
	cors(CORS_OPTIONS),
	compression(),
	json(),
	express.static(PUBLIC_PATH, EXPRESS_STATIC_OPTIONS),
	apollo.getMiddleware(APOLLO_MIDDLEWARE_OPTIONS),
	serveClient(),
)

const onListen =
	() => console.log("Server started.")

http.createServer(app)
		.listen(PORT, IS_DEV ? undefined : onListen)