import { FC } from "react"
import { RouteComponentProps } from "react-router-dom"

export interface Route {
	id: string,
	path: string,
	icon?: string,
	name?: string,
	exact?: boolean,
	ignore?: boolean,
	component: FC<RouteComponentProps>,
}

export type Handler =
	() => void | Promise<void>