import React, { useState, useEffect } from "react";
import {
  Step,
  StepLabel,
  Typography,
  Stepper,
  CardContent,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import LicencePlateForm from "./LicencePlateForm";
import VehicleApiForm from "./VehicleApiForm";
import VariousForm from "./VariousForm";
import FilesUploader from "./FilesUploader";
import classes from "./AddVehicleForm.module.scss";

function getSteps() {
  return [
    "Plaque d'immatriculation",
    "Vérifier les informations",
    "Photos",
    "Prix & kilométrage",
  ];
}

export default function AddVehicleForm() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [stepApiIsValid, setStepApiIsValid] = useState(false);
  const [stepVariousIsValid, setStepVariousIsValid] = useState(false);
  const [stepPicturesIsValid, setStepPicturesIsValid] = useState(false);
  // Use to store the initialisaton of the pregenerate title
  const [titleIsSet, setTitleIsSet] = useState(false);

  // Images
  const [uploadedImages, setUploadedImages] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState("");

  // Stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  // Vehicle condition
  const [vehicleCondition, setVehicleCondition] = useState("Bon état");

  // Vehicle
  const vehicleInit = {
    carModel: "",
    gearbox: "",
    fuelType: "",
    registrationDate: "",
    motor: "",
    price: "",
    distance: "",
    description: "",
    brand: "",
    carType: "",
    title: "",
    condition: "",
    localisation: "",
    thumbnail: "",
    images: [],
  };

  const [vehicle, setVehicle] = useState(vehicleInit);
  console.log(vehicle);

  // Form validation

  let formIsValid = false;

  let stepIsValid = true;

  if (!stepApiIsValid && activeStep === 1) {
    stepIsValid = false;
  }

  if (!stepPicturesIsValid && activeStep === 2) {
    stepIsValid = false;
  }

  if (stepApiIsValid && stepPicturesIsValid && stepVariousIsValid) {
    formIsValid = true;
  }

  // Handlers
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const valuesReset = () => {
    setVehicle(vehicleInit);
  };

  // Form submission

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(vehicle);
    handleNext();
    valuesReset();
    setIsLoading(false);
    setTitleIsSet(false);
    setUploadedImages("");
    setThumbnailImage("");
    setVehicleCondition("Bon état");
  };

  // Stepper
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <LicencePlateForm
            vehicle={vehicle}
            setVehicle={setVehicle}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <VehicleApiForm
            error={error}
            setError={setError}
            vehicle={vehicle}
            setVehicle={setVehicle}
            setStepIsValid={setStepApiIsValid}
          />
        );
      case 2:
        return (
          <FilesUploader
            vehicle={vehicle}
            setVehicle={setVehicle}
            setStepIsValid={setStepPicturesIsValid}
            setTitleIsSet={setTitleIsSet}
            titleIsSet={titleIsSet}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
            thumbnailImage={thumbnailImage}
            setThumbnailImage={setThumbnailImage}
          />
        );
      case 3:
        return (
          <VariousForm
            vehicle={vehicle}
            setVehicle={setVehicle}
            setStepIsValid={setStepVariousIsValid}
            vehicleCondition={vehicleCondition}
            setVehicleCondition={setVehicleCondition}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className={classes.form}>
            <Typography>Merci pour votre annonce</Typography>
            <Button onClick={handleReset}>Republier une annonce</Button>
          </div>
        ) : (
          <form className={classes.form} onSubmit={formSubmitHandler}>
            {getStepContent(activeStep)}
            <div className={classes.formActions}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Précédent
              </Button>
              {activeStep < steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!stepIsValid && true}
                >
                  Suivant
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!formIsValid && true}
                >
                  Envoyer
                  {isLoading && (
                    <CircularProgress
                      className={classes.circularProgress}
                      color="secondary"
                      size="1.2rem"
                    />
                  )}
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
