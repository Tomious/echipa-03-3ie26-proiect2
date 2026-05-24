export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} StrapiBlog. Built with TanStack Start.</p>
        <p>Powered by Strapi CMS</p>
      </div>
    </footer>
  );
}
