import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Paper, Grid } from '@material-ui/core';
import useHttp from '../Hooks/use-http';
import classes from '../../styles/Forms.module.scss';

const validationSchema = yup.object({
	companyName: yup
		.string('Entrez le nom de votre entreprise')
		.min(2, 'Le nom de votre entreprise doit faire au moins 2 caractères')
		.required("Merci d'entrer le nom de votre entreprise"),
	companyId: yup
		.string('Entrez le SIRET de votre entreprise')
		.min(9, 'Le SIRET de votre entreprise doit faire au moins 9 caractères')
		.required("Merci d'entrer le SIRET de votre entreprise"),
	email: yup
		.string('Entrez votre email')
		.email("Merci d'entrer un email valide")
		.required("Merci d'entrer votre email"),
	password: yup
		.string('Entrez un mot de passe')
		.min(8, 'Le mot de passe doit faire 8 caractères minimum')
		.required("Merci d'entrer votre mot de passe"),
	passwordConfirmation: yup
		.string()
		.required('Merci de confirmer votre de mot de passe')
		.oneOf([yup.ref('password'), null], 'Les mots de passe doivent être identiques'),
});

export default function RegisterForm() {
	const { isLoading, error, sendRequest: sendCreateUserRequest } = useHttp();

	const formik = useFormik({
		initialValues: {
			companyName: '',
			companyId: '',
			email: '',
			password: '',
			passwordConfirmation: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			//alert(JSON.stringify(values, null, 2));

			sendCreateUserRequest({
				url: 'http://127.0.0.1:8888/register',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					email: values.email,
					password: values.password,
				},
			});

			console.log(values);
		},
	});

	return (
		<>
			<h1>Inscription</h1>
			<form onSubmit={formik.handleSubmit}>
				<div className={classes.formControl}>
					<TextField
						fullWidth
						id="companyName"
						name="companyName"
						label="Nom de votre entreprise"
						value={formik.values.companyName}
						onChange={formik.handleChange}
						error={formik.touched.companyName && Boolean(formik.errors.companyName)}
						helperText={formik.touched.companyName && formik.errors.companyName}
					/>
				</div>
				<div className={classes.formControl}>
					<TextField
						fullWidth
						id="companyId"
						name="companyId"
						label="N° de SIRET"
						value={formik.values.companyId}
						onChange={formik.handleChange}
						error={formik.touched.companyId && Boolean(formik.errors.companyId)}
						helperText={formik.touched.companyId && formik.errors.companyId}
					/>
				</div>
				<div className={classes.formControl}>
					<TextField
						fullWidth
						id="email"
						name="email"
						label="Email"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
				</div>
				<div className={classes.formControl}>
					<TextField
						fullWidth
						id="password"
						name="password"
						label="Mot de passe"
						type="password"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
				</div>
				<div className={classes.formControl}>
					<TextField
						fullWidth
						id="passwordConfirmation"
						name="passwordConfirmation"
						label="Confirmez votre mot de passe"
						type="password"
						value={formik.values.confirmPassword}
						onChange={formik.handleChange}
						error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
						helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
					/>
				</div>
				<div className={classes.formAction}>
					<Button color="primary" variant="contained" fullWidth type="submit">
						S'inscrire
					</Button>
				</div>
			</form>
		</>
	);
}
