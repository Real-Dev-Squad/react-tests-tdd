import { ERROR_DEFAULT_VALUE } from "./constants";
import {
  getDefaultValues,
  getInitialValues,
  getSubmitButtonText,
  getButtonType,
} from "./helper";
import StarbucksInput from "../starbucks-input/index";
import { useState } from "react";

/**
 * disable prev button on step-1
 * disable prev button on submit button click
 * mount submit button on lastStep
 * unmount submit button if currentStep != lastStep
 * unmount next button when currentStep == lastStep
 * mount next button if currentStep != lastStep
 * render form schema based on step
 * change form schema based on input validations and index on next
 * and previous button clicks
 */
export default function StepperInputsForm({
  schema,
  initialValues,
  onSubmit: onFormSubmit,
}) {
  const defaultValues = getDefaultValues(schema);
  const mergedInitialValues = getInitialValues(initialValues, defaultValues);
  //INFO: consistent with zero-based index
  const MAX_INPUTS = schema.length - 1;
  const [error, setError] = useState(ERROR_DEFAULT_VALUE);
  const [inputStep, setInputStep] = useState(0);
  function onSubmit(event) {
    event.preventDefault();
    clearError();

    if (!onFormSubmit) return;
  }
  function onPrevious() {
    clearError();
    setInputStep((prevInputStep) => prevInputStep - 1);
  }
  function clearError() {
    setError(ERROR_DEFAULT_VALUE);
  }
  return (
    <form onSubmit={onSubmit}>
      <section>
        {schema.map((value, index) => (
          <StarbucksInput
            {...value}
            key={value.name}
            show={inputStep == index}
            defaultValue={mergedInitialValues[value.name]}
          />
        ))}
      </section>
      <button
        onClick={onPrevious}
        type="button"
        aria-label="previous"
        disabled={inputStep == 0}>
        Prev
      </button>
      <button
        type={getButtonType(inputStep, MAX_INPUTS)}
        aria-label={getSubmitButtonText(inputStep, MAX_INPUTS)}>
        {getSubmitButtonText(inputStep, MAX_INPUTS)}
      </button>
      {error.hasError && (
        <section>
          <small>{error.message}</small>
        </section>
      )}
    </form>
  );
}
