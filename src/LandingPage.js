import { Navbar } from './components/Navbar';

const LandingPage = () => (
  <div className="min-h-screen bg-[#fdf7ee] text-slate-900">
    <Navbar />
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-20 top-[-120px] h-72 w-72 rounded-full bg-amber-200/70 blur-3xl" />
      <div className="pointer-events-none absolute right-[-140px] top-24 h-80 w-80 rounded-full bg-sky-200/70 blur-3xl float-slow" />
      <div className="pointer-events-none absolute left-1/2 top-[420px] h-96 w-96 -translate-x-1/2 rounded-full bg-rose-200/60 blur-3xl" />

      <header className="relative z-10 pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="fade-up fade-up-1">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-600">
              Portfolio Studio
            </p>
            <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
              Designing bold digital stories for people-first brands.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-700">
              I craft expressive landing pages, product visuals, and brand
              systems that feel human. Based in Hanoi, available worldwide.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-slate-900 px-6 py-3 text-xs uppercase tracking-[0.3em] text-amber-50">
                View Projects
              </button>
              <button className="rounded-full border border-slate-900/20 bg-white/80 px-6 py-3 text-xs uppercase tracking-[0.3em] text-slate-900 backdrop-blur">
                Download Resume
              </button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 text-sm text-slate-600">
              <div>
                <p className="text-2xl font-semibold text-slate-900">6+</p>
                <p>Years crafting design</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">38</p>
                <p>Projects shipped</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">12</p>
                <p>Brand refreshes</p>
              </div>
            </div>
          </div>

          <div className="fade-up fade-up-2">
            <div className="rounded-3xl bg-white/80 p-8 shadow-xl shadow-amber-200/40 ring-1 ring-black/5 backdrop-blur">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                <span>Currently</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] text-emerald-700">
                  Available
                </span>
              </div>
              <h2 className="mt-6 font-display text-2xl">
                Building immersive portfolio stories
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Blending editorial layouts with modern web motion to highlight
                the craft behind each project.
              </p>
              <div className="mt-6 space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-500" />
                  <div>
                    <p className="font-semibold text-slate-900">Focus</p>
                    <p>Landing pages, product storytelling, identity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-sky-500" />
                  <div>
                    <p className="font-semibold text-slate-900">Stack</p>
                    <p>React, Tailwind, Figma, Motion Design</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-rose-400" />
                  <div>
                    <p className="font-semibold text-slate-900">Next Slot</p>
                    <p>March 2026 for new collaborations</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-xs uppercase tracking-[0.28em] text-slate-500">
                Trusted by indie founders + creative teams
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>

    <main className="relative z-10">
      <section id="services" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-end justify-between gap-6 pb-8">
          <div className="fade-up fade-up-2">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              What I Do
            </p>
            <h2 className="mt-3 font-display text-3xl">
              Design services crafted with clarity and care.
            </h2>
          </div>
          <p className="hidden max-w-sm text-sm text-slate-600 md:block">
            I partner with thoughtful teams to bring strategy, identity, and
            interface into one cohesive story.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Brand + Web',
              copy: 'Brand narratives, art direction, and high-conversion landing pages.',
              delay: 'fade-up-1',
            },
            {
              title: 'Product Design',
              copy: 'Feature storytelling, UX flows, and visual systems for startups.',
              delay: 'fade-up-2',
            },
            {
              title: 'Visual Systems',
              copy: 'Design kits, templates, and launch assets that scale with your team.',
              delay: 'fade-up-3',
            },
          ].map((item) => (
            <div
              key={item.title}
              className={`fade-up ${item.delay} rounded-3xl bg-white/80 p-6 ring-1 ring-black/5 backdrop-blur`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {item.title}
              </p>
              <p className="mt-4 text-lg font-semibold text-slate-900">
                {item.copy}
              </p>
              <button className="mt-6 text-xs uppercase tracking-[0.28em] text-slate-500">
                Explore
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="fade-up fade-up-2 pb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
            Selected Work
          </p>
          <h2 className="mt-3 font-display text-3xl">
            Recent collaborations and case studies.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="fade-up fade-up-3 rounded-3xl bg-gradient-to-br from-amber-100 via-white to-rose-100 p-8 ring-1 ring-black/5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Echo Studios
            </p>
            <h3 className="mt-4 font-display text-2xl">
              A cinematic launch for a creative agency
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              Full brand refresh, web experience, and editorial motion system.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.25em] text-slate-500">
              <span className="rounded-full border border-slate-900/10 px-3 py-1">
                Identity
              </span>
              <span className="rounded-full border border-slate-900/10 px-3 py-1">
                Web
              </span>
              <span className="rounded-full border border-slate-900/10 px-3 py-1">
                Motion
              </span>
            </div>
          </div>
          <div className="fade-up fade-up-3 flex flex-col gap-6">
            <div className="rounded-3xl bg-white/80 p-6 ring-1 ring-black/5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Mira Health
              </p>
              <h3 className="mt-3 font-display text-xl">
                Warm, accessible product storytelling
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Reimagined their product pages with empathetic visuals and
                simplified flows.
              </p>
            </div>
            <div className="rounded-3xl bg-white/80 p-6 ring-1 ring-black/5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                Atlas Commerce
              </p>
              <h3 className="mt-3 font-display text-xl">
                Built a launch kit for a global rollout
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                Designed a scalable system of templates, demos, and sales
                visuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="fade-up fade-up-2 rounded-3xl bg-slate-900 px-8 py-12 text-amber-50 md:px-12 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-200">
                Let&apos;s Collaborate
              </p>
              <h2 className="mt-4 font-display text-3xl text-amber-50">
                Ready to give your next launch a human touch?
              </h2>
              <p className="mt-4 text-sm text-amber-100/80">
                Share your goals, timeline, and inspiration. I will respond
                within 48 hours with a tailored plan.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-amber-200 px-6 py-3 text-xs uppercase tracking-[0.3em] text-slate-900">
                Book a Call
              </button>
              <button className="rounded-full border border-amber-200/60 px-6 py-3 text-xs uppercase tracking-[0.3em] text-amber-100">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="border-t border-slate-200/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>Based in Hanoi - Available worldwide</p>
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.3em]">
          <span>Instagram</span>
          <span>Behance</span>
          <span>LinkedIn</span>
        </div>
      </div>
    </footer>
  </div>
);

export default LandingPage;
