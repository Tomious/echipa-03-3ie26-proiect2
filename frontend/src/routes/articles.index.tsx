import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { strapi } from "@/lib/strapi";
import { useAsync } from "@/hooks/useStrapi";
import { ArticleCard } from "@/components/ArticleCard";
import { Loader, ErrorState, EmptyState } from "@/components/States";

export const Route = createFileRoute("/articles/")({
  head: () => ({
    meta: [
      { title: "NexaTech Solutions" },
      { name: "description", content: "Browse every article on the blog." },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  useDebouncedEffect(() => {
    setDebounced(search);
    setPage(1);
  }, 300, [search]);

  const { data, loading, error } = useAsync(
    () => strapi.getArticles({ page, pageSize, search: debounced || undefined }),
    [page, debounced],
  );

  const meta = data?.meta?.pagination;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Articles</h1>
          <p className="mt-2 text-muted-foreground">
            {meta?.total ?? 0} {meta?.total === 1 ? "article" : "articles"} published
          </p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles…"
          className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm shadow-sm outline-none ring-ring/40 focus:ring-2 sm:w-72"
        />
      </header>

      {loading && <Loader />}
      {error && <ErrorState error={error} />}
      {data && data.data.length === 0 && (
        <EmptyState title="No articles found" hint={debounced ? "Try a different search." : undefined} />
      )}
      {data && data.data.length > 0 && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
          {meta && meta.pageCount > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>
              <span className="px-3 text-sm text-muted-foreground">
                Page {meta.page} of {meta.pageCount}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(meta.pageCount, p + 1))}
                disabled={page === meta.pageCount}
                className="rounded-md border border-border px-4 py-2 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

import { useEffect } from "react";
function useDebouncedEffect(fn: () => void, delay: number, deps: unknown[]) {
  useEffect(() => {
    const id = setTimeout(fn, delay);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}