import isEmpty from "lodash/isEmpty"
import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import { useStateLoading } from "../../redux"

import "./index.scss"

const bem = createBem("Loading")

const Loading: FC = () => {
	const loading = useStateLoading()
	return isEmpty(loading) ? null : (
		<div className={bem("")}>
			<div className={bem("line")}/>
			<div className={bem("subline", "asc")}/>
			<div className={bem("subline", "desc")}/>
		</div>
	)
}

export default Loading