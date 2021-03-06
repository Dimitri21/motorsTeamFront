import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Paper, Grid } from "@material-ui/core";
import useHttp from "../../components/Hooks/use-http";
import classes from "../../styles/Forms.module.scss";

import AuthContext from "../../store/auth-context";

const validationSchema = yup.object({
  email: yup
    .string("Entrez votre email")
    .email("Merci d'entrer un email valide")
    .required("Merci d'entrer votre email"),
  password: yup
    .string("Entrez un mot de passe")
    .required("Merci d'entrer votre mot de passe"),
});

export default function Login() {
  const { isLoading, sendRequest: sendLoginRequest } = useHttp();
  const [error, setError] = useState();

  const auth = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // let jsonData = JSON.stringify({
      // 	email: values.email,
      // 	password: values.password,
      // });




    },
  });

  return (
    <main className={`main`}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <div className={classes.formCard}>
          <h1>Connexion</h1>
          <form onSubmit={formik.handleSubmit}>
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            <div className={classes.formAction}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Se connecter
              </Button>
            </div>
          </form>
        </div>
      </Grid>
    </main>
  );
}
