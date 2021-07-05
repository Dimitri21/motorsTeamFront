import React from 'react';
import { FormControl, Select, MenuItem, Typography } from '@material-ui/core';
import classes from './VehicleStateSelect.module.scss';

export default function VehicleStateSelect(props) {
	const handleChange = (event) => {
		props.setVehicleCondition(event.target.value);
	};

	return (
		<>
			<FormControl>
				<Select
					value={props.vehicleCondition}
					onChange={handleChange}
					displayEmpty
					className={classes.values}
					inputProps={{ 'aria-label': 'Without Label' }}
				>
					<MenuItem value={'Neuf'}>Neuf</MenuItem>
					<MenuItem value={'Très bon état'}>Très bon état</MenuItem>
					<MenuItem value={'Bon état'}>Bon état</MenuItem>
					<MenuItem value={'Etat correct'}>Etat correct</MenuItem>
					<MenuItem value={'Défaut connu'}>Défaut connu</MenuItem>
					<MenuItem value={'Non roulant'}>Non roulant</MenuItem>
					<MenuItem value={'Autres'}>Autres</MenuItem>
				</Select>
			</FormControl>
		</>
	);
}
