import jwtDecode from "jwt-decode"

import { User } from "../types"

export const getJWT =
	() =>
		localStorage.getItem("authorization")

export const setJWT =
	(jwt: string) =>
		localStorage.setItem("authorization", jwt)

export const removeJWT =
	() =>
		localStorage.removeItem("authorization")

export const getJWTUserID =
	() => jwtDecode<Pick<User, "userID">>(getJWT()!).userID