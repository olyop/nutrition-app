import {
	UserBase,
} from "@oly_op/nutrition-app-common/types"

import { StoreObject } from "@apollo/client"

export type Doc<T = string> = StoreObject<T>

export interface User extends UserBase, Doc<"User"> {}