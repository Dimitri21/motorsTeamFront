import React, { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, Typography, Slider } from '@material-ui/core';
import Image from 'next/image';
import classes from './searchVehicle.module.scss';
import KmSlider from '../../../components/vehicle/search/kmSlider/KmSlider';
import useHttp from '../../../components/Hooks/use-http';
import PriceSlider from '../../../components/vehicle/search/PriceSlider/PriceSlider';
import YearSlider from '../../../components/vehicle/search/YearSlider/YearSlider';
import FuelSelect from '../../../components/vehicle/search/FuelSelect/FuelSelect';

export default function SearchVehicle() {
	const { isLoading, error, sendRequest: fetchVehicle } = useHttp();

	const vehicles = [
		{
			id: 1,
			price: '1000',
			description: 'lorem ipsum .....',
			brand: 'peugeot',
			image: '/assets/img/Car_Monochromatic.png',
			title: 'THis car is awesome',
		},
		{
			id: 2,
			brand: 'mercedes',
			price: '1000',
			description: 'lorem ipsum .....',
			image: '/assets/img/Car_Monochromatic.png',
			title: 'THis car is awesome',
		},
	];
	
	return (
		<main className={`main ${classes.search}`}>
			{/*Search Vehicle form*/}
			<div className={classes.searchBarBox}>
				<form action="" method="POST">
					<input id="searchVehicle" label="Search field" type="search" />
					<span></span>
				</form>
			</div>

			{/*Filter*/}

			<div className={classes.filter}>
				<div className={classes.filterBox}>
					<PriceSlider />
				</div>
				<div className={classes.filterBox}>
					<KmSlider />
				</div>
				<div className={classes.filterBox}>
					<FuelSelect />{' '}
				</div>
				<div className={classes.filterBox}>
					<YearSlider />
				</div>
			</div>

			<div className={classes.searchResult}>
				{vehicles.map((vehicle) => (
					<Card className={classes.card} key={vehicle.id}>
						<CardContent className={classes.cardContent}>
							<Link href={`/vehicles/${vehicle.id}`}>
								<div className={classes.touchZone}>
									<Image src={vehicle.image} width="150" height="150" />
									<div className={classes.description}>
										<h3>{vehicle.title}</h3>
										<h4>{vehicle.price} €</h4>
										<p>{vehicle.description}</p>
									</div>
								</div>
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</main>
	);
}
