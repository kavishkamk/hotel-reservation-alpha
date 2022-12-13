import React, {useContext} from 'react'
import PageContainer from "../components/page/PageContainer";
import { DefaultContext } from "../context/DefaultContext";

const CheckoutPage = () => {
	const { path, setPath_func } = useContext(DefaultContext);
	setPath_func();

	return (
		<PageContainer>CheckoutPage</PageContainer>
	)
}

export default CheckoutPage