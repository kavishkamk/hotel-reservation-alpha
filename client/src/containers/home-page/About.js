import React from 'react'
import img from "../../assets/home-page/bg.png"

const About = () => {
	return (
		<div className="">
			<div className="bg-white border-b-8 border-b-[#6B71CB] px-5 min-h-[calc(100vh-10rem)]">
				<div className="font-poppins text-xl md:text-4xl font-extrabold text-textBlue py-6 border-textBlue border-b-4 w-[90%] md:max-w-lg text-center mx-auto">
					We are
				</div>
				<div className="flex flex-col md:flex-row items-center justify-center my-10 gap-10 py-5">
					<div className="">
						<img src={img} alt="bg" />
					</div>

					<div className="max-w-lg text-center text-sm md:text-lg font-poppins font-medium my-5">
						We have the necessary facilities to implement
						that system as we are committed to maintaining
						our customers' satisfaction. You can get
						reliable service from us. In it, we give you
						special care for food and drinks etc. and it is
						our responsibility. You can rely on our hotel,
						which has many large subdivisions within our
						hotel chain. We sincerely invite you all. You
						are our responsibility.
					</div>
				</div>
			</div>
			<div className="h-6 bg-[#1E293B]"></div>
		</div>
	);
}

export default About