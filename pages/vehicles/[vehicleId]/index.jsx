import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useHttp from '../../../components/Hooks/use-http';
import classes from './Vehicle.module.scss'

export default function VehicleAd() {
	const router = useRouter();
	// const { isLoading, error, sendRequest: fetchVehicle } = useHttp();

	const vehicle = {
		price: '1000',
		description: 'lorem ipsum .....',
		brand: 'peugeot',
		image: '/assets/img/Car_Monochromatic.png',
		title: 'THis car is awesome',
	};
	const vehicleId = router.query.vehicleId;
	const url = `https://localhost.fr/vehicle/${vehicleId}`;

	// send request to backend to fetch the data of the vehicle with vehicleId
	// useEffect(() => {
	// 	
	// 	);
	// }, []);

	return (
		<main className={`main`}>
			<h1>VehicleAd</h1>
			<p>{vehicleId}</p>
		</main>
	);
}
