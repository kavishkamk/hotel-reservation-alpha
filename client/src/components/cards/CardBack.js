import React, { useContext } from "react";
import { DefaultContext } from "../../context/DefaultContext";
import cardImage from "../../assets/cards/card-image.png";
import starsImage from "../../assets/cards/5stars.png";
import favIcon from "../../assets/cards/fav-icon.svg";
import shareIcon from "../../assets/cards/share-icon.svg";
import reviewIcon from "../../assets/cards/review-icon.svg";

const CardBack = (props) => {
	const bookClickHandler = props.bookClickHandler;
	const item = props.item;
	const hideBookBtn = props.hideBookBtn;

	const {
		setDetails_func,
		setDetailPopup_func,
		detailPopup,
		setDetails_title_func,
		setDetails_images_func,
		setDetails_rate_func,
	} = useContext(DefaultContext);

	const bookHandler = () => {
		bookClickHandler(item);
	};

	const viewMoreHandler = () => {
		setDetails_func(props.item.details);
		setDetails_title_func(props.title)
		setDetails_rate_func(props.stars)
		setDetailPopup_func(!detailPopup);
		setDetails_images_func(props.item.images)
	};

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
					<div className="bg-black flex flex-row py-3 w-full justify-evenly">
						{!hideBookBtn && (
							<button
								onClick={bookHandler}
								className="font-poppins bg-[#4B51AC] text-white font-semibold w-fit px-3 py-2"
							>
								Book Now
							</button>
						)}
						<button
							onClick={viewMoreHandler}
							className="font-poppins bg-[#10B981] text-white font-semibold w-fit px-3 py-2"
						>
							View More
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardBack;
