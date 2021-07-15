import { Button } from "@material-ui/core";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import classes from "./AddVehicleForm.module.scss";

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

  // Set vehicle image when change
  useEffect(() => {
    const vehicleImages = props.uploadedImages;
    props.setVehicle({
      ...props.vehicle,
      images: vehicleImages,
    });
  }, [props.uploadedImages]);

  // Handler

  const thumbnailHandler = (event) => {
    uploadThumbnail(event.target.files[0]);
  };

  const imagesHandler = (event) => {
    uploadImages(event.target.files[0]);
  };

  const deleteImageHandler = (event) => {
	  
	let array = [...props.uploadedImages];

	  array.splice(event.target.id, 1)
	  console.log(array)
	  props.setUploadedImages(array)
  };

  const uploadThumbnail = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let myHeaders = new Headers();
      myHeaders.append("X-AUTH-TOKEN", "jam-jam_API_Token_oczZ23V*F");

      let formData = new FormData();
      formData.append("image", reader.result);

      fetch("http://localhost:8888/api/image/", {
        method: "POST",
        body: formData,
        headers: myHeaders,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          props.setVehicle({
            ...props.vehicle,
            thumbnail: result.src,
          });
          props.setThumbnailImage(result.src);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  };

  const uploadImages = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let myHeaders = new Headers();
      myHeaders.append("X-AUTH-TOKEN", "jam-jam_API_Token_oczZ23V*F");

      let formData = new FormData();
      formData.append("image", reader.result);

      fetch("http://localhost:8888/api/image/", {
        method: "POST",
        body: formData,
        headers: myHeaders,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          props.setUploadedImages((previous) => [...previous, result.src]);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  };

  return (
    <div className={`slideAnimation ${classes.galery}`}>
      <div className={classes.uploaderCard}>
        <h3>Image de l'annonce</h3>
        <div>
          {props.thumbnailImage.length > 0 && (
            <img
              className={classes.thumbnailImage}
              src={props.thumbnailImage}
            />
          )}
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
            props.uploadedImages.map((image, index) => {
              return (
                <div key={index} id={index} className="imageContainer">
                  <img className={classes.uploadedImage} src={image} />
                  <button type='button' onClick={deleteImageHandler} id={index}>
                    Supprimer
                  </button>
                </div>
              );
            })}
        </div>
        <input className="" type="file" name="file" onChange={imagesHandler} />
      </div>
    </div>
  );
}
