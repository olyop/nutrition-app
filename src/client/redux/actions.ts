import { createAction } from "@reduxjs/toolkit"

const withPayloadType =
	<T>() => (payload: T) => ({ payload })

export const toggleSidebar =
	createAction("TOGGLE_SIDEBAR")

export const addLoading =
	createAction("ADD_LOADING", withPayloadType<string>())

export const removeLoading =
	createAction("REMOVE_LOADING", withPayloadType<string>())