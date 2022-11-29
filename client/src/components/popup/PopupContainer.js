import React, { useContext } from "react";
import { DefaultContext } from "../../context/DefaultContext";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const PopupContainer = (props) => {
	const { detailPopup, setDetailPopup_func } =
		useContext(DefaultContext);

	const closeHandler = () => {
		setDetailPopup_func(!detailPopup);
	};

	let starsDisplay = [];

	for (let i = 0; i < props.rate; i++) {
		starsDisplay.push(<div>&#11088;</div>);
	}

	return (
		<div className="fixed overflow-y-auto top-10 bottom-5 left-5 right-5 rounded-2xl shadow-2xl z-[60] items-center bg-[#E2E8F0]">
			<div className="mt-10 text-xl text-textBlue font-poppins mx-5 md:mx-10 font-bold">
				{props.title}
			</div>
			<div className="flex flex-row mx-10">
				{starsDisplay}
			</div>

			<div className="flex flex-col md:flex-row md:items-start justify-evenly">
				<div className="font-manrope text-textBlue text-sm m-10 relative">
					{props.details.map((item) => {
						return (
							<div className="my-5">
								<div className="font-semibold mb-3 underline underline-offset-4">
									{item.topic}
								</div>

								{item.content.map((feature) => {
									return <li className="">{feature}</li>;
								})}
							</div>
						);
					})}
				</div>

				<div className="mt-5 md:mt-10 order-first md:order-last">
					<Swiper
						spaceBetween={30}
						centeredSlides={true}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						pagination={{
							clickable: true,
						}}
						navigation={true}
						modules={[Autoplay, Pagination, Navigation]}
						className="w-[290px] md:w-[450px] mx-auto"
					>
						{props.images.map((image) => (
							<SwiperSlide>
								<img src={image} alt="slides" />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>

			{/* notification closing button */}
			<button
				type="button"
				onClick={closeHandler}
				className="ml-6 p-2 text-black absolute top-2 right-2"
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
	);
};

export default PopupContainer;
