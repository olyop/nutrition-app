import bcrypt from "bcrypt"
import { AuthenticationError } from "apollo-server-express"
import { query, exists, parseRow } from "@oly_op/pg-helpers"

import { User } from "../../types"
import { SELECT_USER_PASSWORD } from "../../sql"
import { createResolver, generateAccessToken } from "../../helpers"

const resolver =
	createResolver()

export const logIn =
	resolver<string, Args>(
		async ({ args, context }) => {
			const accountExists =
				await exists(context.pg)({
					table: "users",
					column: "user_id",
					value: args.input.userID,
				})
			if (accountExists) {
				const { userID, password } =
					await query(context.pg)({
						sql: SELECT_USER_PASSWORD,
						parse: parseRow<User>(),
						variables: [{
							key: "userID",
							value: args.input.userID,
						}],
					})
				const passwordIsValid =
					await bcrypt.compare(args.input.password, password)
				if (passwordIsValid) {
					return generateAccessToken(userID)
				} else {
					throw new AuthenticationError("Password is not correct")
				}
			} else {
				throw new AuthenticationError("User does not exist")
			}
		},
		false,
	)

interface Args {
	input: {
		userID: string,
		password: string,
	},
}