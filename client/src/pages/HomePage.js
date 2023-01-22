import React from 'react'
import HeroBanner from "../containers/home-page/HeroBanner"
import Gallery from "../containers/home-page/Gallery"
import Contact from "../containers/home-page/Contact"
import About from "../containers/home-page/About"

const HomePage = () => {
	return (
		<div className="relative top-16">
			<HeroBanner />
			<Gallery />
			<About />
			<Contact />
		</div>
	)
}

export default HomePage