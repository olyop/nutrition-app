import fs from "fs"
import path from "path"

import { SERVER_PATH } from "../globals"

export const SQL_PATH = path.join(SERVER_PATH, "sql")

const importSql =
	(fileName: string) =>
		fs.readFileSync(path.join(SQL_PATH, `${fileName}.sql`))
			.toString()

export default importSql