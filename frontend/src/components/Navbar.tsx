import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { strapi } from "@/lib/strapi";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [articles, setArticles] = useState<{ documentId: string; title: string; slug?: string }[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    strapi.getArticles().then((res) => {
      setArticles(res.data ?? []);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-bold tracking-tight">
          <span className="text-primary">Nexa</span>Tech
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Home
            </Link>
          </li>

          {/* Articles Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Articles
              <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-border bg-card shadow-lg">
                <Link
                  to="/articles"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-primary border-b border-border hover:bg-accent rounded-t-xl"
                >
                  Vezi toate
                </Link>
                {articles.map((a) => (
                  <Link
                    key={a.documentId}
                    to="/articles/$slug"
                    params={{ slug: a.slug ?? a.documentId }}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary last:rounded-b-xl"
                  >
                    {a.title}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link
              to="/categories"
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden rounded-md p-2 text-foreground hover:bg-accent"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {[
              { to: "/", label: "Home" },
              { to: "/articles", label: "Articles" },
              { to: "/categories", label: "Categories" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  className="block py-3 text-sm font-medium text-foreground/80"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}