import React from 'react'

// images
import cardImage from "../../assets/cards/card-image.png"
import starsImage from "../../assets/cards/5stars.png"
import favIcon from "../../assets/cards/fav-icon.svg"
import shareIcon from "../../assets/cards/share-icon.svg"
import reviewIcon from "../../assets/cards/review-icon.svg"

const CardBack = (props) => {

	const shareHandler = ()=> {

	}

	const reviewHandler = ()=> {

	}

	const favHandler = ()=> {

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
			<div className="w-fit mx-auto">
				<img src={starsImage} alt="stars" />
			</div>

			<div className="relative w-fit mx-auto">
				{/* main card image */}
				<div className="w-full bg-black">
					<img
						src={props.image}
						alt="card"
						className="opacity-40 sm:max-w-xs"
					/>
				</div>

				{/* description */}
				<div className="text-white text-xs md:text-sm mx-10 font-inter absolute top-5 left-0 right-0 text-center">
					{props.description}
				</div>

				<div className=" absolute bottom-0 left-0 right-0">
					<div className="flex flex-row w-full mx-auto justify-evenly items-center">
						<div onClick={reviewHandler} className="cursor-pointer">
							<img src={reviewIcon} alt="review" />
						</div>

						<div onClick={favHandler} className="cursor-pointer">
							<img src={favIcon} alt="favourite" />
						</div>

						<div onClick={shareHandler} className="cursor-pointer">
							<img src={shareIcon} alt="share" />
						</div>
					</div>

					<div className="bg-black flex flex-row py-3 w-full justify-evenly">
						<button className="font-poppins bg-[#4B51AC] text-white font-semibold w-fit px-3 py-2">
							Book Now
						</button>
						<button className="font-poppins bg-[#10B981] text-white font-semibold w-fit px-3 py-2">
							View More
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardBack