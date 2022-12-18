import React, { useContext } from "react";
import { DefaultContext } from "../../context/DefaultContext";

const Message = () => {
	const { setMessageStatus_func, message, sure } =
		useContext(DefaultContext);

	const notifCloseHandler = () => {
		setMessageStatus_func();
	};

	return (
		<>
			<div
				className={
					"fixed inset-x-0 inset-y-0 w-1/2 h-[15%] z-[60] m-auto flex flex-row items-center p-6 border-2 border-l-8 bg-slate-100 text-gray-900 " +
					(message.status === true
						? "border-green-400"
						: "border-red-400")
				}
			>
				<span className="mt-2 font-poppins font-bold">
					{message.message}
				</span>

				{/* notification closing button */}
				<button
					type="button"
					onClick={notifCloseHandler}
					className="ml-6 p-2 text-gray-800 absolute top-2 right-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="h-4 w-4"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
			</div>

			<div
				onClick={notifCloseHandler}
				className="w-screen fixed top-0 bottom-0 backdrop-blur-sm z-50"
			></div>
		</>
	);
};

export default Message;
