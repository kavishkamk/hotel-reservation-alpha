import React, {useState} from "react";
import Auth from "../../functions/Auth"

const SearchEmail = (props) => {
	const [value, setValue] = useState(Auth.getClientEmail());

	const searchHandler = () => {
		const input = document.getElementById("searchInput").value;
		props.onClick(input);
	};

	const deleteEmailHandler = async () => {
		Auth.deleteClientEmail()
		await setValue("")
		await props.setEmail("")
		document.getElementById("searchInput").value = "";
	}

	return (
		<fieldset className="w-2/3 mx-auto space-y-1 text-gray-900 shadow-lg">
			<label htmlFor="Search" className="hidden">
				Search
			</label>
			<div className="relative w-full">
				<input
					type="search"
					name="Search"
					placeholder={props.onClick ? "Search Email Address": "Email Address"}
					defaultValue={value}
					id="searchInput"
					className="w-full py-2 px-10 text-sm rounded-md focus:outline-none bg-white text-gray-700 focus:bg-gray-100 focus:border-indigo-200"
				/>

				{props.onClick && (<span className="absolute inset-y-0 right-2 flex items-center ">
					<button
						type="button"
						title="search"
						className="p-1 focus:outline-none bg-gray-300 my-1 px-2 rounded-lg"
						onClick={searchHandler}
					>
						<svg
							fill="currentColor"
							viewBox="0 0 512 512"
							className="w-4 h-4 text-gray-900"
						>
							<path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
						</svg>
					</button>

					<button onClick={deleteEmailHandler} className="bg-gray-300 my-1 px-2 rounded-lg font-bold ml-1">
						x
					</button>
				</span>)}
			</div>
		</fieldset>
	);
};

export default SearchEmail;
