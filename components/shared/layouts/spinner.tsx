export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={`w-6 h-6 border-2 border-t-transparent border-b-transparent border-violet-600 rounded-full animate-spin ${className}`}
    />
  );
}
