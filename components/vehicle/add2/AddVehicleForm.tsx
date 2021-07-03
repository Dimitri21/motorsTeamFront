import { useState } from 'react';
import { CardContent, Box, Button, CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as yup from 'yup';
import FormikStepper from '../../Forms/FormikStepper';
import FormikStep from '../../Forms/FormikStep';
// import styles from './Add0VehicleForm.module.scss';

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function AddVehicleForm() {
	const vehicle = {
		carModel: '',
		gearbox: '',
		fuelType: '',
		registrationDate: '',
	};

	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [vehicleApi, setVehicleApi] = useState(vehicle);
	const [isLicencePlateSearched, setIsLicencePlateSearched] = useState(false);

	async function apiPlateHandler() {
		setIsLoading(true);
		const url = 'http://localhost:8888/licencePlate';
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {},
				body: null,
			});

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();
			console.log(data);
			console.log(data.FuelType.CurrentTextValue);
			setVehicleApi({
				...vehicleApi,
				carModel: data.Description,
				gearbox: data.ExtendedData.boiteDeVitesse,
				fuelType: data.FuelType.CurrentTextValue,
				registrationDate: data.RegistrationDate,
			});
		} catch (err) {
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
		setIsLicencePlateSearched(true);
	}

	function carModelHandler(e) {
		setVehicleApi({ ...vehicleApi, carModel: e.target.value });
	}

	console.log(vehicleApi);

	return (
		<CardContent>
			<FormikStepper
				initialValues={{
					licencePlate: '',
					title: '',
					price: 0,
					km: 0,
					description: '',
					carModel: '',
					gearbox: '',
					fuelType: '',
					registrationDate: '',
				}}
				finalMessage="Votre annonce a bien été publiée"
				finalMessageButton="Poster une nouvelle annonce"
				onSubmit={async (values) => {
					await sleep(3000);
				}}
			>
				<FormikStep label="Immatriculation" validationSchema={yup.object({})}>
					{!isLicencePlateSearched && (
						<>
							<Box paddingBottom={2}>
								<Field name="licencePlate" label="Immatriculation" component={TextField} fullWidth />
							</Box>
							<Box paddingBottom={2}>
								<Button type="button" variant="outlined" color="secondary" onClick={apiPlateHandler}>
									Rechercher
									{isLoading && <CircularProgress color="secondary" size="1.2rem" />}
								</Button>
							</Box>
						</>
					)}

					{isLicencePlateSearched && (
						<>
							<Box paddingBottom={2} paddingTop={2}>
								<Field
									name="carModel"
									label="Modèle"
									component={TextField}
									value={vehicleApi.carModel}
									onChange={carModelHandler}
									fullWidth
								/>
							</Box>
							<Box paddingBottom={2} paddingTop={2}>
								<Field
									name="gearbox"
									label="Boite de vitesse"
									component={TextField}
									value={vehicleApi.gearbox}
									fullWidth
								/>
							</Box>
							<Box paddingBottom={2} paddingTop={2}>
								<Field
									name="fuelType"
									label="Carburant"
									component={TextField}
									value={vehicleApi.fuelType}
									fullWidth
								/>
							</Box>
							<Box paddingBottom={2} paddingTop={2}>
								<Field
									name="registrationDate"
									label="Date de première mise en circulation"
									component={TextField}
									value={vehicleApi.registrationDate}
									fullWidth
								/>
							</Box>
						</>
					)}
				</FormikStep>
				<FormikStep
					label="Vérifier les informations"
					validationSchema={yup.object({
						title: yup
							.string()
							.min(7, "L'immatriculation doit avoir 7 catactères minium")
							.required("Merci d'entrer l'immatriculation du véhicule"),
					})}
				>
					<Box paddingBottom={2}>
						<Field name="title" label="Titre de l'annonce" component={TextField} fullWidth />
					</Box>
				</FormikStep>
				<FormikStep label="Prix & kilométrages">
					<Box paddingBottom={2}>
						<Field name="price" type="number" label="Prix du véhicule" component={TextField} fullWidth />
					</Box>
					<Box paddingBottom={2}>
						<Field
							name="km"
							type="number"
							label="Kilométrage du véhicule"
							component={TextField}
							fullWidth
						/>
					</Box>
					<Box paddingBottom={2}>
						<Field name="description" label="Description" component={TextField} fullWidth />
					</Box>
				</FormikStep>
			</FormikStepper>
		</CardContent>
	);
}
