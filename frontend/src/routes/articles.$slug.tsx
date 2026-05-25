import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { strapi, strapiImage } from "@/lib/strapi";
import { useAsync } from "@/hooks/useStrapi";
import { SmartImage } from "@/components/SmartImage";
import { Loader, ErrorState } from "@/components/States";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticlePage,
});

// Sterge linia asta si adauga cod pagina FAQ

// Sterge linia asta si adauga cod pagina Servicii

// Sterge linia asta si adauga cod pagina Termeni&Conditii

// Sterge linia asta si adauga cod Tehnologii

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data: article, loading, error } = useAsync(() => strapi.getArticle(slug), [slug]);

  if (loading) return <Loader label="Loading article…" />;
  if (error) return <div className="mx-auto max-w-3xl px-4 py-12"><ErrorState error={error} /></div>;
  if (!article) return null;

  const date = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric",
  }) : "";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/articles" className="text-sm text-muted-foreground hover:text-primary">
        ← Back to articles
      </Link>
      <header className="mt-6">
        {article.category?.name && (
          <span className="text-xs font-medium uppercase tracking-widest text-primary">
            {article.category.name}
          </span>
        )}
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">{article.title}</h1>
        {article.description && (
          <p className="mt-4 text-lg text-muted-foreground">{article.description}</p>
        )}
        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{article.author?.name || "Anonymous"}</span>
          <span>·</span>
          <time>{date}</time>
        </div>
      </header>
      <div className="mt-8 overflow-hidden rounded-xl">
        <SmartImage src={strapiImage(article.cover)} alt={article.title} />
      </div>
      {slug === "faq" ? (
        <div className="mt-10">
          <FAQContent />
        </div>
      ) : slug === "servicii" ? (
        <div className="mt-10">
          <ServiciiContent />
        </div>
      ) : slug === "tehnologii" ? (
        <div className="mt-10">
          <TehnologiiContent />
        </div>
      ) : slug === "termeni-si-conditii" ? (
        <div className="mt-10">
          <TermeniContent />
        </div>
      ) : (
        typeof article.content === "string" && (
          <div className="prose prose-neutral mt-10 max-w-none whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
            {article.content}
          </div>
        )
      )}
      {Array.isArray(article.blocks) && article.blocks.length > 0 && (
        <div className="mt-10 space-y-6">
          {article.blocks.map((b, i) => {
            const block = b as { __component?: string; body?: string; title?: string };
            if (block.__component === "shared.rich-text" && block.body) {
              return <p key={i} className="whitespace-pre-wrap text-base leading-relaxed">{block.body}</p>;
            }
            if (block.__component === "shared.quote") {
              return (
                <blockquote key={i} className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  <p>{block.body}</p>
                  {block.title && <footer className="mt-2 text-sm">— {block.title}</footer>}
                </blockquote>
              );
            }
            return null;
          })}
        </div>
      )}
    </article>
  );
}
