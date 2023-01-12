import { ERROR_DEFAULT_VALUE } from "./constants";
import { getDefaultValues, getInitialValues } from "./helper";
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
  const validInputsInitialValue = schema.reduce(
    (acc, value) => ({ ...acc, [value.name]: false }),
    {}
  );
  const [error, setError] = useState(ERROR_DEFAULT_VALUE);
  const [inputStep, setInputStep] = useState(0);
  const [validInputs, setValidInputs] = useState(validInputsInitialValue);
  function onSubmit(event) {
    event.preventDefault();
    clearError();

    if (!onFormSubmit) return;
  }
  function onPrevious() {
    clearError();
    setInputStep((prevInputStep) => prevInputStep - 1);
  }
  function onNext() {
    clearError();
    setInputStep((prevInputStep) => prevInputStep + 1);
  }
  function clearError() {
    setError(ERROR_DEFAULT_VALUE);
  }
  function onChange(value) {
    const { condition, name } = schema[inputStep];
    if (validInputs[name]) return;
    if (!condition.required) {
      setValidInputs((prevValidInputs) => ({
        ...prevValidInputs,
        [name]: true,
      }));
      return;
    }
    const length = value.length;
    if (length >= condition.minLength && length <= condition.maxLength) {
      setValidInputs((prevValidInputs) => ({
        ...prevValidInputs,
        [name]: true,
      }));
      return;
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <section>
        {schema.map((value, index) => (
          <StarbucksInput
            {...value}
            key={value.name}
            show={inputStep == index}
            onChange={onChange}
            defaultValue={mergedInitialValues[value.name]}
          />
        ))}
      </section>
      <section>
        <button
          onClick={onPrevious}
          type="button"
          aria-label="previous"
          disabled={inputStep == 0}>
          Prev
        </button>
        <button
          type="button"
          aria-label="next"
          onClick={onNext}
          disabled={!validInputs[schema[inputStep]?.name]}>
          Next
        </button>
      </section>
      {error.hasError && (
        <section>
          <small>{error.message}</small>
        </section>
      )}
    </form>
  );
}
