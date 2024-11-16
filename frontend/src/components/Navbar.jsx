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
			<a href="/" className="text-3xl font-bold text-blue-600 cursor-pointer">
				SoundSync
			</a>

			{/* Desktop Navigation */}
			<ul className="hidden md:flex items-center space-x-4">
				{!currentUser ? (
					navItems.map((item) => (
						<a
							key={item.id}
							href={item.href}
							className="px-4 py-2 hover:bg-blue-600 rounded-xl cursor-pointer duration-300 text-center text-black hover:text-white"
						>
							<li>{item.text}</li>
						</a>
					))
				) : (
					<a
						href="/profile"
						className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
					>
						<img
							src={currentUser.profilePicture || "/noavatar.png"}
							alt="User Avatar"
							className="h-8 w-8 rounded-full"
						/>
						<span className="text-lg font-medium truncate overflow-hidden text-ellipsis">
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
				className={`fixed top-0 left-0 w-[60%] h-full bg-[#000300] z-40 border-r border-gray-900 transform ${
					nav ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 ease-in-out md:hidden`}
			>
				{/* Mobile Logo */}
				<a href="/" className="block text-3xl font-bold text-blue-600 m-4">
					SoundSync
				</a>

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
					<a href="/profile" className="flex items-center space-x-3 p-4">
						<img
							src={currentUser.profilePicture || "/noavatar.png"}
							alt="User Avatar"
							className="w-10 h-10 rounded-full"
						/>
						<span className="text-gray-700 font-semibold truncate overflow-hidden text-ellipsis max-w-[180px]">
							{currentUser.username}
						</span>
					</a>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
