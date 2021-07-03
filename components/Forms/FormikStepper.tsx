import React, { useState } from 'react';
import { Formik, Form, FormikConfig, FormikValues } from 'formik';
import { Button, Stepper, Step, StepLabel, Grid, CircularProgress } from '@material-ui/core';
import { FormikStepProps } from './FormikStep';

export default function FormikStepper({
	children,
	// finalMessage,
	// finalMessageButton,
	...props
}: FormikConfig<FormikValues>) {
	const childrenArray = React.Children.toArray(children);
	const [step, setStep] = useState(0);
	const currentChild = childrenArray[step] as React.ElementType<FormikStepProps>;
	const isLastStep = step === childrenArray.length - 1;
	const [completed, setCompleted] = useState(false);

	const handleBack = () => {
		setStep((step) => step - 1);
	};
	const handleNext = () => {
		setStep((step) => step + 1);
	};
	const handleResetStep = () => {
		setStep(0);
		setCompleted(false)
	};

	return (
		<>
			{completed ? (
				<>
					<p>{finalMessage}</p>
					<Button color="primary" variant="contained" onClick={handleResetStep}>
						{finalMessageButton}
					</Button>
				</>
			) : (
				<Formik
					{...props}
					validationSchema={currentChild.props.validationSchema}
					onSubmit={async (values, helpers) => {
						if (isLastStep) {
							await props.onSubmit(values, helpers);
							console.log(values);
							setCompleted(true);
							helpers.resetForm();
						} else {
							handleNext();
							helpers.setTouched({});
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form autoComplete="off">
							<Stepper alternativeLabel activeStep={step}>
								{childrenArray.map((child, index) => (
									<Step key={child.props.label} completed={step > index || completed}>
										<StepLabel key={index}>{child.props.label}</StepLabel>
									</Step>
								))}
							</Stepper>

							{currentChild}

							<Grid container spacing={2}>
								{step > 0 ? (
									<Grid item>
										<Button disabled={isSubmitting} onClick={handleBack}>
											Précédent
										</Button>
									</Grid>
								) : null}
								<Grid item>
									<Button
										startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
										disabled={isSubmitting}
										variant="contained"
										color="primary"
										type="submit"
									>
										{isSubmitting ? 'Submitting' : isLastStep ? 'Envoyer' : 'Suivant'}
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			)}
		</>
	);
}
