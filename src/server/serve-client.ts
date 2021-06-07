import path from "path"
import { RequestHandler } from "express"

import { PUBLIC_PATH } from "./globals"

const serveClient = (): RequestHandler =>
	(_req, res) => {
		res.sendFile(path.join(PUBLIC_PATH, "index.html"))
	}

export default serveClient