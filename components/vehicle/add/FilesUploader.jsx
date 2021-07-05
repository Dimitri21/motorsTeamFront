import { Button } from '@material-ui/core';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import classes from './AddVehicleForm.module.scss';

export default function FileUploader(props) {
	const [uploadedImages, setUploadedImages] = useState([]);
	const [thumbnailImage, setThumbnailImage] = useState('');
	const [thumbnailImageIsSet, setThumbnailImageIsSet] = useState(false);


	// Set pregenerate title of ads on this step for avoiding problem with useEffect, and avoid unwanted modification when the user go back
	useEffect(() => {
		if (props.titleIsSet === false) {
			const titleAds = `${props.vehicle.brand} ${props.vehicle.carModel} ${props.vehicle.motor}`;
			props.setVehicle({
				...props.vehicle,
				title: titleAds,
			});
			props.setTitleIsSet(true);
		}
	}, []);

	const thumbnailHandler = (event) => {
		uploadThumbnail(event.target.files[0], 'thumbnail');
	};

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

	const uploadThumbnail = (file, storage) => {
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
					if (storage === 'thumbnail') {
						props.setVehicle({
							...props.vehicle,
							thumbnail: result.src,
						});
						setThumbnailImage(result.src);
						setThumbnailImageIsSet(true);
					} else {
						props.setVehicle({
							...props.vehicle,
							thumbnail: result.src,
						});
					}
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

	// const handleSubmission = () => {
	// 	let reader = new FileReader();
	// 	reader.readAsDataURL(selectedFile);
	// 	reader.onload = function () {
	// 		let myHeaders = new Headers();
	// 		myHeaders.append('X-AUTH-TOKEN', 'jam-jam_API_Token_oczZ23V*F');

	// 		let formData = new FormData();
	// 		formData.append('image', reader.result);

	// 		fetch('http://localhost:8888/api/image/', {
	// 			method: 'POST',
	// 			body: formData,
	// 			headers: myHeaders,
	// 		})
	// 			.then((response) => response.json())
	// 			.then((result) => {
	// 				console.log('Success:', result);
	// 				setVehicle({ ...vehicle, images: uploadedImages });
	// 			})
	// 			.catch((error) => {
	// 				console.error('Error:', error);
	// 			});
	// 	};
	// };

	return (
		<div className={`slideAnimation`}>
			<div>
				<p>Image princpale</p>
				{thumbnailImageIsSet ? <img className={classes.thumbnailImage} src={thumbnailImage} /> : null}

				<input type="file" name="thumbnail" onChange={thumbnailHandler} />
			</div>
			<div>
				<p>Galeries</p>
				<input className="" type="file" name="file" onChange={thumbnailHandler} multiple />
			</div>

			{/* <input type="file" name="file" onChange={fileSelectedHandler} />
			<input type="file" name="file" onChange={fileSelectedHandler} />
			<input type="file" name="file" onChange={fileSelectedHandler} />
			<input type="file" name="file" onChange={fileSelectedHandler} /> */}
		</div>
	);
}
