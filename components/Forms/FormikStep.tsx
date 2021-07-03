import React, { useState } from 'react';
import { Formik, Form, FormikConfig, FormikValues } from 'formik';
import { Button } from '@material-ui/core';

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
	label:string;
}

export default function FormikStep({ children }: FormikStepProps) {
	return (
		<>
			{children}
		</>
	);
}
