import StarbucksInput from "../starbucks-input/index";
import { getDefaultValue } from "./helper";

export default function Form({
  schema,
  initialValues,
  onSubmit: onFormSubmit,
}) {
  function onSubmit(event) {
    event.preventDefault();
    if (!onFormSubmit) return;

    const sourceObject = {};
    let isAnyValueEmpty = false;
    const formData = new FormData(event.currentTarget);

    for (let [k, v] of formData.entries()) {
      if (!v) {
        isAnyValueEmpty = true;
        break;
      }
      sourceObject[k] = v;
    }

    if (isAnyValueEmpty) return;

    onFormSubmit(sourceObject);
  }
  return (
    <form onSubmit={onSubmit}>
      {schema.map((e) => (
        <StarbucksInput
          key={e.name}
          {...e}
          {...getDefaultValue(initialValues, e.name)}
        />
      ))}
      <button type="submit" aria-label="submit">
        submit
      </button>
    </form>
  );
}
