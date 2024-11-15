import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Layout() {
	return (
		<div className="h-full">
			<Navbar />
			<Outlet/>
		</div>
	);
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="h-full">
			<Navbar />
			<Outlet/>
		</div>
  );
}

export { Layout, RequireAuth };
