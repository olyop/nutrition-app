import jwt from "jsonwebtoken"

import { JWT_TOKEN_SECRET, JWT_SIGN_OPTIONS } from "../../globals"

export const generateAccessToken =
	(userId: string) =>
		new Promise<string>(
			(resolve, reject) => {
				jwt.sign(
					{ userId },
					JWT_TOKEN_SECRET,
					JWT_SIGN_OPTIONS,
					(err, token) => (
						err ? reject(err) : resolve(token!)
					),
				)
			},
		)