import { BrowserRouter as Router } from "react-router-dom";

import List from "./components/List";

export default function App() {
	return (
		<Router>
			<List />
		</Router>
	)
}