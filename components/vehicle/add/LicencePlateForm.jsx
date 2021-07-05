import { TextField, Button, CircularProgress } from '@material-ui/core';
import classes from './AddVehicleForm.module.scss';
import { useEffect, useState } from 'react';

export default function LicencePlateForm({ vehicle, handleNext, setVehicle }) {
	const [licencePlateValue, setLicencePlateValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const valueIsValid = licencePlateValue.trim() !== '';
	const hasError = !valueIsValid && isTouched;

	const licencePlateChangeHandler = (e) => {
		setLicencePlateValue(e.target.value);
	};

	const licencePlateBlurHandler = () => {
		setIsTouched(true);
	};

	const reset = () => {
		setLicencePlateValue('');
		setIsTouched(false);
	};

	let formIsValid = false;

	if (valueIsValid) {
		formIsValid = true;
	}

	async function apiPlateHandler() {
		setIsLoading(true);
		const url = 'http://localhost:8888/licencePlate';
		let values = JSON.stringify({ licencePlate: licencePlateValue.trim() });
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('X-AUTH-TOKEN', 'jam-jam_API_Token_oczZ23V*F');

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: myHeaders,
				body: values,
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();
			console.log(data);
			setVehicle({
				...vehicle,
				carModel: data.CarModel.CurrentTextValue,
				brand: data.CarMake.CurrentTextValue,
				gearbox: data.ExtendedData.boiteDeVitesse,
				fuelType: data.FuelType.CurrentTextValue,
				registrationDate: data.RegistrationDate,
				motor: data.ExtendedData.libVersion,
				carType: data.BodyStyle.CurrentTextValue,
			});
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
		handleNext();
	}

	console.log(vehicle);

	async function onSubmitHandler(e) {
		e.preventDefault();
		if (!formIsValid) {
			return;
		}
		await apiPlateHandler();
	}

	return (
		<div className={`${classes.licencePlate} slideAnimation`}>
			<p>
				Trouvez votre véhicule à partir de la plaque d'immatriculation, ou passez à l'étape suivante si vous
				souhaitez rentrer les informations manuellement
			</p>
			<div className={classes.licencePlateForm}>
				<div className={classes.formControl}>
					<TextField
						fullWidth
						id="licencePlate"
						name="licencePlate"
						label="Plaque d'immatriculation"
						value={licencePlateValue}
						onChange={licencePlateChangeHandler}
						onBlur={licencePlateBlurHandler}
						error={hasError}
						helperText={hasError ? "Merci d'entrer une plaque d'immatriculation" : ''}
					/>
				</div>
				<div className={classes.licencePlateActions}>
					<Button
						onClick={onSubmitHandler}
						variant="contained"
						disabled={licencePlateValue === '' ? true : false}
					>
						Rechercher
						{isLoading && (
							<CircularProgress className={classes.circularProgress} color="secondary" size="1.2rem" />
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
