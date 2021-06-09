import { createBem } from "@oly_op/bem"
import Button from "@oly_op/react-button"
import { NavLink } from "react-router-dom"
import { createElement, CSSProperties, FC } from "react"

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

	const rootStyle: CSSProperties = {
		width: sidebar ? "var(--sidebar-width)" : "61rem",
	}

	const buttonStyle: CSSProperties = {
		justifyContent: sidebar ? "flex-start" : "center",
	}

	const menuStyle: CSSProperties = {
		...buttonStyle,
		paddingLeft: sidebar ? "18rem" : undefined,
		width: sidebar ? undefined : "calc(var(--space) + var(--button-height))",
	}

	const linkStyle: CSSProperties = {
		...buttonStyle,
		paddingLeft: sidebar ? "calc(var(--space-half) + -2rem)" : undefined,
	}

	return (
		<header className={bem("", "BorderRight")} style={rootStyle}>
			<div className="BorderBottom">
				<Button
					icon="menu"
					transparent
					style={menuStyle}
					onClick={handleMenuClick}
					className={bem("menu", "button")}
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
							icon="dashboard"
							style={linkStyle}
							text={sidebar ? "Plans" : undefined}
							className={bem("nav-button", "button")}
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
							style={linkStyle}
							text={sidebar ? "Search" : undefined}
							className={bem("nav-button", "button")}
						/>
					)}
				/>
			</div>
		</header>
	)
}

export default Sidebar