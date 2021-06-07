import { createBem } from "@oly_op/bem"
import { Switch, Route } from "react-router-dom"
import { createElement, FC, CSSProperties } from "react"

import routes from "./routes"
import { useStateSidebar } from "../../redux"

import "./index.scss"

const bem = createBem("Pages")

const Pages: FC = () => {
	const sidebar = useStateSidebar()
	const style: CSSProperties = {
		width: sidebar ?
			"calc(100vw - var(--sidebar-width))" :
			"calc(100vw - var(--button-height) - var(--space))",
	}
	return (
		<main className={bem("")} style={style}>
			<Switch>
				{routes.map(
					({ id, path, exact, component }) => (
						<Route
							key={id}
							path={path}
							exact={exact}
							component={component}
						/>
					),
				)}
			</Switch>
		</main>
	)
}

export default Pages