import { useEffect, useState } from "react";
import classes from "./AddVehicleForm.module.scss";
import { isNotEmpty } from "./validateInputPattern";
import { TextField } from "@material-ui/core";
import useInput from "../../Hooks/use-input";
import VehicleStateSelect from "./VehicleStateSelect/VehicleStateSelect";

export default function VariousForm({
  vehicle,
  setVehicle,
  setStepIsValid,
  vehicleCondition,
  setVehicleCondition,
}) {
  const {
    value: priceValue,
    isValid: priceIsValid,
    hasError: priceHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPrice,
  } = useInput(isNotEmpty, vehicle.price);

  const {
    value: distanceValue,
    isValid: distanceIsValid,
    hasError: distanceHasError,
    valueChangeHandler: distanceChangeHandler,
    inputBlurHandler: distanceBlurHandler,
    reset: resetDistance,
  } = useInput(isNotEmpty, vehicle.distance);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isNotEmpty, vehicle.description);

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(isNotEmpty, vehicle.title);

  const {
    value: localisationValue,
    isValid: localisationIsValid,
    hasError: localisationHasError,
    valueChangeHandler: localisationChangeHandler,
    inputBlurHandler: localisationBlurHandler,
    reset: resetLocalisation,
  } = useInput(isNotEmpty, vehicle.localisation);

  if (priceIsValid && distanceIsValid && titleIsValid) {
    setStepIsValid(true);
  }

  useEffect(() => {
    setVehicle({
      ...vehicle,
      price: priceValue,
      distance: distanceValue,
      title: titleValue,
      description: descriptionValue,
      localisation: localisationValue,
      condition: vehicleCondition,
    });

    if (priceIsValid && distanceIsValid && titleIsValid) {
      setStepIsValid(true);
    } else {
      setStepIsValid(false);
    }
  }, [
    priceValue,
    distanceValue,
    titleValue,
    descriptionValue,
    localisationValue,
    vehicleCondition,
  ]);

  return (
    <div className={`slideAnimation`}>
      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="title"
          label="Titre de l'annonce"
          value={titleValue}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
          error={titleHasError}
          type="text"
          helperText={
            titleHasError ? "Merci de compléter cette information" : ""
          }
        />
      </div>

      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="distance"
          label="Kilométrage"
          value={distanceValue}
          onChange={distanceChangeHandler}
          onBlur={distanceBlurHandler}
          error={distanceHasError}
          type="number"
          helperText={
            distanceHasError ? "Merci de compléter cette information" : ""
          }
        />
      </div>

      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="price"
          label="Prix"
          value={priceValue}
          onChange={priceChangeHandler}
          onBlur={priceBlurHandler}
          error={priceHasError}
          type="number"
          helperText={
            priceHasError ? "Merci de compléter cette information" : ""
          }
        />
      </div>

      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="localisation"
          label="Localisation du véhicule"
          value={localisationValue}
          onChange={localisationChangeHandler}
          onBlur={localisationBlurHandler}
          error={localisationHasError}
          helperText={
            localisationHasError ? "Merci de compléter cette information" : ""
          }
        />
      </div>
      <div className={classes.formControl}>
        <VehicleStateSelect
          vehicleCondition={vehicleCondition}
          setVehicleCondition={setVehicleCondition}
        />
      </div>

      <div className={classes.formControl}>
        <TextField
          fullWidth
          name="description"
          label="Description"
          value={descriptionValue}
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
          error={descriptionHasError}
          type="text"
          multiline
          helperText={
            descriptionHasError ? "Merci de compléter cette information" : ""
          }
        />
      </div>
    </div>
  );
}
