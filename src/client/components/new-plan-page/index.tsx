import { createBem } from "@oly_op/bem"
import Button from "@oly_op/react-button"
import { useState, createElement, FC } from "react"

import TextField from "../text-field"

import "./index.scss"

const bem = createBem("NewPlanPage")

const NewPlanPage: FC = () => {
	const [ name, setName ] = useState("")

	const handleNameChange =
		(value: string) => {
			setName(value)
		}

	return (
		<div className="Padding">
			<h1 className="HeadingTwo MarginBottom">
				New Plan
			</h1>
			<form className={bem("form", "FlexColumn")}>
				<TextField
					id="name"
					name="Name"
					value={name}
					placeholder="Weekdays"
					onChange={handleNameChange}
					className={bem("form-input", "MarginBottom")}
				/>
				<div className="FlexListGap">
					<Button
						text="Submit"
						icon="add_circle"
					/>
					<Button
						transparent
						icon="close"
						text="Cancel"
						className={bem("close")}
					/>
				</div>
			</form>
		</div>
	)
}

export default NewPlanPage