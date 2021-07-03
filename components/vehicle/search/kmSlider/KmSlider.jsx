import React from 'react';
import {Typography, Slider } from '@material-ui/core';
import classes from './KmSlider.module.scss'


export default function KmSlider () {


	const [kmValue, setKmValue] = React.useState([0, 500000]);
	const handleChange = (event, newValue) => {
		setKmValue(newValue);
	};

    return (
		<>
			<Typography id="range-slider" gutterBottom>
				Kilométrage
			</Typography>
			<Slider
				value={kmValue}
				onChange={handleChange}
				valueLabelDisplay="off"
				aria-labelledby="continuous-slider"
				max={500000}
				min={0}
				step={5000}
			/>
			<div className={classes.values}>
				<p>{kmValue[0]}km</p>
				<p>{kmValue[1]}+ km</p>
			</div>
		</>
	);
}