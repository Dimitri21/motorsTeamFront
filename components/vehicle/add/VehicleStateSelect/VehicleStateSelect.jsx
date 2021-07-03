import React from 'react';
import { FormControl, Select, MenuItem, Typography } from '@material-ui/core';
import classes from './VehicleStateSelect.module.scss';

export default function VehicleStateSelect(props) {
	const handleChange = (event) => {
		setVehicleState(event.target.value);
	};

	return (
		<>
			<FormControl>
				<Select
					value={props.vehicleState}
					onChange={handleChange}
					displayEmpty
					className={classes.values}
					inputProps={{ 'aria-label': 'Without Label' }}
				>
					<MenuItem value={'new'}>Neuf</MenuItem>
					<MenuItem value={'very-good-condition'}>Très bon état</MenuItem>
					<MenuItem value={'good-condition'}>Bon état</MenuItem>
					<MenuItem value={'average-condition'}>Etat correct</MenuItem>
					<MenuItem value={'injured'}>Réparation à réaliser</MenuItem>
					<MenuItem value={'non-rolling-vehicle'}>Non roulant</MenuItem>
					<MenuItem value={'others'}>Autres</MenuItem>
				</Select>
			</FormControl>
		</>
	);
}
