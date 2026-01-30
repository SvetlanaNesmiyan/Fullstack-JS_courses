function Input({ placeholder, type = 'text', onChange, value }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export default Input;
