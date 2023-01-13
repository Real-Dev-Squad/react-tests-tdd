function isEmptyObject(object) {
  //INFO: no conversion on comparison
  if (object?.toString() != "[object Object]") return true;
  return Object.keys(object).length == 0;
}

export function getDefaultValues(schema) {
  return schema.reduce((acc, value) => {
    let defaultValue;
    switch (value?.type) {
      case "text":
      case "textarea":
      case "select":
      case "radioGroup":
        defaultValue = "";
        break;
      case "checkbox":
        defaultValue = false;
        break;
      default:
        defaultValue = "";
    }
    return { ...acc, [value.name]: defaultValue };
  }, {});
}

export function getInitialValues(initialValues, defaultValues) {
  if (isEmptyObject(initialValues)) return defaultValues;
  return { ...defaultValues, ...initialValues };
}

//TODO: write a strong isValid handler
//INFO: logic written for time-being to learn tdd
//INFO: isValid works only for input type text
export function isValid({ value, condition, type }) {
  if (!condition?.required) {
    return true;
  }
  //INFO: if input type is checbox,
  //INFO: then its must to have a boolean value
  if (type == "checkbox") {
    return !!value;
  }

  const isHavingPatternCondition = !!condition?.pattern;
  const isHavingMinLengthCondition = !!condition?.minLength;
  const isHavingMaxLengthCondition = !!condition?.maxLength;
  const targetedValidations =
    isHavingPatternCondition +
    isHavingMinLengthCondition +
    isHavingMaxLengthCondition;

  let validationsPassed = 0;
  const length = value.length;

  const regex = new RegExp(condition?.pattern);
  const isTestPassed = regex.test(value);

  if (isHavingPatternCondition && isTestPassed) {
    validationsPassed += 1;
  }

  if (isHavingMinLengthCondition && length >= condition.minLength) {
    validationsPassed += 1;
  }

  if (isHavingMaxLengthCondition && length <= condition.maxLength) {
    validationsPassed += 1;
  }

  return validationsPassed == targetedValidations;
}
