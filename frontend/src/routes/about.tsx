import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Despre Noi — NexaTech Solutions" },
      { name: "description", content: "Echipa NexaTech Solutions." },
    ],
  }),
  component: AboutPage,
});

const teamMembers = [
  {
    name: "Mihai Cinade",
    role: "Creative Director & Full-Stack Developer",
    image: "https://creative-bubble-5b1ffcc4aa.media.strapiapp.com/mihai_295f2f749e.jpg",
    bio: "Mihai coordonează direcția vizuală și tehnică a proiectelor noastre, asigurând o punte solidă între designul de interfață și arhitectura software.",
  },
  {
    name: "Vlad Toma",
    role: "Backend Architect & Database Manager",
    image: "https://creative-bubble-5b1ffcc4aa.media.strapiapp.com/vlad_a93ca19288.png",
    bio: "Vlad este responsabil pentru proiectarea și gestionarea infrastructurii de date, asigurând o structură robustă, securizată și scalabilă.",
  },
  {
    name: "Cristian Ungureanu",
    role: "Project Manager & UX Strategist",
    image: "https://creative-bubble-5b1ffcc4aa.media.strapiapp.com/cristian_7e94b19bc0.jpg",
    bio: "Cristian gestionează fluxul operațional al proiectelor, sincronizând obiectivele strategice cu nevoile utilizatorilor.",
  },
  {
    name: "Robert Botea",
    role: "Lead Developer & Performance Specialist",
    image: "https://creative-bubble-5b1ffcc4aa.media.strapiapp.com/robert_e3654baff0.jpg",
    bio: "Robert conduce procesul de implementare tehnică, punând accent pe optimizarea resurselor și viteza de încărcare.",
  },
];

const values = [
  {
    title: "Scalabilitate",
    description: "Nu construim doar pentru prezent, ci proiectăm soluții capabile să crească odată cu afacerea ta.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Agilitate Tehnică",
    description: "Implementăm rapid tehnologii emergente pentru a menține partenerii noștri cu un pas înaintea competiției.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Orientare spre Performanță",
    description: "Optimizăm fiecare parametru pentru viteză, stabilitate și securitate.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Transparență Radicală",
    description: "Oferim clienților vizibilitate totală asupra etapelor de dezvoltare și a deciziilor tehnice luate.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-20">

      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Despre Noi</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Echipa NexaTech Solutions – pasiune pentru tehnologie, dedicare pentru rezultate.
        </p>
      </div>

      {/* Povestea noastră */}
      <section className="grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Povestea Noastră</h2>
          <p className="text-muted-foreground leading-relaxed">
            Povestea noastră a început în anul 2010, dintr-o viziune clară: aceea de a transforma complexitatea tehnologică în simplitate funcțională pentru afacerile care privesc spre viitor.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            De peste un deceniu, ne-am construit reputația pe trei piloni fundamentali: expertiză, promptitudine și integritate.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Astăzi, privim înapoi la sutele de proiecte finalizate cu succes ca la o confirmare a misiunii noastre: să fim motorul tehnologic care propulsează viziunile clienților noștri.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
            alt="Echipa NexaTech"
            className="w-full object-cover aspect-video"
          />
        </div>
      </section>

      {/* Valorile noastre */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Valorile Noastre</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-border bg-card p-6 space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                {value.icon}
              </div>
              <h3 className="font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Echipa */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Echipa Noastră</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="rounded-2xl border border-border bg-card overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full aspect-square object-cover max-h-48"
              />
              <div className="p-4 space-y-1">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-xs text-primary">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed pt-2">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}