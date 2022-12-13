import React, {useContext} from 'react'
import PageContainer from "../components/page/PageContainer";
import { DefaultContext } from "../context/DefaultContext";

const BookingPage = () => {
	const { path, setPath_func } = useContext(DefaultContext);
	setPath_func();

	return (
		<PageContainer>BookingPage</PageContainer>
	)
}

export default BookingPage