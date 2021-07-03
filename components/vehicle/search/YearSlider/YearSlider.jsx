import React from 'react';
import {Typography, Slider } from '@material-ui/core';
import classes from './YearSlider.module.scss'


export default function YearSlider () {


	const [value, setValue] = React.useState([1980, 2021]);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    return (
		<>
			<Typography id="range-slider" gutterBottom>
				Année
			</Typography>
			<Slider
				value={value}
				onChange={handleChange}
				valueLabelDisplay="off"
				aria-labelledby="continuous-slider"
				max={2021}
				min={1980}
				step={1}
			/>
			<div className={classes.values}>
				<p>{value[0]}</p>
				<p>{value[1]}</p>
			</div>
		</>
	);
}