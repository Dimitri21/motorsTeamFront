import React, { useState } from 'react';
import { Button, TextField, Paper, Grid } from '@material-ui/core';
import classes from '../../styles/Forms.module.scss';

import RegisterForm from '../../components/Register/RegisterForm';
import CouponCodeForm from '../../components/Register/CouponCodeForm';

export default function Register() {
	const [step, setStep] = useState('coupon');

	const nextStepHandle = () => {
		setStep('register');
	};

	return (
		<main className={`main`}>
			<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
				<div className={classes.formCard}>
					{step === 'coupon' && <CouponCodeForm onClickNextStep={nextStepHandle} />}
					{step === 'register' && <RegisterForm />}
				</div>
			</Grid>
		</main>
	);
}
