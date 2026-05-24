import { Link } from "@tanstack/react-router";
import { Category } from "@/lib/strapi";

export function CategoryCard({ category }: { category: Category }) {
  const count = category.articles?.length ?? 0;
  return (
    <Link
      to="/categories/$slug"
      params={{ slug: category.slug }}
      className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
    >
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Category
      </span>
      <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary">
        {category.name}
      </h3>
      {category.description && (
        <p className="line-clamp-2 text-sm text-muted-foreground">{category.description}</p>
      )}
      <span className="mt-2 text-xs text-muted-foreground">
        {count} {count === 1 ? "article" : "articles"}
      </span>
    </Link>
  );
}
