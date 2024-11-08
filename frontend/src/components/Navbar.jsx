import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const handleNav = () => {
		setNav(!nav);
	};

	const navItems = [
		{ id: 1, text: "Register", href: "/register" },
		{ id: 2, text: "Log In", href: "/login" },
	];

	return (
		<nav className="bg-white flex justify-between items-center p-4 h-24 mx-auto text-white">
			{/* Logo */}
			<a href="/" className="w-full">
				<h1 className="text-3xl font-bold text-blue-600 cursor-pointer">
					SoundSync
				</h1>
			</a>

			{/* Desktop Navigation */}
			<ul className="w-1/6 hidden md:flex items-center">
				{!currentUser ? (
					navItems.map((item) => (
						<a
							key={item.id}
							href={item.href}
							className="p-4 w-24 hover:bg-blue-600 rounded-xl m-2 cursor-pointer duration-300 text-center text-black hover:text-white"
						>
							<li>{item.text}</li>
						</a>
					))
				) : (
					<a
						href="/profile"
						className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 w-full max-w-[200px] overflow-hidden"
					>
						<img
							src={currentUser.profilePicture || "/noavatar.png"}
							alt="User Avatar"
							className="h-8 w-8 rounded-full"
						/>
						<span className="text-lg font-medium truncate overflow-hidden text-ellipsis pr-2">
							{currentUser.username}
						</span>
					</a>
				)}
			</ul>

			{/* Mobile Navigation Icon */}
			<div onClick={handleNav} className="block md:hidden">
				{nav ? (
					<AiOutlineClose color="blue" size={20} />
				) : (
					<AiOutlineMenu color="blue" size={20} />
				)}
			</div>

			{/* Mobile Navigation Menu */}
			<ul
				className={
					nav
						? "fixed z-40 md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
						: "ease-in-out z-40 w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
				}
			>
				{/* Mobile Logo */}
				<h1 className="w-full text-3xl font-bold text-blue-600 m-4">SoundSync</h1>

				{/* Mobile Navigation Items */}
				{!currentUser ? (
					navItems.map((item) => (
						<a key={item.id} href={item.href} className="block">
							<li className="p-4 border-b rounded-xl hover:bg-blue-600 duration-300 hover:text-white cursor-pointer border-gray-600">
								{item.text}
							</li>
						</a>
					))
				) : (
					<div className="flex items-center space-x-3 p-4">
						<img
							src={currentUser.profilePicture || "/noavatar.png"}
							alt="User Avatar"
							className="w-10 h-10 rounded-full"
						/>
						<span className="text-gray-700 font-semibold truncate overflow-hidden text-ellipsis max-w-[180px]">
							{currentUser.username}
						</span>
					</div>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
