import React from 'react';
import {Typography, Slider } from '@material-ui/core';
import classes from './PriceSlider.module.scss'


export default function PriceSlider () {

	const [value, setValue] = React.useState([0, 50000]);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    return (
		<>
			<Typography id="range-slider" gutterBottom>
				Prix
			</Typography>
			<Slider
				value={value}
				onChange={handleChange}
				valueLabelDisplay="off"
				aria-labelledby="continuous-slider"
				max={50000}
				min={0}
				step={500}
			/>
			<div className={classes.values}>
				<p>{value[0]} €</p>
				<p>{value[1]}+ €</p>
			</div>
		</>
	);
}