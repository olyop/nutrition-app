import { DocumentNode } from "graphql"

declare module "*.gql" {
	const value: DocumentNode
	export = value
}