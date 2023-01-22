import React from "react";
import starsImage from "../../assets/cards/5stars.png";
import wifiIcon from "../../assets/cards/wifi.svg";
import handIcon from "../../assets/cards/hand.svg";
import parkingIcon from "../../assets/cards/parking.svg";

const CardFront = (props) => {
	let starsDisplay = [];

	for (let i = 0; i < props.stars; i++) {
		starsDisplay.push(<div>&#11088;</div>)
	}

	return (
		<div
			onClick={props.onClick}
			className="drop-shadow-[0_9px_4px_rgba(107,113,203,1)] bg-white w-[90%] sm:w-fit mx-auto p-4 rounded-lg border border-[#2B3087]"
		>
			{/* title */}
			<div className="text-center text-xl font-poppins text-textBlue font-bold filter-none">
				{props.title}
			</div>

			{/* stars */}
			<div className="w-fit mx-auto flex flex-row">
				{
					starsDisplay
				}
			</div>

			<div className="relative w-fit mx-auto">
				{/* main card image */}
				<div className="w-full">
					<img
						src={props.image}
						alt="card"
						className="sm:max-w-xs"
					/>
				</div>

				{/* facilities icons */}
				<div className="flex flex-col w-fit absolute top-3 right-3">
					<img
						className="w-5 my-0.5"
						src={wifiIcon}
						alt="wifi"
					/>
					<img
						className="w-5 my-0.5"
						src={parkingIcon}
						alt="parking"
					/>
					<img
						className="w-5 my-0.5"
						src={handIcon}
						alt="hand"
					/>
				</div>

				{/* price */}
				{props.price && (
					<div className="bg-black flex flex-row font-inter items-center justify-center gap-2 py-3 absolute bottom-0 left-0 right-0">
						<div className="text-2xl text-[#0889FF] font-bold">
							Rs.{props.price}
						</div>
						<div className="text-white text-sm">
							/ Night
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CardFront;
