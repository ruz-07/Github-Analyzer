export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-secondary/60 ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}

export function Loader({
  label = "Loading",
}: {
  label?: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      {label}…
    </div>
  );
}