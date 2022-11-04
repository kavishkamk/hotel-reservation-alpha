import React, {useState} from 'react'
import ReactCardFlip from "react-card-flip";

// components
import CardFront from "./CardFront"
import CardBack from "./CardBack"

const CardContainer = () => {
	const [flipped, setFlipped] = useState(false);

	const flip = () => {
		setFlipped(!flipped);
		console.log("should flip")
	};

	return (
		<div className="">
			<ReactCardFlip isFlipped={flipped}>
				<CardFront onClick={flip} />
				<CardBack onClick={flip} />
			</ReactCardFlip>
		</div>
	);
}

export default CardContainer