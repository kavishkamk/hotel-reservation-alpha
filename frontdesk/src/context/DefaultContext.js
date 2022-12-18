import React, { useState } from "react";

// create context
const DefaultContext = React.createContext(false);

// context provider
const DefaultProvider = ({ children }) => {
	const [path, setPath] = useState(window.location.pathname)
	const [messageStatus, setMessageStatus] = useState(true)
	const [message, setMessage] = useState({
		status: false,
		message: "something went wrong"
	})

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

	return (
		<DefaultContext.Provider value={{
			path, setPath_func,
			messageStatus, setMessageStatus_func,
			message, setMessage_func,
		}}>
			{children}
		</DefaultContext.Provider>
	);
}

export { DefaultContext, DefaultProvider };
