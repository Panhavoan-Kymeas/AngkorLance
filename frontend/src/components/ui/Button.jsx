export default function Button({ children, variant = "primary", fullWidth = false, onClick, type = "button", style }) {
  const cls =
    fullWidth ? "btn-full" :
    variant === "primary" ? "btn-primary" :
    variant === "outline" ? "btn-outline" :
    variant === "ghost"   ? "btn-ghost"   :
    variant === "cancel"  ? "btn-cancel"  :
    variant === "submit"  ? "btn-submit"  :
    "btn-primary";

  return (
    <button type={type} className={cls} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
