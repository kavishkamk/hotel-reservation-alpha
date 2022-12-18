import React, {useContext} from 'react'
import Login from "../components/auth/Login"
import PageContainer from "../components/page/PageContainer";
import Login__connection from "../connections/Login"
import Auth from "../functions/Auth"
import {DefaultContext} from "../context/DefaultContext"
import {useNavigate} from "react-router-dom"

const LoginPage = () => {
	const {setMessage_func, setMessageStatus_func} = useContext(DefaultContext)
	const navigate = useNavigate()

	const loginHandler = async (email, password)=> {
		console.log(email)
		console.log(password)

		const result = await Login__connection.loginHandler(email, password)
		console.log(result)

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
			{/* <Login /> */}
		</PageContainer>
	);
}

export default LoginPage