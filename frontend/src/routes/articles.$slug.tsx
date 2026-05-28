import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { strapi, strapiImage } from "@/lib/strapi";
import { useAsync } from "@/hooks/useStrapi";
import { SmartImage } from "@/components/SmartImage";
import { Loader, ErrorState } from "@/components/States";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticlePage,
});

const faqItems = [
  {
	question: "Ce tipuri de servicii IT oferiți?",
	answer: "Oferim servicii complete: dezvoltare aplicații web și mobile, securitate cibernetică, infrastructură IT, migrare și optimizare cloud, integrare API și consultanță tehnică. Echipa noastră construiește soluții personalizate pentru nevoi de business diverse.",
  },
  {
	question: "Cum se desfășoară procesul de colaborare?",
	answer: "Începem cu o întâlnire de consultanță gratuită, apoi analizăm cerințele și propunem soluția tehnică. Dezvoltarea este realizată Agile, cu sprinturi transparente, testare continuă și revizuiri regulate, urmată de lansare și suport post-live.",
  },
  {
	question: "Cât durează de obicei un proiect de dezvoltare software?",
	answer: "Durata depinde de complexitate. Un MVP poate fi livrat în 4-8 săptămâni, un proiect mid-size în 2-4 luni, iar soluțiile enterprise pot necesita 6-12 luni. Estimările exacte sunt oferite după evaluarea cerințelor și specificațiilor.",
  },
  {
	question: "Ce tehnologii folosiți?",
	answer: "Folosim soluții moderne: React, Next.js, Node.js, Python, .NET, AWS, Azure, Google Cloud, Docker și Kubernetes. Alegem tehnologia potrivită pentru obiectivele tale, astfel încât proiectul să fie performant, scalabil și ușor de întreținut.",
  },
  {
	question: "Cum garantați securitatea datelor?",
	answer: "Implementăm protocoale avansate de securitate, criptare SSL, autentificare multi-factor și controale de acces. Realizăm audituri de securitate și testări periodice pentru a preveni vulnerabilitățile și a asigura conformitatea cu standardele GDPR și NIS2.",
  },
  {
	question: "Pot colabora cu voi pentru un proiect deja început?",
	answer: "Da, putem prelua proiecte aflate în desfășurare. Facem o auditare rapidă a stadiului actual, identificăm blocajele și propunem un plan clar pentru finalizare, optimizare și livrare în condiții de calitate.",
  },
  {
	question: "Oferiți soluții cloud și migrare?",
	answer: "Da, oferim migrare cloud pentru AWS, Azure și Google Cloud, precum și configurații hibride. Ne ocupăm de arhitectura cloud, automatizarea DevOps și optimizarea costurilor pentru a obține performanță și stabilitate maxime.",
  },
  {
	question: "Ce informații ar trebui să pregătesc pentru prima consultație?",
	answer: "Pentru prima discuție, este util să pregătești o scurtă descriere a afacerii, obiectivele proiectului, publicul țintă și principalele probleme pe care vrei să le rezolvi. Dacă ai deja un buget orientativ sau un termen de livrare, această informație ne ajută să facem o estimare mai rapidă.",
  },
  {
	question: "Cum funcționează procesul de revizii și modificări?",
	answer: "Stabilim împreună un număr de revizii incluse în fazele de design și dezvoltare, iar cererile adiționale sunt estimate separat. Comunicarea transparentă și feedback-ul regulat sunt esențiale pentru a asigura că produsul final respectă așteptările tale.",
  },
  {
	question: "Cine deține codul și documentația la finalul proiectului?",
	answer: "După finalizare și plata proiectului, codul sursă, documentația și toate materialele livrate sunt transferate clientului. Ne asigurăm că primești tot ce este necesar pentru administrare, mentenanță și eventuală extindere ulterioară.",
  },
  {
	question: "Ce garanții oferiți?",
	answer: "Oferim garanție de 6 luni pentru bug-uri după lansare și documentație completă pentru soluțiile livrate. Toate proiectele includ transfer de cunoștințe și suport pentru integrarea echipei tale în noul sistem.",
  },
  {
	question: "Oferiți consultanță gratuită?",
	answer: "Da, prima consultație este gratuită. Discutăm despre obiectivele tale de business, evaluăm opțiunile tehnologice și îți oferim o primă direcție clară pentru proiect.",
  },
  {
	question: "Care este intervalul de buget și ce factori influențează prețul?",
	answer: "Bugetul depinde de funcționalități, complexitate, tehnologie și durata dezvoltării. Proiectele mici pornesc de la estimări accesibile, iar pentru soluțiile enterprise oferim oferte personalizate după analiza cerințelor și obiectivelor de business.",
  },
];
 
function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
 
  return (
	<div className="space-y-3">
      {faqItems.map((item, i) => (
    	<div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-accent transition-colors"
      	>
            <span className="font-semibold">{item.question}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-primary transition-transform flex-shrink-0 ml-4 ${openIndex === i ? "rotate-180" : ""}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
        	>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
              {item.answer}
            </div>
      	)}
        </div>
  	))}
	</div>
  );
}


const serviciiItems = [
  {
	title: "Dezvoltare Aplicații Moderne",
	description: "Transformăm viziunile de business în soluții software de înaltă performanță. Dezvoltăm aplicații web și mobile native, perfect scalabile, cu arhitecturi moderne și interfețe intuitive.",
	features: ["Aplicații Web Enterprise", "Dezvoltare Mobile Nativă", "Platforme Software Custom", "UI/UX Design Avansat"],
	icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
  },
  {
	title: "Infrastructură IT Robustă",
	description: "Proiectăm și implementăm arhitecturi hardware și de rețea reziliente, capabile să susțină operațiuni critice 24/7.",
	features: ["Arhitectură de rețea scalabilă", "Configurare Servere Enterprise", "Soluții On-Premise & Hibride", "Disaster Recovery Planning"],
	icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  },
  {
	title: "Securitate Cibernetică",
	description: "Implementăm ecosisteme de securitate impenetrabile pentru a vă proteja activele digitale prin audituri riguroase și monitorizare proactivă.",
	features: ["Audituri complexe de securitate", "Prevenirea atacurilor (IDS/IPS)", "Monitorizare și alertare 24/7", "Conformitate GDPR & NIS2"],
	icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
	title: "Ecosisteme Cloud & DevOps",
	description: "Accelerăm inovația prin migrarea și optimizarea infrastructurii în medii cloud de top (AWS, Azure, GCP).",
	features: ["Migrare și Arhitectură Cloud", "Containerizare (Docker, K8s)", "Pipelines CI/CD Automatizate", "Optimizarea costurilor cloud"],
	icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
  },
  {
	title: "Integrare Sisteme & API",
	description: "Creăm un mediu IT omogen prin interconectarea aplicațiilor și sistemelor enterprise cu arhitecturi bazate pe microservicii.",
	features: ["Dezvoltare API-uri REST/GraphQL", "Integrări ERP, CRM & Financiare", "Sincronizare bidirecțională de date", "Arhitecturi bazate pe Microservicii"],
	icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  },
  {
	title: "Automatizare & Eficiență Digitală",
	description: "Redefinim productivitatea prin digitalizarea și robotizarea proceselor de afaceri, eliminând sarcinile manuale redundante.",
	features: ["Robotizarea Proceselor (RPA)", "Automatizarea fluxurilor de lucru", "Analiza și optimizarea proceselor", "Dezvoltare scripturi interne"],
	icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
	title: "Consultanță pentru Evoluție IT",
	description: "Acționăm ca un partener strategic dedicat, oferind audituri tehnologice, planificare arhitecturală și strategii de transformare IT.",
	features: ["Strategie de transformare digitală", "Audituri tehnologice complexe", "Optimizarea proceselor de afaceri", "Guvernanță IT și planificare bugete"],
	icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  },
  {
	title: "Mentenanță & Stabilitate",
	description: "Asigurăm continuitatea afacerii printr-un management IT proactiv, cu suport dedicat și monitorizare permanentă.",
	features: ["Suport tehnic dedicat (Nivel 1-3)", "Monitorizare proactivă a sistemelor", "Mentenanță preventivă și SLA-uri", "Managementul actualizărilor IT"],
	icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/></svg>,
  },
];
 
function ServiciiContent() {
  return (
	<div className="grid gap-6 sm:grid-cols-2">
      {serviciiItems.map((item) => (
    	<div key={item.title} className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </div>
      	<ul className="space-y-1">
            {item.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {f}
              </li>
        	))}
          </ul>
        </div>
  	))}
	</div>
  );
}

const termeniSections = [
  {
	title: "1. Acceptarea Termenilor",
	content: "Prin accesarea și utilizarea platformei NexaTech Solutions, confirmați că ați citit, înțeles și acceptat toți termenii și condițiile prezentului acord. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați serviciile noastre.",
  },
  {
	title: "2. Serviciile Oferite",
	content: "NexaTech Solutions oferă servicii de dezvoltare software, consultanță IT, infrastructură cloud și securitate cibernetică. Ne rezervăm dreptul de a modifica, suspenda sau întrerupe orice serviciu în orice moment, cu notificare prealabilă de minimum 30 de zile.",
  },
  {
	title: "3. Proprietatea Intelectuală",
	content: "Toate materialele, codul sursă și conținutul livrat în cadrul proiectelor devin proprietatea clientului după achitarea integrală a serviciilor. NexaTech Solutions își rezervă dreptul de a utiliza proiectele finalizate ca referință în portofoliu, cu acordul prealabil al clientului.",
  },
  {
	title: "4. Confidențialitate și Protecția Datelor",
	content: "Ne angajăm să protejăm informațiile confidențiale ale clienților conform GDPR și legislației române în vigoare. Datele colectate sunt utilizate exclusiv pentru furnizarea serviciilor contractate și nu vor fi transmise terților fără consimțământul explicit al clientului.",
  },
  {
	title: "5. Limitarea Răspunderii",
	content: "NexaTech Solutions nu poate fi responsabilă pentru daune indirecte, incidentale sau consecvente rezultate din utilizarea serviciilor noastre. Răspunderea noastră totală nu va depăși valoarea contractului încheiat cu clientul respectiv.",
  },
  {
	title: "6. Garanție și Suport",
	content: "Oferim garanție de 6 luni pentru bug-uri identificate după lansarea proiectului, cu condiția că acestea nu sunt cauzate de modificări efectuate de client. Suportul tehnic este disponibil conform SLA-urilor agreate în contractul de servicii.",
  },
  {
	title: "7. Plăți și Facturare",
	content: "Plățile se efectuează conform graficului stabilit în contract. Întârzierile la plată pot duce la suspendarea serviciilor, cu notificare prealabilă de 7 zile. Toate prețurile sunt exprimate în EUR și nu includ TVA.",
  },
  {
	title: "8. Modificarea Termenilor",
	content: "NexaTech Solutions își rezervă dreptul de a actualiza acești termeni în orice moment. Clienții vor fi notificați prin email cu minimum 14 zile înainte de intrarea în vigoare a modificărilor. Continuarea utilizării serviciilor după această dată constituie acceptarea noilor termeni.",
  },
];
 
function TermeniContent() {
  return (
	<div className="space-y-4">
  	<p className="text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 italic">
    	Ultima actualizare: Mai 2026. Vă rugăm să citiți cu atenție acești termeni înainte de a utiliza serviciile NexaTech Solutions.
  	</p>
      {termeniSections.map((section) => (
    	<div key={section.title} className="rounded-xl border border-border bg-card p-6">
      	<h3 className="font-bold text-lg mb-2">{section.title}</h3>
      	<p className="text-muted-foreground leading-relaxed">{section.content}</p>
        </div>
  	))}
	</div>
  );
}


const tehnologiiItems = [
  {
	category: "Frontend",
	color: "bg-blue-500/10 text-blue-500",
	techs: [
  	{ name: "React", desc: "Librărie JavaScript pentru interfețe dinamice și reactive." },
  	{ name: "TypeScript", desc: "Superset JavaScript cu tipare statice pentru cod robust." },
  	{ name: "Tailwind CSS", desc: "Framework CSS utility-first pentru design rapid și consistent." },
  	{ name: "Next.js", desc: "Framework React cu SSR și SSG pentru aplicații performante." },
	],
  },
  {
	category: "Backend",
	color: "bg-green-500/10 text-green-500",
	techs: [
  	{ name: "Node.js", desc: "Runtime JavaScript pentru aplicații server-side scalabile." },
  	{ name: "Python", desc: "Limbaj versatil pentru API-uri, AI și automatizare." },
  	{ name: "Strapi", desc: "Headless CMS open-source pentru gestionarea conținutului." },
  	{ name: ".NET", desc: "Platformă Microsoft pentru aplicații enterprise robuste." },
	],
  },
  {
	category: "Cloud & DevOps",
	color: "bg-orange-500/10 text-orange-500",
	techs: [
  	{ name: "AWS", desc: "Amazon Web Services — lider mondial în servicii cloud." },
  	{ name: "Azure", desc: "Platforma cloud Microsoft pentru soluții enterprise." },
  	{ name: "Docker", desc: "Containerizare pentru deployment consistent și portabil." },
  	{ name: "Kubernetes", desc: "Orchestrare containere pentru scalabilitate automată." },
	],
  },
  {
	category: "Baze de Date",
	color: "bg-purple-500/10 text-purple-500",
	techs: [
  	{ name: "PostgreSQL", desc: "Bază de date relațională open-source de înaltă performanță." },
  	{ name: "MongoDB", desc: "Bază de date NoSQL pentru date flexibile și scalabile." },
  	{ name: "Redis", desc: "Stocare în memorie pentru caching și sesiuni rapide." },
  	{ name: "MySQL", desc: "Sistem de management al bazelor de date relaționale." },
	],
  },
];
 
function TehnologiiContent() {
  return (
	<div className="space-y-8">
      {tehnologiiItems.map((group) => (
    	<div key={group.category}>
      	<h2 className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${group.color}`}>
            {group.category}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {group.techs.map((tech) => (
              <div key={tech.name} className="rounded-xl border border-border bg-card p-4 flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${group.color.split(" ")[0]}`} />
                <div>
                  <h3 className="font-semibold">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{tech.desc}</p>
                </div>
              </div>
        	))}
          </div>
        </div>
  	))}
	</div>
  );
}


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
            const block = b as {
              __component?: string;
              body?: string;
              title?: string;
              file?: { url?: string; alternativeText?: string; formats?: { large?: { url: string } } };
              files?: { url?: string; alternativeText?: string; formats?: { large?: { url: string } } }[];
            };

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

            if (block.__component === "shared.media" && block.file) {
              const url = block.file.formats?.large?.url || block.file.url;
              return (
                <div key={i} className="overflow-hidden rounded-xl">
                  <img
                    src={url}
                    alt={block.file.alternativeText || ""}
                    className="w-full object-cover"
                  />
                </div>
              );
            }

            if (block.__component === "shared.slider" && Array.isArray(block.files)) {
              return (
                <div key={i} className="grid gap-4 sm:grid-cols-2">
                  {block.files.map((file, j) => (
                    <div key={j} className="overflow-hidden rounded-xl">
                      <img
                        src={file.formats?.large?.url || file.url}
                        alt={file.alternativeText || ""}
                        className="w-full object-cover aspect-video"
                      />
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>
      )}
    </article>
  );
}
