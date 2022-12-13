import React from 'react'
import {useLocation} from "react-router-dom"

const PrintPage = (props) => {
	const location = useLocation()
	console.log(location.state.data)
	
	return (
		<div>
			print heree
		</div>
	)
}

export default PrintPage