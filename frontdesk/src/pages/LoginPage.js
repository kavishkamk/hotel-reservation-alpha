import React, {useContext} from 'react'
import Login from "../components/auth/Login"
import PageContainer from "../components/page/PageContainer";
import Auth__connection from "../connections/Auth";
import Auth from "../functions/Auth"
import {DefaultContext} from "../context/DefaultContext"
import {useNavigate} from "react-router-dom"

const LoginPage = () => {
	const {
		setMessage_func,
		setMessageStatus_func,
		path,
		setPath_func,
	} = useContext(DefaultContext);

	setPath_func();
	const navigate = useNavigate()

	const loginHandler = async (email, password)=> {
		const result = await Auth__connection.loginHandler(
			email,
			password
		);

		if(result.status === false){
			setMessage_func(false, result.message)
			setMessageStatus_func()
		}
		else if(result.status === true){
			Auth.login(()=> {
				navigate("/")
			}, result.user)
		}
	}

	return (
		<PageContainer>
			<Login onClick={loginHandler} />
		</PageContainer>
	);
}

export default LoginPage