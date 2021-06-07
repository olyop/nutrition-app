import { useSelector } from "react-redux"

import {
	Settings,
} from "../types"

import { State } from "./store"

export const useStateLoading =
	() => useSelector<State, string[]>(state => state.loading)

export const useStateSettings =
	() => useSelector<State, Settings>(state => state.settings)

export const useStateSidebar =
	() => useSelector<State, boolean>(state => state.settings.sidebar)