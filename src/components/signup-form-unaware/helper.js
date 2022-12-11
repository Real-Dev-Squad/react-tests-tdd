export function getDefaultValue(initialValues, name) {
  return initialValues?.find((v) => v.name === name) ?? {};
}
