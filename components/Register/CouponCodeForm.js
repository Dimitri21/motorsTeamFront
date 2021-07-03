import { Button, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import classes from "../../styles/Forms.module.scss";

const validationSchema = yup.object({
  coupon: yup
    .string("Entrez votre code d'inscription")
    .required("Merci d'entrer votre code"),
});

const CouponCodeForm = (props) => {
  const formik = useFormik({
    initialValues: {
      coupon: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("send");
      props.onClickNextStep();
    },
  });

  return (
    <div>
      <h2> Entrez votre code de parainnage</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={classes.formControl}>
          <TextField
            fullWidth
            id="coupon"
            name="coupon"
            label="Code de parainnage"
            value={formik.values.coupon}
            onChange={formik.handleChange}
            error={formik.touched.coupon && Boolean(formik.errors.coupon)}
            helperText={formik.touched.coupon && formik.errors.coupon}
            autoComplete="off"
          />
        </div>

        <div className={classes.formAction}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Suivant
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CouponCodeForm;
