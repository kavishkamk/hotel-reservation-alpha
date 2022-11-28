import React, { useState } from "react";

// create context
const DefaultContext = React.createContext(false);

// context provider
const DefaultProvider = ({ children }) => {
	const [login, setLogin] = useState(false);
	const [popup, setPopup] = useState(false);

	const setPopup_func = () => {
		setPopup(!popup);
	};

	const setLogin_func = () => {
		setLogin(!login);
	};

	return (
		<DefaultContext.Provider
			value={{
				popup,
				setPopup_func,
				login,
				setLogin_func,
			}}
		>
			{children}
		</DefaultContext.Provider>
	);
};

export { DefaultContext, DefaultProvider };
