import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
        <p className="mt-4 text-muted-foreground">
          Get in touch with our team
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-semibold mb-4">Our Team</h2>
          <ul className="space-y-4 text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Toma Vlad</span>
              <p>vlad.toma@gmail.com</p>
            </li>
            <li>
              <span className="font-medium text-foreground">Ungureanu Cristian</span>
              <p>cristian.ungureanu@gmail.com</p>
            </li>
            <li>
              <span className="font-medium text-foreground">Cinade Mihai</span>
              <p>mihai.cinade@gmail.com</p>
            </li>
            <li>
              <span className="font-medium text-foreground">Botea Robert</span>
              <p>robert.botea@gmail.com</p>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows={4}
                placeholder="Your message..."
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
