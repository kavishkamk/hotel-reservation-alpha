import React from 'react'
import RoomSelect from "./RoomSelect"
import RestaurentSelect from "./RestaurentSelect"

const ItemsFilter = (props) => {
	const page = props.page
	const setPage = props.setPage
	const formData = props.formData;
	const setFormData = props.setFormData;

	let container

	if (formData.type === 1) {
		container = (
			<RoomSelect
				page={page}
				setPage={setPage}
				formData={formData}
				setFormData={setFormData}
			/>
		);
	} else if (formData.type === 4) {
		container = (
			<RestaurentSelect
				page={page}
				setPage={setPage}
				formData={formData}
				setFormData={setFormData}
			/>
		);
	}

	return (
		<div className="">
			{container}
		</div>
	)
}

export default ItemsFilter