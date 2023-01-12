export default function StarbucksInput({
  name,
  label,
  error,
  show = true,
  onChange: onValueChange,
  ...props
}) {
  function onChange(event) {
    if (!onValueChange) return;
    const { value } = event.target;
    onValueChange(value);
  }
  if (!show) return null;
  return (
    <div>
      <label>
        {label}
        <input name={name} aria-label={name} onChange={onChange} {...props} />
      </label>
      {error && <p>{error}</p>}
    </div>
  );
}
