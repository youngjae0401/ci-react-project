import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardList from "./components/board/boardList";
import AddBoard from "./components/board/addBoard";
import EditBoard from "./components/board/editBoard";
 
function App() {
	return (
		<div className="container">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<BoardList />} />
					<Route path="/add" element={<AddBoard />} />
					<Route path="/edit/:id" element={<EditBoard />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
 
export default App;