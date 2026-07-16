interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="hero-gradient relative overflow-hidden py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob blob-1 absolute -left-20 -top-20 h-72 w-72 rounded-full bg-pink-400/30 blur-3xl" />
        <div className="blob blob-2 absolute -right-16 top-10 h-64 w-64 rounded-full bg-purple-400/30 blur-3xl" />
        <div className="blob blob-3 absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-sky-400/25 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="animate-fade-in mb-3 text-3xl font-bold sm:text-4xl">
          {title}
        </h1>
        <p className="animate-fade-in max-w-2xl text-white/85" style={{ animationDelay: "150ms" }}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
