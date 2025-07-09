import styles from "./spinner.module.css";

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className={`${styles.loader} ${className}`.trim()}
    />
  );
}
