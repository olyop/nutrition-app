import {
	createReducer,
	combineReducers,
} from "@reduxjs/toolkit"

import {
	addLoading,
	removeLoading,
	toggleSidebar,
} from "./actions"

import {
	Settings,
} from "../types"

const loading =
	createReducer<string[]>([], builder =>
		builder
			.addCase(addLoading, (state, { payload }) => [
				...state,
				payload,
			])
			.addCase(removeLoading, (state, { payload }) => (
				state.filter(x => x !== payload)
			)))

const defaultSettings: Settings = {
	sidebar: false,
}

const settings =
	createReducer<Settings>(defaultSettings, builder =>
		builder
			.addCase(toggleSidebar, state => ({
				...state,
				sidebar: !state.sidebar,
			})))

const reducer =
	combineReducers({
		loading,
		settings,
	})

export default reducer