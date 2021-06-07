import helmet from "helmet"
import express from "express"
import { PoolConfig } from "pg"
import { CorsOptions } from "cors"
import { SignOptions } from "jsonwebtoken"
import { ApolloServerExpressConfig, GetMiddlewareOptions } from "apollo-server-express"

import {
	IS_DEV,
	AWS_RDS_ENDPOINT,
	AWS_RDS_PASSWORD,
} from "./environment"

type ExpressStaticOptions = Parameters<typeof express.static>[1]

type HelmetOptions = Parameters<typeof helmet>[0]

export const EXPRESS_STATIC_OPTIONS: ExpressStaticOptions = {
	index: false,
}

export const HELMET_OPTIONS: HelmetOptions = {
	contentSecurityPolicy: false,
}

export const PG_POOL_OPTIONS: PoolConfig = {
	port: 5432,
	user: "postgres",
	database: "index",
	host: AWS_RDS_ENDPOINT,
	password: AWS_RDS_PASSWORD,
	parseInputDatesAsUTC: true,
	idleTimeoutMillis: 1000 * 2,
}

export const APOLLO_MIDDLEWARE_OPTIONS: GetMiddlewareOptions = {
	cors: false,
	bodyParserConfig: false,
}

export const APOLLO_SERVER_OPTIONS: ApolloServerExpressConfig = {
	debug: IS_DEV,
	uploads: false,
	introspection: IS_DEV,
	playground: { settings: { "editor.theme": "light" } },
}

export const CORS_OPTIONS: CorsOptions = {
	origin: "*",
}

export const JWT_SIGN_OPTIONS: SignOptions = {
	expiresIn: "3d",
}