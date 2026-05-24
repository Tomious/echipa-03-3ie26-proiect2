import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { strapi } from "@/lib/strapi";
import { useAsync } from "@/hooks/useStrapi";
import { CategoryCard } from "@/components/CategoryCard";
import { Loader, ErrorState, EmptyState } from "@/components/States";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Categories — StrapiBlog" },
      { name: "description", content: "Browse all blog categories." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const [search, setSearch] = useState("");
  const { data, loading, error } = useAsync(() => strapi.getCategories(), []);
  const filtered = data?.data.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Categories</h1>
          <p className="mt-2 text-muted-foreground">Browse content by topic.</p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter categories…"
          className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm outline-none ring-ring/40 focus:ring-2 sm:w-72"
        />
      </header>
      {loading && <Loader />}
      {error && <ErrorState error={error} />}
      {filtered && filtered.length === 0 && <EmptyState title="No categories match" />}
      {filtered && filtered.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => <CategoryCard key={c.id} category={c} />)}
        </div>
      )}
    </section>
  );
}