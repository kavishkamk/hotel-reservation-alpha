import React, {useContext} from 'react'
import {DefaultContext} from "../context/DefaultContext"
import {useNavigate} from "react-router-dom"
import Auth__connection from "../connections/Auth"
import Login from "../components/auth/Login"
import Auth from "../functions/Auth"

const LoginPage = (props) => {
	const navigate = useNavigate()
	const { setMessage_func, setMessageStatus_func, setLogin_func } =
		useContext(DefaultContext);

	const loginHandler = async(email, password)=> {
		const result = await Auth__connection.loginHandler(email, password)

		if (result.status === false) {
			setMessage_func(false, result.message);
			setMessageStatus_func();
		} 
		else if (result.status === true) {
			Auth.login(() => {
				navigate("/");
			}, result.user);
			
			await setLogin_func()
			await props.setLoginStatus(props.loginStatus + 1)
		}
	}

	return (
		<div className="relative top-16 bg-[#E2E8F0] min-h-[calc(100vh-10rem)]">
			<Login onClick={loginHandler} />
		</div>
	);
}

export default LoginPage