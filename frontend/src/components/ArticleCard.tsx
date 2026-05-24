import { Link } from "@tanstack/react-router";
import { Article, strapiImage } from "@/lib/strapi";
import { SmartImage } from "./SmartImage";

export function ArticleCard({ article }: { article: Article }) {
  const slug = article.slug || article.documentId;
  const date = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric",
  }) : "";
  return (
    <Link
      to="/articles/$slug"
      params={{ slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <SmartImage src={strapiImage(article.cover)} alt={article.title} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        {article.category?.name && (
          <span className="text-xs font-medium uppercase tracking-wider text-primary">
            {article.category.name}
          </span>
        )}
        <h3 className="text-lg font-semibold leading-tight text-card-foreground group-hover:text-primary">
          {article.title}
        </h3>
        {article.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{article.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>{article.author?.name || "Anonymous"}</span>
          <time>{date}</time>
        </div>
      </div>
    </Link>
  );
}
