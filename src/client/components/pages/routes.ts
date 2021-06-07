import uniqueId from "lodash/uniqueId"

import Home from "../home"
import NewPlanPage from "../new-plan-page"

import { Route } from "../../types"

const routes: Route[] = [{
	path: "/",
	exact: true,
	id: uniqueId(),
	component: Home,
},{
	exact: true,
	id: uniqueId(),
	path: "/new-plan",
	component: NewPlanPage,
}]

export default routes