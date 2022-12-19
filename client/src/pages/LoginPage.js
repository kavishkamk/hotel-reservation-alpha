import React, {useContext} from 'react'
import {DefaultContext} from "../context/DefaultContext"
import {useNavigate} from "react-router-dom"

// components
import Login from "../components/auth/Login"

const LoginPage = () => {
	const navigate = useNavigate()

	const loginHandler = (email, password)=> {
		console.log(email + "," + password)
		
	}

	return (
		<div className="relative top-16 bg-[#E2E8F0] min-h-[calc(100vh-10rem)]">
			<Login onClick={loginHandler} />
		</div>
	);
}

export default LoginPage