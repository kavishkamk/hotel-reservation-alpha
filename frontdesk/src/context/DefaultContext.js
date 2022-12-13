import React, { useState } from "react";

// create context
const DefaultContext = React.createContext(false);

// context provider
const DefaultProvider = ({ children }) => {
	const [path, setPath] = useState(window.location.pathname)

	const setPath_func = ()=> {
		setPath(window.location.pathname)
	}

	return (
		<DefaultContext.Provider value={{
			path, setPath_func
		}}>
			{children}
		</DefaultContext.Provider>
	);
}

export { DefaultContext, DefaultProvider };
