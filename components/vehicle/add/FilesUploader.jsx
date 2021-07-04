import { Button } from '@material-ui/core';
import { useState, useRef } from 'react';

export default function FileUploader(vehicle, setVehicle) {
	const [uploadedImages, setUploadedImages] = useState([]);
	const [thumbnail, setThumbnail] = useState();

	const thumbnailHandler = (event) => {
		uploadFile(event.target.files[0], setThumbnail);
	};
	console.log(thumbnail);

	// function getBase64(file) {
	// 	reader.readAsDataURL(selectedFile);

	// 	reader.onload = function () {
	// 		imagesInBAse64.push(reader.result);
	// 		if (imagesInBAse64.length == fileInput.files.length) {
	// 			console.log(imagesInBAse64); // tableau contenant les images au format text
	// 			//displayGalery(imagesInBAse64);
	// 			uploadFiles(imagesInBAse64);
	// 		}
	// 	};

	// 	reader.onerror = function (error) {
	// 		console.log('Error: ', error);
	// 	};
	// }

	// function displayGalery() {
	// 	document.querySelector('#galery').innerHTML = imagesInBAse64.map((i) => '<img src="' + i + '" />').join('');
	// }

	// function uploadFiles(files) {
	// 	let i = 0;
	// 	for (let file of files) {
	// 		uploadFile(file);
	// 		i++;
	// 	}
	// }

	const uploadFile = (file, storage) => {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			let myHeaders = new Headers();
			myHeaders.append('X-AUTH-TOKEN', 'jam-jam_API_Token_oczZ23V*F');

			let formData = new FormData();
			formData.append('image', reader.result);

			fetch('http://localhost:8888/api/image/', {
				method: 'POST',
				body: formData,
				headers: myHeaders,
			})
				.then((response) => response.json())
				.then((result) => {
					console.log('Success:', result);
					storage(result.src)
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		};
	};

	// function uploadFile(file, name) {
	// 	let xhttp = new XMLHttpRequest();
	// 	xhttp.onload = function () {
	// 		let json = JSON.parse(xhttp.responseText);
	// 		console.log(json);
	// 		let index = imagesInBAse64.indexOf(file);
	// 		if (index != -1) {
	// 			imagesInBAse64[index] = json.url;
	// 		}
	// 	};
	// 	xhttp.open('POST', '/api/image/', true);
	// 	xhttp.setRequestHeader('X-AUTH-TOKEN', 'jam-jam_API_Token_oczZ23V*F');
	// 	let formData = new FormData();
	// 	formData.append('image', file);
	// 	formData.append('name', name);
	// 	xhttp.send(formData);
	// }

	// const image2SelectedHandler = (event) => {
	// 	setUploadedImages((prevValues) => {
	// 		return { ...prevValues, image2: event.target.files[0] };
	// 	});
	// };

	const handleSubmission = () => {
		let reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onload = function () {
			let myHeaders = new Headers();
			myHeaders.append('X-AUTH-TOKEN', 'jam-jam_API_Token_oczZ23V*F');

			let formData = new FormData();
			formData.append('image', reader.result);

			fetch('http://localhost:8888/api/image/', {
				method: 'POST',
				body: formData,
				headers: myHeaders,
			})
				.then((response) => response.json())
				.then((result) => {
					console.log('Success:', result);
					setVehicle({ ...vehicle, images: uploadedImages });
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		};
	};

	return (
		<div className={`slideAnimation`}>
			<div>
				<p>Image princpale</p>
				<input type="file" name="thumbnail" onChange={thumbnailHandler} />
			</div>
			<div>
				<p>Galleries</p>
				<input className="" type="file" name="file" onChange="" multiple />
			</div>

			{/* <input type="file" name="file" onChange={fileSelectedHandler} />
			<input type="file" name="file" onChange={fileSelectedHandler} />
			<input type="file" name="file" onChange={fileSelectedHandler} />
			<input type="file" name="file" onChange={fileSelectedHandler} /> */}

			<div>
				<button type="button" onClick={handleSubmission}>
					Télécharger
				</button>
			</div>
		</div>
	);
}
