import { Request } from "express"
import { isUndefined } from "lodash"

import { verifyAccessToken } from "./verify-access-token"

export const determineAuthorization =
	(req: Request) => {
		const { authorization } = req.headers
		if (isUndefined(authorization)) {
			return undefined
		} else {
			return verifyAccessToken(authorization.substring(7))
		}
	}