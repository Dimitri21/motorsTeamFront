
<script>
let fileInput = document.querySelector('input[type=file]');
let imagesInBAse64=[];
fileInput.onchange = function() {
	imagesInBAse64=[];
	for (let file of this.files) {
		getBase64(file);
	}
};

function getBase64(file) {
	var reader = new FileReader();
	reader.readAsDataURL(file);
	
	reader.onload = function () {
		imagesInBAse64.push(reader.result);
		if (imagesInBAse64.length == fileInput.files.length) {
			console.log(imagesInBAse64); // tableau contenant les images au format text
			displayGalery(imagesInBAse64);
			uploadFiles(imagesInBAse64);
		}
	};
	 
	reader.onerror = function (error) {
		console.log('Error: ', error);
	};
}

function displayGalery() {
	document.querySelector('#galery').innerHTML = imagesInBAse64.map(i=>'<img src="'+i+'" />').join('');
}

function uploadFiles(files) {
	let i=0;
	for (let file of files) {
		uploadFile(file, "AS-342-CX_"+i);
		i++;
	}
}

function uploadFile(file, name) {
	let xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		let json = JSON.parse(xhttp.responseText);
		console.log(json);
		let index = imagesInBAse64.indexOf(file);
		if (index!=-1) {
			imagesInBAse64[index] = json.url;
		}
	}
	xhttp.open("POST", "/api/image/", true);
	xhttp.setRequestHeader('X-AUTH-TOKEN','jam-jam_API_Token_oczZ23V*F');
	let formData = new FormData();
	formData.append('image', file);
	formData.append('name', name);
	xhttp.send(formData);
}
</script>