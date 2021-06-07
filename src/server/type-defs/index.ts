import fs from "fs"
import path from "path"

import { SERVER_PATH } from "../globals"

const importSchema =
	(filename: string) =>
		`${fs.readFileSync(path.join(SERVER_PATH, "type-defs", `${filename}.gql`)).toString()}`

const typeDefs = `
	${importSchema("scalars")}
	${importSchema("inputs")}
	${importSchema("query")}
	${importSchema("mutation")}
	${importSchema("user")}
	${importSchema("food")}
	${importSchema("nutrient")}
	${importSchema("food-nutrient")}
	${importSchema("plan")}
`

export default typeDefs