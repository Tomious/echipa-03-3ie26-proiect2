import { createFileRoute, Link } from "@tanstack/react-router";
import { strapi } from "@/lib/strapi";
import { useAsync } from "@/hooks/useStrapi";
import { ArticleCard } from "@/components/ArticleCard";
import { Loader, ErrorState, EmptyState } from "@/components/States";

export const Route = createFileRoute("/categories/$slug")({
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { data: category, loading, error } = useAsync(() => strapi.getCategory(slug), [slug]);
  const articles = useAsync(() => strapi.getArticles({ categorySlug: slug, pageSize: 24 }), [slug]);

  if (loading) return <Loader />;
  if (error) return <div className="mx-auto max-w-6xl px-4 py-12"><ErrorState error={error} /></div>;
  if (!category) return null;

  const list = articles.data?.data ?? category.articles ?? [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <Link to="/categories" className="text-sm text-muted-foreground hover:text-primary">
        ← All categories
      </Link>
      <header className="mt-6 border-b border-border pb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Category</p>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">{category.name}</h1>
        {category.description && (
          <p className="mt-3 max-w-2xl text-muted-foreground">{category.description}</p>
        )}
      </header>

      <div className="mt-10">
        {articles.loading && <Loader />}
        {articles.error && <ErrorState error={articles.error} />}
        {!articles.loading && list.length === 0 && (
          <EmptyState title="No articles in this category yet" />
        )}
        {list.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => <ArticleCard key={a.id} article={a} />)}
          </div>
        )}
      </div>
    </section>
  );
}
