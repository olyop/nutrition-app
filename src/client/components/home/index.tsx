import { createBem } from "@oly_op/bem"
import Button from "@oly_op/react-button"
import { createElement, FC } from "react"
import { NavLink } from "react-router-dom"

import "./index.scss"

const bem = createBem("Home")

const Home: FC = () => (
	<div className={bem("", "Padding")}>
		<h1 className="MarginBottom HeadingTwo">
			Plans
		</h1>
		<div className="MarginBottom">
			<p className="BodyOne">
				No Plans.
			</p>
		</div>
		<div className="Flex">
			<NavLink to="/new-plan">
				<Button
					text="New Plan"
					icon="add_circle"
				/>
			</NavLink>
		</div>
	</div>
)

export default Home