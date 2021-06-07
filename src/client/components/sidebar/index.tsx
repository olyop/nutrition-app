import { createBem } from "@oly_op/bem"
import { createElement, CSSProperties, FC } from "react"
import Button from "@oly_op/react-button"
import { NavLink } from "react-router-dom"

import {
	useDispatch,
	toggleSidebar,
	useStateSidebar,
} from "../../redux"

import "./index.scss"

const bem = createBem("Header")

const Sidebar: FC = () => {
	const dispatch = useDispatch()
	const sidebar = useStateSidebar()

	const handleMenuClick =
		() => {
			dispatch(toggleSidebar())
		}

	const style: CSSProperties = {
		width: sidebar ? "var(--sidebar-width)" : "64rem",
	}

	return (
		<header className={bem("", "BorderRight")} style={style}>
			<div className="PaddingHalf BorderBottom Flex">
				<Button
					icon="menu"
					transparent
					onClick={handleMenuClick}
					text={sidebar ? "Nutrition-App" : undefined}
				/>
			</div>
			<div className="PaddingHalf FlexColumn">
				<NavLink
					to="/"
					className={bem("link")}
					children={(
						<Button
							transparent
							icon="list"
							className={bem("button")}
							text={sidebar ? "Plans" : undefined}
						/>
					)}
				/>
				<NavLink
					to="/search"
					className={bem("link")}
					children={(
						<Button
							transparent
							icon="search"
							className={bem("button")}
							text={sidebar ? "Search" : undefined}
						/>
					)}
				/>
			</div>
		</header>
	)
}

export default Sidebar