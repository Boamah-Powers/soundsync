import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
	return (
		<div className="h-full">
			<Navbar />
			<Outlet/>
		</div>
	);
}

export { Layout };
