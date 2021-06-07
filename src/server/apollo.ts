import {
	ApolloServer,
	ExpressContext,
	ContextFunction,
} from "apollo-server-express"

import typeDefs from "./type-defs"
import resolvers from "./resolvers"

import { pg, s3 } from "./services"
import { Context, Services } from "./types"
import { APOLLO_SERVER_OPTIONS } from "./globals"
import { determineAuthorization } from "./helpers"

const services: Services =
	{ pg, s3 }

const context: ContextFunction<ExpressContext, Context> =
	({ req }) => ({
		...services,
		// @ts-ignore
		authorization: determineAuthorization(req),
	})

const apollo =
	new ApolloServer({
		context,
		typeDefs,
		resolvers,
		...APOLLO_SERVER_OPTIONS,
	})

export default apollo