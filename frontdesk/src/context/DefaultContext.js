import React, { useState } from "react";

// create context
const DefaultContext = React.createContext(false);

// context provider
const DefaultProvider = ({ children }) => {
	const [path, setPath] = useState(window.location.pathname)
	const [messageStatus, setMessageStatus] = useState(false)
	const [message, setMessage] = useState({})
	const [sureStatus, setSureStatus] = useState(false)
	const [sure, setSure] = useState({})
	const [sureVerify, setSureVerify] = useState(false)
	const [sureModalDisplay, setSureModalDisplay] = useState(false)

	const setPath_func = ()=> {
		setPath(window.location.pathname)
	}

	const setMessageStatus_func = ()=> {
		setMessageStatus(!messageStatus)
	}

	const setMessage_func = (status, message)=> {
		setMessage({
			status: status,
			message: message
		})
	}

	const setSure_func = (message, btnName)=> {
		setSure({
			message: message,
			btnName: btnName
		})
	}

	// logoutModal display or hide
	const setSureStatus_func = () => {
		setSureStatus(!sureStatus)
	}

	// clicked on yes in modal "are you sure"
	const setSureVerify_func = (status) => {
		setSureVerify(status)
	}

	// modal "are you sure" display
	const setSureModalDisplay_func = (status) => {
		setSureModalDisplay(status)
	}

	return (
		<DefaultContext.Provider value={{
			path, setPath_func,
			messageStatus, setMessageStatus_func,
			message, setMessage_func,
			sureStatus, setSureStatus_func,
			sure, setSure_func,
			sureVerify, setSureVerify_func,
			sureModalDisplay, setSureModalDisplay_func,
		}}>
			{children}
		</DefaultContext.Provider>
	);
}

export { DefaultContext, DefaultProvider };
