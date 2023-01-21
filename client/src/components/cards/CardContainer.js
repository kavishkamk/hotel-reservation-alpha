import React, {useState} from 'react'
import ReactCardFlip from "react-card-flip";
import CardFront from "./CardFront"
import CardBack from "./CardBack"

const CardContainer = (props) => {
	const [flipped, setFlipped] = useState(false);

	const item = props.item
	const bookClickHandler = props.bookClickHandler

	const flip = () => {
		setFlipped(!flipped);
	};

	return (
		<div className="cursor-pointer">
			<ReactCardFlip isFlipped={flipped}>
				<CardFront
					title={props.title}
					image={props.image}
					price={props.price}
					stars={props.stars}
					onClick={flip}
				/>
				<CardBack
					onClick={flip}
					title={props.title}
					image={props.image}
					stars={props.stars}
					description={props.description}
					item={item}
					bookClickHandler={bookClickHandler}
					hideBookBtn={props.hideBookBtn}
				/>
			</ReactCardFlip>
		</div>
	);
}

export default CardContainer