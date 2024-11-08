import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
	// State to manage the navbar's visibility
	const [nav, setNav] = useState(false);

	// Toggle function to handle the navbar's display
	const handleNav = () => {
		setNav(!nav);
	};

	// Array containing navigation items with href links
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
			<ul className="hidden md:flex">
				{navItems.map((item) => (
					<a
						key={item.id}
						href={item.href}
						className="p-4 w-24 hover:bg-blue-600 rounded-xl m-2 cursor-pointer duration-300 text-center text-black hover:text-white"
					>
						<li>{item.text}</li>
					</a>
				))}
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
						? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
						: "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
				}
			>
				{/* Mobile Logo */}
				<h1 className="w-full text-3xl font-bold text-blue-600 m-4">
					SoundSync
				</h1>

				{/* Mobile Navigation Items */}
				{navItems.map((item) => (
					<a key={item.id} href={item.href} className="block">
						<li className="p-4 border-b rounded-xl hover:bg-blue-600 duration-300 hover:text-white cursor-pointer border-gray-600">
							{item.text}
						</li>
					</a>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
