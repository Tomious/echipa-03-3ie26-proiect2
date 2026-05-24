import { createFileRoute, Link } from "@tanstack/react-router";
import { strapi } from "@/lib/strapi";
import { useAsync } from "@/hooks/useStrapi";
import { ArticleCard } from "@/components/ArticleCard";
import { CategoryCard } from "@/components/CategoryCard";
import { Loader, ErrorState, EmptyState } from "@/components/States";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StrapiBlog — Stories, ideas, and inspiration" },
      { name: "description", content: "Latest articles and categories from our Strapi-powered blog." },
    ],
  }),
  component: Home,
});

function Home() {
  const articles = useAsync(() => strapi.getArticles({ pageSize: 6 }));
  const categories = useAsync(() => strapi.getCategories());

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-accent/40 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Welcome to the blog
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Stories, ideas, and inspiration — straight from our Strapi CMS.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Discover the latest articles across tech, food, nature and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/articles"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Browse articles
            </Link>
            <Link
              to="/categories"
              className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              Explore categories
            </Link>
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Latest articles</h2>
            <p className="mt-2 text-muted-foreground">Fresh reads from the team.</p>
          </div>
          <Link to="/articles" className="hidden text-sm font-medium text-primary hover:underline sm:block">
            View all →
          </Link>
        </div>
        {articles.loading && <Loader />}
        {articles.error && <ErrorState error={articles.error} />}
        {articles.data && articles.data.data.length === 0 && (
          <EmptyState title="No articles yet" hint="Add some content in your Strapi admin." />
        )}
        {articles.data && articles.data.data.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.data.data.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Categories</h2>
            <p className="mt-2 text-muted-foreground">Browse by topic.</p>
          </div>
          {categories.loading && <Loader />}
          {categories.error && <ErrorState error={categories.error} />}
          {categories.data && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.data.data.map((c) => (
                <CategoryCard key={c.id} category={c} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
