import React from 'react'
import registerImage from "../../assets/auth/register.png"

const Registration = () => {
	return (
		<div className="">
			<div className="font-manrope font-bold text-xl text-white bg-textBlue text-center py-5">
				Registration
			</div>

			<div className="flex flex-col md:flex-row items-center justify-between w-full">
				{/* form */}
				<div className="order-last md:order-first font-manrope mx-10 my-5">
					<div className="flex md:flex-row flex-col md:gap-x-5">
						<div className="">
							<label
								for="firstname"
								className="text-sm text-textBlue"
							>
								First name
							</label>
							<input
								id="firstname"
								type="text"
								placeholder="First name"
								className="w-full my-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900"
							/>
						</div>

						<div className="">
							<label
								for="lastname"
								className="text-sm text-textBlue"
							>
								Last name
							</label>
							<input
								id="lastname"
								type="text"
								placeholder="Last name"
								className="w-full my-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900"
							/>
						</div>
					</div>

					<div className="">
						<label
							for="address"
							className="text-sm text-textBlue"
						>
							Address
						</label>
						<input
							id="address"
							type="text"
							placeholder="Address"
							className="w-full my-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900"
						/>
					</div>

					<div className="md:w-1/2">
						<label
							for="nic"
							className="text-sm text-textBlue"
						>
							NIC
						</label>
						<input
							id="nic"
							type="text"
							placeholder="NIC"
							className="w-full my-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900"
						/>
					</div>

					<div className="md:w-1/2">
						<label
							for="phoneNo"
							className="text-sm text-textBlue"
						>
							Phone No.
						</label>
						<input
							id="phoneNo"
							type="text"
							placeholder="Phone no."
							className="w-full my-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900"
						/>
					</div>

					<div className="flex flex-col md:flex-row md:items-end justify-between">
						<div className="md:w-1/2">
							<label
								for="email"
								className="text-sm text-textBlue"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								placeholder="Email Address"
								className="w-full mt-2 py-1 px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900"
							/>
						</div>

						<button className="w-fit text-sm text-white bg-textBlue font-semibold px-3 py-2 h-fit">
							Send confirmation mail
						</button>
					</div>

					<div className="text-xs text-textBlue my-2 mb-6">
						*Please check your Email and enter the
						verification code that we sent.
					</div>
					<div className="mt-2 md:w-1/2">
						<label
							for="verifcode"
							className="text-sm text-textBlue"
						>
							Verification Code
						</label>
						<input
							id="verifcode"
							type="number"
							placeholder="Verification Code"
							className="w-full my-2 py-1  px-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-indigo-400 border-gray-700 text-gray-900"
						/>
					</div>

					<div className="md:w-1/2">
						<label
							for="password"
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

					<button className="bg-[#4B51AC] text-white font-manrope font-semibold py-2 px-4 my-6 w-fit">
						Register
					</button>
				</div>

				<div className="m-10">
					<img src={registerImage} alt="hotel" />
				</div>
			</div>
		</div>
	);
}

export default Registration