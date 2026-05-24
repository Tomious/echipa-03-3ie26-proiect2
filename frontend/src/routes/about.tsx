import { createFileRoute } from "@tanstack/react-router";
import { strapi, strapiImage } from "@/lib/strapi";
import { useAsync } from "@/hooks/useStrapi";
import { SmartImage } from "@/components/SmartImage";
import { Loader, ErrorState } from "@/components/States";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — StrapiBlog" },
      { name: "description", content: "About this blog." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data, loading, error } = useAsync(() => strapi.getAbout(), []);

  if (loading) return <Loader />;
  if (error) return <div className="mx-auto max-w-3xl px-4 py-12"><ErrorState error={error} /></div>;
  const page = data?.data;
  if (!page) return null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-bold sm:text-5xl">{page.title}</h1>
      {page.cover && (
        <div className="mt-8 overflow-hidden rounded-xl">
          <SmartImage src={strapiImage(page.cover)} alt={page.title} />
        </div>
      )}
      {Array.isArray(page.blocks) && (
        <div className="mt-10 space-y-8">
          {page.blocks.map((b, i) => {
            const block = b as { __component?: string; body?: string; title?: string };
            if (block.__component === "shared.rich-text" && block.body) {
              return (
                <div key={i} className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
                  {block.body}
                </div>
              );
            }
            if (block.__component === "shared.quote") {
              return (
                <blockquote key={i} className="border-l-4 border-primary bg-accent/30 p-6 italic">
                  <p className="text-lg">{block.body}</p>
                  {block.title && <footer className="mt-3 text-sm text-muted-foreground">— {block.title}</footer>}
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
