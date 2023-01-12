function isEmptyObject(object) {
  //INFO: no conversion on comparison
  if (object?.toString() != "[object Object]") return true;
  return Object.keys(object).length == 0;
}

export function getSubmitButtonText(current, max) {
  return current == max ? "Submit" : "Next";
}

export function getButtonType(current, max) {
  return current == max ? "submit" : "button";
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
