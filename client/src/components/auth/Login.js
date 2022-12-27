import React, {useContext} from 'react'
import loginImage from "../../assets/auth/login.png";
import {DefaultContext} from "../../context/DefaultContext"

const Login = (props) => {
	const { setMessage_func, setMessageStatus_func } =
		useContext(DefaultContext);
		
	const loginHandler = async()=> {
		const email = document.getElementById("email").value
		const password = document.getElementById("password").value

		if(email.length >0 && password.length >0){
			await props.onClick(email, password)
		}else {
			setMessage_func(false, "Please enter email and password");
			setMessageStatus_func();
		}
	}

	return (
		<div className="">
			<div className="font-manrope font-bold text-xl text-white bg-textBlue text-center py-5">
				Login
			</div>

			<div className="flex flex-col md:flex-row items-center justify-evenly w-full md:pb-40">
				{/* form */}
				<div className="order-last md:order-first font-manrope mx-10 my-5">
					<div className="">
						<label
							htmlFor="email"
							className="text-sm text-textBlue"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							placeholder="Email"
							className="w-full my-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900"
						/>
					</div>

					<div className="">
						<label
							htmlFor="password"
							className="text-sm text-textBlue"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							placeholder="Password"
							className="w-full my-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900"
						/>
					</div>

					<button onClick={loginHandler} className="bg-[#4B51AC] text-white font-manrope font-semibold py-2 px-4 my-6 w-fit">
						Login
					</button>
				</div>

				<div className="">
					<img src={loginImage} alt="hotel" />
				</div>
			</div>
		</div>
	);
}

export default Login