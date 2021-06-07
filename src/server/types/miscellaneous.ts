import { Pool } from "pg"
import { S3Client } from "@aws-sdk/client-s3"
import type { GraphQLResolveInfo } from "graphql"

import { User } from "./docs"

export interface Services {
	pg: Pool,
	s3: S3Client,
}

export interface Context extends Services {
	authorization?: User | null,
}

export interface ResolverParameter<P, A> {
	args: A,
	parent: P,
	context: Context,
	info: GraphQLResolveInfo,
}