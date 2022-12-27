import React, { useState, useContext } from "react";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { DefaultContext } from "../../context/DefaultContext";
import NavBtn from "./NavBtn";
import LogBtn from "./LogBtn";
import Logo from "../../assets/home-page/logo.svg";
import user from "../../assets/home-page/user.svg";

const Navbar = (props) => {
	const { login, setSure_func, setSureStatus_func } = useContext(DefaultContext);

	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const navigateHandler = (route) => {
		if (route !== "/") setIsOpen(!isOpen);

		navigate(route);
	};

	const logoutHandler = () => {
		setSure_func(
			"Are you sure you want to log out?",
			"Log out"
		);
		setSureStatus_func();
	};

	return (
		<>
			<div className="backdrop-blur-lg bg-white z-30 flex flex-row px-10 py-3 justify-between items-center fixed top-0 left-0 right-0">
				<div
					onClick={() => navigateHandler("/")}
					className="cursor-pointer w-48"
				>
					<img src={Logo} alt="logo" />
				</div>

				<div className="flex-row hidden md:flex">
					<NavBtn
						onClick={() => navigateHandler("/rooms")}
						name="rooms"
						rounded="rounded-2xl"
					/>
					<NavBtn
						onClick={() => navigateHandler("/restaurents")}
						name="restaurents"
						rounded="rounded-2xl"
					/>

					<NavBtn
						onClick={() => navigateHandler("/about-us")}
						name="about us"
					/>
					<NavBtn
						onClick={() => navigateHandler("/contact-us")}
						name="contact us"
					/>
					{!login && (
						<>
							<LogBtn
								onClick={() => navigateHandler("/login")}
								name="Login"
							/>
							<LogBtn
								onClick={() => navigateHandler("/register")}
								name="Register"
							/>
						</>
					)}

					{login && (
						<>
							<button
								onClick={() => navigateHandler("/profile")}
								className=""
							>
								<img src={user} alt="profile" />
							</button>
							<LogBtn
								onClick={logoutHandler}
								name="Log out"
							/>
						</>
					)}
				</div>

				{/* mobile menu icon */}
				<div className="-mr-2 flex md:hidden">
					<button
						onClick={() => setIsOpen(!isOpen)}
						type="button"
						className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
						aria-controls="mobile-menu"
						aria-expanded="false"
					>
						<span className="sr-only">Open main menu</span>
						{!isOpen ? (
							<svg
								className="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						) : (
							<svg
								className="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						)}
					</button>
				</div>
			</div>

			<Transition
				show={isOpen}
				enter="transition ease-out duration-100 transform"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="transition ease-in duration-75 transform"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
				className="fixed top-16 left-0 right-0 z-20"
			>
				{(ref) => (
					<div className="md:hidden" id="mobile-menu">
						<div
							ref={ref}
							className="flex flex-col items-center gap-y-3 bg-gray-900 py-6"
						>
							<NavBtn
								onClick={() => navigateHandler("/rooms")}
								name="rooms"
								rounded="rounded-2xl"
							/>
							<NavBtn
								onClick={() =>
									navigateHandler("/restaurents")
								}
								name="restaurents"
								rounded="rounded-2xl"
							/>

							<NavBtn
								onClick={() => navigateHandler("/about-us")}
								name="about us"
							/>
							<NavBtn
								onClick={() =>
									navigateHandler("/contact-us")
								}
								name="contact us"
							/>
							{!login && (
								<>
									<LogBtn
										onClick={() =>
											navigateHandler("/login")
										}
										name="Login"
									/>
									<LogBtn
										onClick={() =>
											navigateHandler("/register")
										}
										name="Register"
									/>
								</>
							)}

							{login && (
								<>
									<button
										onClick={() =>
											navigateHandler("/profile")
										}
										className=""
									>
										<img src={user} alt="profile" />
									</button>
									<LogBtn
										onClick={logoutHandler}
										name="Log out"
									/>
								</>
							)}
						</div>
					</div>
				)}
			</Transition>
		</>
	);
};

export default Navbar;
