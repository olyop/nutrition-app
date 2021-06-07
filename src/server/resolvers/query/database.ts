import {
	join,
	query,
	parseRow,
} from "@oly_op/pg-helpers"

import {
	User,
} from "../../types"

import {
	SELECT_USER,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { createResolver } from "../../helpers"

const resolver =
	createResolver()

export const user =
	resolver<User, { userID?: string }>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_USER,
				parse: parseRow(),
				variables: [{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.USER),
				},{
					key: "userID",
					value: args.userID || context.authorization!.userID,
				}],
			})
		),
	)