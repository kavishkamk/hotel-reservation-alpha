import React, {useState} from 'react'
import ReactCardFlip from "react-card-flip";

// components
import CardFront from "./CardFront"
import CardBack from "./CardBack"

const CardContainer = (props) => {
	const [flipped, setFlipped] = useState(false);

	const flip = () => {
		setFlipped(!flipped);
		console.log("should flip")
	};

	return (
		<div className="">
			<ReactCardFlip isFlipped={flipped}>
				<CardFront 
					title={props.title} 
					image={props.image}
					price={props.price}
					onClick={flip} 
				/>
				<CardBack 
					onClick={flip} 
					title={props.title}
					image={props.image}
					description={props.description}
				/>
			</ReactCardFlip>
		</div>
	);
}

export default CardContainer