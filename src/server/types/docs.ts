import {
	UserBase,
} from "@oly_op/nutrition-app-common/types"

export interface User extends UserBase {
	password: string,
}