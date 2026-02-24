export default function Input({ label, type = "text", placeholder, value, onChange, className = "auth-field" }) {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}
