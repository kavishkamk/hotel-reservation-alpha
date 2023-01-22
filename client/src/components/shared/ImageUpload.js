import React, {useState, useEffect, useRef} from 'react'

const ImageUpload = (props) => {
	const [file, setFile] = useState()
	const fileSelectRef = useRef()

	const imageSubmitHandler = event => {
		let selectedFile;

		if(event.target.files && event.target.files.length === 1){
			selectedFile = event.target.files[0]
			setFile(selectedFile)
		}
	}

	useEffect(()=> {
		if(!file) return;

		const fileReader = new FileReader()
		fileReader.onload = ()=> {
			props.setFormData({...props.formData, paymentImage: file})
		}
		fileReader.readAsDataURL(file)

	},[file])


	return (
		<fieldset className="w-4/5 space-y-1 text-textBlue font-poppins mt-5">
			<label
				for="files"
				className="block text-sm font-medium"
			>
				Upload The Payment Slip
			</label>
			<div className="flex items-center flex-col">
				<input
					type="file"
					name="files"
					accept=".png,.jpg,.jpeg"
					id="files"
					onChange={imageSubmitHandler}
					className="px-8 py-12 border-2 border-dashed rounded-md text-gray-300 bg-[#1E293B] whitespace-nowrap"
				/>
			</div>
		</fieldset>
	);
}

export default ImageUpload