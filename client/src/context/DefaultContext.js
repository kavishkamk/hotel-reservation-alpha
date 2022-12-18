import React, { useState } from "react";

// create context
const DefaultContext = React.createContext(false);

// context provider
const DefaultProvider = ({ children }) => {
	const [login, setLogin] = useState(false);
	const [detailPopup, setDetailPopup] = useState(false);
	const [details, setDetails] = useState([]);
	const [details_title, setDetails_title] = useState();
	const [details_rate, setDetails_rate] = useState();
	const [details_images, setDetails_images] = useState([]);
	const [messageStatus, setMessageStatus] = useState(false);
	const [message, setMessage] = useState({});

	const setDetailPopup_func = () => {
		setDetailPopup(!detailPopup);
	};

	const setLogin_func = () => {
		setLogin(!login);
	};

	const setDetails_func = (detailsGot)=> {
		setDetails(detailsGot)
	}

	const setDetails_title_func = (title)=> {
		setDetails_title(title)
	}

	const setDetails_rate_func = (rate)=> {
		setDetails_rate(rate)
	}

	const setDetails_images_func = (images)=> {
		setDetails_images(images)
	}

	const setMessageStatus_func = () => {
		setMessageStatus(!messageStatus);
	};

	const setMessage_func = (status, message) => {
		setMessage({
			status: status,
			message: message,
		});
	};

	return (
		<DefaultContext.Provider
			value={{
				detailPopup,
				setDetailPopup_func,
				login,
				setLogin_func,
				details,
				setDetails_func,
				details_title,
				setDetails_title_func,
				details_rate,
				setDetails_rate_func,
				details_images,
				setDetails_images_func,
				messageStatus,
				setMessageStatus_func,
				message,
				setMessage_func,
			}}
		>
			{children}
		</DefaultContext.Provider>
	);
};

export { DefaultContext, DefaultProvider };
