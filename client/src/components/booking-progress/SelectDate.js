import React, {useRef, useState} from 'react'

const SelectDate = (props) => {
	const checkbtnRef = useRef()
	const [checkStatus, setCheckStatus] = useState(false)

	// check for availability
	const checkHandler = ()=> {
		const checkin =
			document.getElementById("checkin").value;
		const checkout =
			document.getElementById("checkout").value;
		const guestCount =
			document.getElementById("guestCount").value;
		
		// all the options are selected
		if(checkin && checkout && guestCount){
			console.log(checkin, checkout, guestCount);

			checkbtnRef.current.classList.remove(
				"bg-lightPurple"
			);
			checkbtnRef.current.classList.add("bg-[#10B981]");

			// ***********************************
			// if selected dates available, display "available"
			setCheckStatus(true);

			console.log(checkbtnRef.current.classList)
		}

		
	}

	return (
		<div className="mx-auto">
			<div className="flex flex-col md:flex-row rounded-lg py-5 md:p-3 my-5 bg-lightBlueGray w-full md:w-fit">
				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						Check in
					</div>
					<input
						type="date"
						id="checkin"
						className="bg-lightBlueGray w-fit text-[#10B981] font-semibold my-3 md:my-0 md:text-2xl rounded-lg px-3 mx-2"
					/>
				</div>

				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						Check out
					</div>
					<input
						type="date"
						id="checkout"
						className="bg-lightBlueGray w-fit text-[#10B981] font-semibold my-3 md:my-0 md:text-2xl rounded-lg px-3 mx-2"
					/>
				</div>

				<div className="bg-lightBlueGray w-fit">
					<div className="uppercase text-textBlue font-semibold text-sm px-3 py-2">
						guests
					</div>
					<input
						type="number"
						id="guestCount"
						className="bg-lightBlueGray w-[120px] text-[#10B981] font-semibold px-3 mx-2 my-3 md:my-0 md:text-2xl "
					/>
				</div>

				<button onClick={checkHandler} ref={checkbtnRef} className="cursor-pointer hover:shadow-xl uppercase md:text-xl mx-auto text-center 
				font-bold text-white bg-lightPurple rounded-xl h-auto px-3 flex items-center my-4 md:my-0 py-3 md:py-0">
					<div className="cursor-pointer ">
						{checkStatus === false ? `CHECK AVAILABILITY` : `AVAILABLE`}
					</div>
				</button>
			</div>
		</div>
	);
}

export default SelectDate