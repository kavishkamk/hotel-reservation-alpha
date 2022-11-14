import React from 'react'

// containers
import HeroBanner from "../containers/home-page/HeroBanner"
import Gallery from "../containers/home-page/Gallery"
import Contact from "../containers/home-page/Contact"

const HomePage = () => {
	return (
		<div className="relative top-16">
			<HeroBanner />
			<Gallery />
			<Contact />
		</div>
	)
}

export default HomePage