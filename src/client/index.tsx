import { render } from "react-dom"
import { createElement } from "react"
import { BrowserRouter as ReactRouter } from "react-router-dom"

import { ReactRedux } from "./redux"
import Pages from "./components/pages"
import Sidebar from "./components/sidebar"
import Loading from "./components/loading"
import { Provider as ApolloClient } from "./apollo"
import Authorization from "./components/authorization"

render(
	<ReactRedux>
		<ReactRouter>
			<ApolloClient>
				<Loading/>
				<Authorization>
					<Sidebar/>
					<Pages/>
				</Authorization>
			</ApolloClient>
		</ReactRouter>
	</ReactRedux>,
	document.getElementById("Root"),
)

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/sw.js")
	})
}