import { ERROR_DEFAULT_VALUE } from "./constants";
import { getDefaultValues, getInitialValues, isValid } from "./helper";
import StarbucksInput from "../starbucks-input/index";
import { useState } from "react";

export default function StepperInputsForm({
  schema,
  initialValues,
  onSubmit: onFormSubmit,
}) {
  const defaultValues = getDefaultValues(schema);
  const mergedInitialValues = getInitialValues(initialValues, defaultValues);
  //INFO: validates if optional
  const validInputsInitialValue = schema.reduce(
    (acc, value) => ({
      ...acc,
      [value.name]: value?.condition?.required
        ? isValid({ ...value, value: mergedInitialValues[value.name] })
        : !value?.condition?.required,
    }),
    {}
  );
  //INFO: consistent with zero-based index
  const MAX_INPUTS = schema.length - 1;
  const [error, setError] = useState(ERROR_DEFAULT_VALUE);
  const [inputStep, setInputStep] = useState(0);
  const [validInputs, setValidInputs] = useState(validInputsInitialValue);

  function onSubmit(event) {
    event.preventDefault();
    clearError();

    if (!onFormSubmit) return;

    let targetObject = {};
    const formData = new FormData(event.target);
    const formDataArray = Array.from(formData);
    const isFormDataHavingAnyEmptyValue = formDataArray.find(
      ([_, value]) => !value
    );

    if (isFormDataHavingAnyEmptyValue) return;
    targetObject = formDataArray.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );

    onFormSubmit(targetObject);
  }
  // TODO: clear currentInput value on moving back to previousInput
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
    const { condition, name, type } = schema[inputStep];

    if (!isValid({ value, condition, type })) {
      return;
    }

    setValidInputs((prevValidInputs) => ({
      ...prevValidInputs,
      [name]: true,
    }));
  }
  return (
    <form onSubmit={onSubmit}>
      <section>
        {/* TODO: don't pass condition prop */}
        {/* TODO: remove index-based key */}
        {/* INFO: not using separate defaultChecked and defaultValue props, because in case of checbox default value can be `false`. */}
        {schema.map((value, index) => (
          <StarbucksInput
            {...value}
            key={value.name}
            show={inputStep == index}
            onChange={onChange}
            {...(value.type == "checkbox"
              ? { defaultChecked: mergedInitialValues[value.name] }
              : { defaultValue: mergedInitialValues[value.name] })}
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
        {inputStep != MAX_INPUTS && (
          <button
            type="button"
            aria-label="next"
            onClick={onNext}
            disabled={!validInputs[schema[inputStep]?.name]}>
            Next
          </button>
        )}
        {inputStep == MAX_INPUTS && (
          <button
            type="submit"
            aria-label="submit"
            disabled={!validInputs[schema[inputStep]?.name]}>
            Submit
          </button>
        )}
      </section>
      {error.hasError && (
        <section>
          <small>{error.message}</small>
        </section>
      )}
    </form>
  );
}
