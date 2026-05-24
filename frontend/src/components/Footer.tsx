import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="space-y-2">
            <Link to="/" className="text-lg font-bold tracking-tight">
              <span className="text-primary">Nexa</span>Tech
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Soluții IT inovatoare pentru afaceri moderne.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NexaTech Solutions. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}