import React from 'react'

// containers
import RoomSelect from "./RoomSelect"
import PackageSelect from "./PackageSelect"
import OfferSelect from "./OfferSelect"
import RestaurentSelect from "./RestaurentSelect"

const ItemsFilter = (props) => {
	// props
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
	// } else if (formData.type === 2) {
	// 	container = (
	// 		<PackageSelect
	// 			page={page}
	// 			setPage={setPage}
	// 			formData={formData}
	// 			setFormData={setFormData}
	// 		/>
	// 	);
	// } else if (formData.type === 3) {
	// 	container = (
	// 		<OfferSelect
	// 			page={page}
	// 			setPage={setPage}
	// 			formData={formData}
	// 			setFormData={setFormData}
	// 		/>
	// 	);
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