import { Button } from "@material-ui/core";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import classes from "./AddVehicleForm.module.scss";

export default function FileUploader(props) {
  // Set pregenerate title of ads on this step for avoiding problem with useEffect, and avoid unwanted modification when the user go back
  useEffect(() => {
    if (props.titleIsSet === false) {
      let titleAds = `${props.vehicle.brand} ${props.vehicle.carModel} ${props.vehicle.motor}`;
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

    if (props.thumbnailImage.length >= 1 && props.uploadedImages.length >= 1) {
      props.setStepIsValid(true);
    } else {
      props.setStepIsValid(false);
    }
  }, [props.uploadedImages, props.thumbnailImage]);

  // Handler

  const thumbnailHandler = (event) => {
    let image = event.target.files[0];

    if (image.type === "image/jpeg" || image.type === "image/png") {
      uploadThumbnail(event.target.files[0]);
    } else {
      alert(
        "Le format de l'image n'est pas valide, merci de télécharger un jpeg ou un png"
      );
    }
  };

  const imagesHandler = (event) => {
    let image = event.target.files[0];
    if (
      props.uploadedImages.length < 6 &&
      (image.type === "image/jpeg" || image.type === "image/png")
    ) {
      uploadImages(image);
    } else if (props.uploadedImages.length >= 6) {
      alert("Le nombre maximum d'image est atteint");
    } else {
      alert(
        "Le format de l'image n'est pas valide, merci de télécharger un jpeg ou un png"
      );
    }
  };

  const deleteImageHandler = (event) => {
    let array = [...props.uploadedImages];
    console.log(event);
    array.splice(event.target.id, 1);
    console.log(array);
    props.setUploadedImages(array);
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
        <p>Images téléchargées : {props.uploadedImages.length} / 6</p>

        <div className={classes.imageGallery}>
          {props.uploadedImages.length > 0 &&
            props.uploadedImages.map((image, index) => {
              return (
                <div key={index} id={index} className={classes.imageContainer}>
                  <img className={classes.uploadedImage} src={image} />
                  <div
                    onClick={deleteImageHandler}
                    id={index}
                    className={classes.deleteButton}
                  >
                    Supprimer
                  </div>
                </div>
              );
            })}
        </div>
        <input
          name="imageUploader"
          id="imageUploader"
          className={classes.inputfile}
          type="file"
          name="file"
          onChange={imagesHandler}
        />
        <label htmlFor="imageUploader">Choisissez un fichier</label>
      </div>
    </div>
  );
}
