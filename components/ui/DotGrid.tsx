export default function DotGrid({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="dot-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="3" fill="rgba(0,0,0,0.08)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>
  );
}
