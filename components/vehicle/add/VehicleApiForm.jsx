import classes from "./AddVehicleForm.module.scss";
import { useEffect, useState } from "react";
import useInput from "../../Hooks/use-input";
import { TextField } from "@material-ui/core";

import { isNotEmpty } from "./validateInputPattern";

export default function VehicleApiForm({
  vehicle,
  setVehicle,
  setStepIsValid,
}) {
  const {
    value: brandValue,
    isValid: brandIsValid,
    hasError: brandHasError,
    valueChangeHandler: brandChangeHandler,
    inputBlurHandler: brandBlurHandler,
    reset: resetBrand,
  } = useInput(isNotEmpty, vehicle.brand);

  const {
    value: carModelValue,
    isValid: carModelIsValid,
    hasError: carModelHasError,
    valueChangeHandler: carModelChangeHandler,
    inputBlurHandler: carModelBlurHandler,
    reset: resetCarModel,
  } = useInput(isNotEmpty, vehicle.carModel);

  const {
    value: motorValue,
    isValid: motorIsValid,
    hasError: motorHasError,
    valueChangeHandler: motorChangeHandler,
    inputBlurHandler: motorBlurHandler,
    reset: resetMotor,
  } = useInput(isNotEmpty, vehicle.motor);

  const {
    value: carTypeValue,
    isValid: carTypeIsValid,
    hasError: carTypeHasError,
    valueChangeHandler: carTypeChangeHandler,
    inputBlurHandler: carTypeBlurHandler,
    reset: resetCarType,
  } = useInput(isNotEmpty, vehicle.carType);

  const {
    value: gearboxValue,
    isValid: gearboxIsValid,
    hasError: gearboxHasError,
    valueChangeHandler: gearboxChangeHandler,
    inputBlurHandler: gearboxBlurHandler,
    reset: resetGearbox,
  } = useInput(isNotEmpty, vehicle.gearbox);

  const {
    value: fuelTypeValue,
    isValid: fuelTypeIsValid,
    hasError: fuelTypeHasError,
    valueChangeHandler: fuelTypeChangeHandler,
    inputBlurHandler: fuelTypeBlurHandler,
    reset: resetFuelType,
  } = useInput(isNotEmpty, vehicle.fuelType);

  const {
    value: registrationDateValue,
    isValid: registrationDateIsValid,
    hasError: registrationDateHasError,
    valueChangeHandler: registrationDateChangeHandler,
    inputBlurHandler: registrationDateBlurHandler,
    reset: resetRegistrationDate,
  } = useInput(isNotEmpty, vehicle.registrationDate);

  useEffect(() => {
    setVehicle({
      ...vehicle,
      brand: brandValue,
      carModel: carModelValue,
      carType: carTypeValue,
      motor: motorValue,
      gearbox: gearboxValue,
      fuelType: fuelTypeValue,
      registrationDate: registrationDateValue,
    });

    // Step validation
    if (
      brandIsValid &&
      carModelIsValid &&
      motorIsValid &&
      carTypeIsValid &&
      gearboxIsValid &&
      fuelTypeIsValid &&
      registrationDateIsValid
    ) {
      setStepIsValid(true);
    } else {
      setStepIsValid(false);
    }
  }, [
    brandValue,
    carModelValue,
    carTypeValue,
    gearboxValue,
    fuelTypeValue,
    registrationDateValue,
    motorValue,
  ]);

  return (
    <div className={`slideAnimation`}>
      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="brand"
          label="Marque"
          value={brandValue}
          onChange={brandChangeHandler}
          onBlur={brandBlurHandler}
          error={brandHasError}
          type="text"
          helperText={
            brandHasError ? "Merci de compl??ter cette information" : ""
          }
        />
      </div>
      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="carModel"
          label="Mod??le"
          value={carModelValue}
          onChange={carModelChangeHandler}
          onBlur={carModelBlurHandler}
          error={carModelHasError}
          type="text"
          helperText={
            carModelHasError ? "Merci de compl??ter cette information" : ""
          }
        />
      </div>
      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="carType"
          label="Type"
          value={carTypeValue}
          onChange={carTypeChangeHandler}
          onBlur={carTypeBlurHandler}
          error={carTypeHasError}
          type="text"
          helperText={
            carTypeHasError ? "Merci de compl??ter cette information" : ""
          }
        />
      </div>
      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="motor"
          label="Motorisation"
          value={motorValue}
          onChange={motorChangeHandler}
          onBlur={motorBlurHandler}
          error={motorHasError}
          type="text"
          helperText={
            motorHasError ? "Merci de compl??ter cette information" : ""
          }
        />
      </div>
      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="gearbox"
          label="Bo??te de vitesse"
          value={gearboxValue}
          onChange={gearboxChangeHandler}
          onBlur={gearboxBlurHandler}
          error={gearboxHasError}
          type="text"
          helperText={
            gearboxHasError ? "Merci de compl??ter cette information" : ""
          }
        />
      </div>
      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="fuelType"
          label="Carburant"
          value={fuelTypeValue}
          onChange={fuelTypeChangeHandler}
          onBlur={fuelTypeBlurHandler}
          error={fuelTypeHasError}
          type="text"
          helperText={
            fuelTypeHasError ? "Merci de compl??ter cette information" : ""
          }
        />
      </div>
      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="registrationDate"
          label="Date de premi??re mise en circulation"
          value={registrationDateValue}
          onChange={registrationDateChangeHandler}
          onBlur={registrationDateBlurHandler}
          error={registrationDateHasError}
          type="text"
          helperText={
            registrationDateHasError
              ? "Merci de compl??ter cette information"
              : ""
          }
        />
      </div>
    </div>
  );
}
