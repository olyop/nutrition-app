import { createBem } from "@oly_op/bem"
import Button from "@oly_op/react-button"
import { createElement, FC } from "react"

import "./index.scss"

const bem = createBem("NewPlanPage")

const NewPlanPage: FC = () => (
	<div className="Padding">
		<h1 className="HeadingTwo MarginBottom">
			New Plan
		</h1>
		<form className={bem("inputs", "FlexColumn")}>
			<label className="BodyTwo MarginBottomQuart">
				Name
			</label>
			<input
				placeholder="Name"
				className="BodyTwo PaddingHalf Rounded MarginBottomHalf"
			/>
			<Button
				type="submit"
				text="Submit"
				icon="add_circle"
			/>
		</form>
	</div>
)

export default NewPlanPage