import React, { useState } from 'react';
import { Step, StepLabel, Typography, Stepper, CardContent, Box, Button, CircularProgress } from '@material-ui/core';
import LicencePlateForm from './LicencePlateForm';
import VehicleApiForm from './VehicleApiForm';
import VariousForm from './VariousForm';
import FilesUploader from './FilesUploader';
import classes from './AddVehicleForm.module.scss';

function getSteps() {
	return ["Plaque d'immatriculation", 'Vérifier les informations', 'Photos', 'Prix & kilométrage'];
}

export default function AddVehicleForm() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [stepApiIsValid, setStepApiIsValid] = useState(false);
	const [stepPriceIsValid, setStepPriceIsValid] = useState(false);
	const [stepPicturesIsValid, setStepPicturesIsValid] = useState(false);

	console.log(stepApiIsValid, stepPriceIsValid);

	// Stepper
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	// Vehicle
	const vehicleInit = {
		carModel: '',
		gearbox: '',
		fuelType: '',
		registrationDate: '',
		motor: '',
		price: '',
		distance: '',
		description: '',
		brand: '',
		carType: '',
		title: '',
		localisation: '',
		vehicleCondition: '',
	};

	const [vehicle, setVehicle] = useState(vehicleInit);
	console.log(vehicle)

	// Form Inputs

	let formIsValid = false;

	// if (carModelIsValid && lastNameIsValid && emailIsValid) {
	// 	formIsValid = true;
	// }

	// Handler
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
	};

	// Stepper
	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return <LicencePlateForm vehicle={vehicle} setVehicle={setVehicle} handleNext={handleNext} />;
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
				return <FilesUploader setVehicle={setVehicle} setStepIsValid={setStepPicturesIsValid} />;
			case 3:
				return (
					<VariousForm vehicle={vehicle} setVehicle={setVehicle} setStepIsValid={setStepPriceIsValid} />
				);
			default:
				return 'Unknown stepIndex';
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
								<Button variant="contained" color="primary" onClick={handleNext}>
									Suivant
								</Button>
							)}
							{activeStep === steps.length - 1 && (
								<Button variant="contained" color="primary" type="submit">
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
