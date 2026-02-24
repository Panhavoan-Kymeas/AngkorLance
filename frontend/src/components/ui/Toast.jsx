import { CheckCircle } from "../icons/Icons";

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="toast">
      <CheckCircle /> {message}
    </div>
  );
}
