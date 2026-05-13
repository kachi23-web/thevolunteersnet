// Brand tokens (will map to tailwind.config.ts extensions in the Next.js build)
// brand-blue:   #1565C0
// brand-orange: #F57C00
// brand-pink:   #E91E63
// brand-navy:   #0D1B3E

export default function ModernNonprofitHomepage() {
  const services = [
    {
      title: 'Volunteer Recruitment',
      description:
        'We connect organizations with reliable and passionate volunteers ready to make meaningful impact.',
      icon: '👥',
    },
    {
      title: 'Training & Development',
      description:
        'Structured onboarding and capacity-building programs for volunteers and nonprofits.',
      icon: '📚',
    },
    {
      title: 'Community Programs',
      description:
        'Supporting community-driven initiatives through strategic volunteer engagement.',
      icon: '🌍',
    },
  ]

  const stats = [
    { value: '100+', label: 'Volunteers Mobilized' },
    { value: '10+',  label: 'Programs Supported'  },
    { value: '10K+', label: 'Lives Impacted'       },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'NGO Program Director',
      quote:
        'The Volunteer Nations helped us recruit and manage volunteers professionally across multiple projects.',
    },
    {
      name: 'Amina Ibrahim',
      role: 'Community Leader',
      quote:
        'Their structured volunteer system transformed how we run our outreach programs.',
    },
  ]

  const blogs = [
    {
      title: 'The Power of Community Impact',
      category: 'Impact',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'How Volunteers Create Change',
      category: 'Community',
      image:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Building Sustainable Programs',
      category: 'Programs',
      image:
        'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1200&auto=format&fit=crop',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight text-[#1565C0]">
            The Volunteer Nations
          </h1>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {['Services', 'Impact', 'Stories', 'Blog'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-[#1565C0] transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Primary CTA — solid blue, no gradient */}
          <button className="rounded-full bg-[#1565C0] hover:bg-[#0D47A1] transition-colors duration-200 px-5 py-2.5 text-white text-sm font-semibold">
            Become a Volunteer
          </button>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">

          {/* Text column */}
          <div className="animate-[fadeInUp_0.6s_ease-out_forwards]">
            <span className="inline-flex items-center rounded-full border border-[#1565C0]/20 bg-[#1565C0]/5 px-4 py-1.5 text-sm font-medium text-[#1565C0] mb-8">
              Empowering Communities Worldwide
            </span>

            <h2 className="text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight text-slate-900">
              Connecting
              <span className="block text-[#1565C0]">Skilled Volunteers</span>
              To Real Impact
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-600 max-w-xl">
              We help nonprofits, NGOs, and community organizations recruit,
              train, and manage volunteers that create measurable impact.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              {/* Primary */}
              <button className="rounded-full bg-[#1565C0] hover:bg-[#0D47A1] transition-colors duration-200 px-7 py-3.5 text-white font-semibold">
                Become a Volunteer
              </button>
              {/* Secondary — outlined */}
              <button className="rounded-full border border-[#1565C0] text-[#1565C0] hover:bg-[#1565C0]/10 transition-colors duration-200 px-7 py-3.5 font-semibold">
                Partner With Us
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-10 mt-14 pt-10 border-t border-slate-100">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="text-3xl font-black text-[#1565C0]">{stat.value}</p>
                  <p className="text-slate-500 mt-1 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image column */}
          <div className="relative rounded-[32px] overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1400&auto=format&fit=crop"
              alt="Volunteers working together"
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Trusted ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
            Trusted By NGOs &amp; Community Organizations
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {['Hope Foundation', 'Community Aid', 'Impact Africa', 'Youth Rise'].map((item, idx) => (
              <div
                key={idx}
                className="h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-semibold text-slate-400 text-sm hover:border-[#1565C0]/30 hover:text-[#1565C0] transition-colors duration-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────── */}
      <section id="services" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[#1565C0] font-semibold uppercase tracking-[0.2em] text-xs">
              What We Do
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight">
              Building Sustainable Volunteer Ecosystems
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-8">
              Structured systems that help organizations recruit, train, and manage volunteers efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group rounded-[28px] p-8 border border-slate-200 bg-white hover:border-[#1565C0]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1565C0]/8 flex items-center justify-center text-2xl mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight">{service.title}</h3>
                <p className="mt-4 text-slate-600 leading-7 text-sm">{service.description}</p>
                <button className="mt-6 text-[#1565C0] text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact ─────────────────────────────────────────────────────── */}
      <section id="impact" className="py-28 bg-[#0D1B3E] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#F57C00] uppercase tracking-[0.2em] text-xs font-semibold">
              Our Impact
            </span>
            <h2 className="mt-5 text-4xl lg:text-5xl font-black leading-tight">
              Every Volunteer Creates A Ripple Effect
            </h2>
            <p className="mt-6 text-slate-300 text-lg leading-8 max-w-lg">
              Through strategic partnerships and structured volunteer systems, we help communities
              access the support they need to grow and thrive.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-[24px] border border-white/10 bg-white/5 p-8 hover:bg-white/8 transition-colors duration-200"
              >
                <p className="text-4xl font-black text-[#F57C00]">{stat.value}</p>
                <p className="mt-3 text-slate-300 text-sm leading-6">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────── */}
      <section id="stories" className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[#1565C0] uppercase tracking-[0.2em] text-xs font-semibold">
              Testimonials
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight">
              Stories From Our Community
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-16">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[28px] bg-white border border-slate-200 p-10 hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-lg leading-9 text-slate-700 italic">"{item.quote}"</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1565C0]/10 flex items-center justify-center text-[#1565C0] font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-slate-500 text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ───────────────────────────────────────────────────────── */}
      <section id="blog" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-[#1565C0] uppercase tracking-[0.2em] text-xs font-semibold">
                Latest Insights
              </span>
              <h2 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight max-w-xl">
                News, Stories &amp; Volunteer Insights
              </h2>
            </div>
            <button className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold hover:border-[#1565C0] hover:text-[#1565C0] transition-colors duration-200">
              View All Articles
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {blogs.map((blog, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-[28px] border border-slate-200 bg-white group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7">
                  <span className="inline-flex rounded-full bg-[#F57C00]/10 text-[#F57C00] px-3 py-1 text-xs font-semibold">
                    {blog.category}
                  </span>
                  <h3 className="mt-4 text-xl font-bold tracking-tight leading-snug">
                    {blog.title}
                  </h3>
                  <button className="mt-6 text-[#1565C0] text-sm font-semibold hover:translate-x-1 transition-transform duration-200">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Solid brand-blue — no gradient */}
          <div className="rounded-[32px] bg-[#1565C0] p-12 lg:p-20 text-white text-center">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Ready To Make A Difference?
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80 max-w-xl mx-auto">
              Whether you're an organization or an individual ready to serve, there's a place for
              you in our global community.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {/* White on blue */}
              <button className="rounded-full bg-white text-[#1565C0] hover:bg-slate-100 transition-colors duration-200 px-8 py-3.5 font-bold">
                Become a Volunteer
              </button>
              {/* Outlined white */}
              <button className="rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors duration-200 px-8 py-3.5 font-bold">
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
