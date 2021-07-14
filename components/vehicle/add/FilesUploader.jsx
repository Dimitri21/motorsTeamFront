import { Button } from '@material-ui/core';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import classes from './AddVehicleForm.module.scss';

export default function FileUploader(props) {
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
		uploadThumbnail(event.target.files[0]);
	};

	const imagesHandler = (event) => {
		uploadImages(event.target.files[0]);
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

	const uploadThumbnail = (file) => {
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
					props.setVehicle({
						...props.vehicle,
						thumbnail: result.src,
					});
					props.setThumbnailImage(result.src);
					props.setThumbnailImageIsSet(true);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		};
	};

	const uploadImages = (file) => {
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
					props.setUploadedImages((previous) => [...previous, result.src]);
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
		<div className={`slideAnimation ${classes.galery}`}>
			<div className={classes.uploaderCard}>
				<h3>Image de l'annonce</h3>
				<div>
					{props.thumbnailImageIsSet ? (
						<img className={classes.thumbnailImage} src={props.thumbnailImage} />
					) : null}
				</div>
				<input
					type="file"
					name="thumbnail"
					id="thumbnail"
					className={classes.inputfile}
					onChange={thumbnailHandler}
				/>
				<label htmlFor="thumbnail">Choisissez un fichier</label>
			</div>
			<div className={classes.uploaderCard}>
				<h3>Galerie</h3>

				<div>
					{props.uploadedImages.length > 0 &&
						props.uploadedImages.map((image) => <img className={classes.thumbnailImage} src={image} />)}
				</div>
				<input className="" type="file" name="file" onChange={imagesHandler} />
			</div>
		</div>
	);
}
