export default function StarbucksInput({
  name,
  onChange: onValueChange,
  value,
  error,
}) {
  if (error) return <span>{error}</span>;
  function onChange(event) {
    if (!onValueChange) return;
    const value = event.target.value;
    onValueChange(value);
  }
  return (
    <input
      name={name}
      aria-label={name}
      onChange={onChange}
      defaultValue={value}
    />
  );
}
