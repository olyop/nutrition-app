import { IResolvers } from "apollo-server-express"

import {
	JWTResolver as JWT,
	UUIDResolver as UUID,
	DateResolver as Date,
	EmailAddressResolver as Email,
	TimestampResolver as Timestamp,
	PositiveIntResolver as PositiveInt,
	PositiveFloatResolver as PositiveFloat,
	NonNegativeIntResolver as NonNegativeInt,
} from "graphql-scalars"

import * as Query from "./query"
import * as Mutation from "./mutation"

const resolvers: IResolvers = {
	JWT,
	Date,
	UUID,
	Query,
	Email,
	Mutation,
	Timestamp,
	PositiveInt,
	PositiveFloat,
	NonNegativeInt,
}

export default resolvers