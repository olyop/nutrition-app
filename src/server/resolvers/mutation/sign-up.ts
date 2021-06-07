import bcrypt from "bcrypt"
import { isEmpty } from "lodash"
import { v4 as uuid } from "uuid"
import { ValidationError } from "apollo-server-express"
import { join, query, parseRow } from "@oly_op/pg-helpers"

import {
	createResolver,
	validatePassword,
	generateAccessToken,
} from "../../helpers"

import { User } from "../../types"
import { INSERT_USER } from "../../sql"
import { COLUMN_NAMES } from "../../globals"

const resolver =
	createResolver()

export const signUp =
	resolver<string, Args>(
		async ({ args, context }) => {
			const validation =
				validatePassword(args.input.password)
			if (isEmpty(validation)) {
				throw new ValidationError(validation.toString())
			} else {
				const { userID } =
					await query(context.pg)({
						sql: INSERT_USER,
						parse: parseRow<User>(),
						variables: [{
							key: "userID",
							value: uuid(),
						},{
							key: "name",
							parameterized: true,
							value: args.input.name,
						},{
							key: "email",
							parameterized: true,
							value: args.input.email,
						},{
							string: false,
							key: "columnNames",
							value: join(COLUMN_NAMES.USER),
						},{
							key: "password",
							parameterized: true,
							value: await bcrypt.hash(args.input.password, 12),
						}],
					})
				return generateAccessToken(userID)
			}
		},
		false,
	)

interface Args {
	input: {
		name: string,
		email: string,
		password: string,
	},
}