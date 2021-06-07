import {
	from,
	HttpLink,
	ApolloClient,
	TypePolicies,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client"

import head from "lodash/head"
import isNull from "lodash/isNull"
import { createElement, FC } from "react"
// eslint-disable-next-line import/no-extraneous-dependencies
import { onError } from "@apollo/client/link/error"
// eslint-disable-next-line import/no-extraneous-dependencies
import { setContext } from "@apollo/client/link/context"

import { getJWT, removeJWT } from "./helpers"

const typePolicies: TypePolicies = {}

const httpLink =
	new HttpLink()

const authLink =
	setContext(
		(_, { headers }) => ({
			headers: isNull(getJWT()) ? headers : {
				...headers,
				Authorization: `Bearer ${getJWT()}`,
			},
		}),
	)

const checkForAuthError =
	onError(
		({ forward, operation, graphQLErrors: graphQlErrors }) => {
			const error = head(graphQlErrors)
			if (error?.message === "Unauthenticated") {
				removeJWT()
				location.reload()
			} else {
				forward(operation)
			}
		},
	)

const link =
	from([ authLink, checkForAuthError, httpLink ])

const cache =
	new InMemoryCache({ typePolicies })

const client =
	new ApolloClient({ link, cache })

export const Provider: FC = ({ children }) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
)