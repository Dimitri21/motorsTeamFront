import { Button } from '@material-ui/core';
import { useState, useRef } from 'react';

export default function FileUploader() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [isSelected, setIsSelected] = useState(false);
	const picture = useRef();

	const fileSelectedHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		let reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onload = function () {
			let myHeaders = new Headers();
			myHeaders.append('X-AUTH-TOKEN', 'jam-jam_API_Token_oczZ23V*F');

				let formData = new FormData();
				formData.append('image', reader.result);
				formData.append('name', 'toto');


			fetch('http://site2.webo:8888/api/image/', {
				method: 'POST',
				body: formData,
				headers: myHeaders,
			})
				.then((response) => response.json())
				.then((result) => {
					console.log('Success:', result);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		};
	};

	return (
		<div className={`slideAnimation`}>
			<input type="file" name="file" onChange={fileSelectedHandler} required />
			<input type="file" name="file" onChange={fileSelectedHandler} />
			<input type="file" name="file" onChange={fileSelectedHandler} />
			<input type="file" name="file" onChange={fileSelectedHandler} />
			<input type="file" name="file" onChange={fileSelectedHandler} />
			<input type="file" name="file" onChange={fileSelectedHandler} />


			<div>
				<button type="button" onClick={handleSubmission}>
					Télécharger
				</button>
			</div>
		</div>
	);
}
