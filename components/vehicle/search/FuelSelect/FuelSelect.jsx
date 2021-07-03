import React from 'react';
import { FormControl, Select, MenuItem, Typography } from '@material-ui/core';
import classes from './FuelSelect.module.scss';

export default function FuelSelect() {
	const [fuel, setFuel] = React.useState('Essence');
	const handleChange = (event) => {
		setFuel(event.target.value);
	};

	return (
		<>
			<Typography gutterBottom>Carburant</Typography>
			<FormControl>
				<Select
					value={fuel}
					onChange={handleChange}
					displayEmpty
					className={classes.selectEmpty}
					inputProps={{ 'aria-label': 'Without label' }}
				>
					<MenuItem value={'Essence'}>
						Essence
					</MenuItem>
					<MenuItem value={'Diesel'}>Diesel</MenuItem>
					<MenuItem value={'Electrique'}>Electrique</MenuItem>
				</Select>
			</FormControl>
		</>
	);
}
