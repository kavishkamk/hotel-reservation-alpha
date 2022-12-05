import React from "react";

// components
import BackButton from "../../components/booking-progress/BackButton";
import NextButton from "../../components/booking-progress/NextButton";
import Container from "../../components/booking-progress/Container";
import Topic from "../../components/booking-progress/Topic";
import SummaryLine from "../../components/booking-progress/SummaryLine";
import ImageUpload from "../../components/shared/ImageUpload";

const PaymentUpload = (props) => {
	// props
	const page = props.page;
	const setPage = props.setPage;
	const formData = props.formData;
	const setFormData = props.setFormData;
	const item = formData.item;

	const backHandler = () => {
		setPage(page - 1);
	};

	const bookHandler = () => {
		// setPage(page + 1);
	};

	return (
		<div className="">
			<Container>
				<Topic topic="Payment Confirmation" />

				<div className="font-poppins">
					<div className="my-4">
						<div className="font-semibold">Account Details</div>
						<div className="font-poppins text-sm text-gray-900">
							<div>Golden Aurora Hotel</div>
							<div>224-355-664-953</div>
							<div>Sampath Bank</div>
							<div>Maharagama Branch</div>
						</div>
					</div>

					<div className="text-red-700 font-semibold">
						Please pay the total reservation price to our bank account and upload the payment slip down below.
					</div>
				</div>
				<div className="w-fit mx-auto">
					<ImageUpload />
				</div>

				<div className="flex flex-row mt-auto pt-5">
					{!props.backHide && (
						<BackButton onClick={backHandler} />
					)}

					<div className="ml-auto">
						<NextButton onClick={bookHandler} name="Done" />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default PaymentUpload;
