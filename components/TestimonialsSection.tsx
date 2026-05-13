import { testimonials } from '@/lib/data';

export default function TestimonialsSection() {
  return (
    <section id="stories" className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[#1565C0] uppercase tracking-[0.2em] text-xs font-semibold">
            Testimonials
          </span>
          <h2 className="mt-4 text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Stories From Our Community
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-16">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[28px] bg-white border border-slate-200 p-10 hover:shadow-md transition-shadow duration-300"
            >
              <p className="text-lg leading-9 text-slate-700 italic">"{item.quote}"</p>
              <div className="mt-8 flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="w-12 h-12 rounded-full bg-[#1565C0]/10 flex items-center justify-center text-[#1565C0] font-bold text-sm"
                >
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="text-slate-500 text-sm">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
