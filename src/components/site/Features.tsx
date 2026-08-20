import { Droplets, Gem, ShieldCheck, Sparkles, Package, Clock } from "lucide-react";

const FEATURES = [
  { icon: Droplets, title: "ওয়াটারপ্রুফ", desc: "৩ ATM ওয়াটার রেজিস্ট্যান্ট — বৃষ্টি বা হাত ধোয়ায় সমস্যা নেই।" },
  { icon: Gem, title: "প্রিমিয়াম স্ট্র্যাপ", desc: "স্টেইনলেস স্টিল ও লেদার — আরামদায়ক এবং টেকসই।" },
  { icon: ShieldCheck, title: "১ বছরের ওয়ারেন্টি", desc: "মেশিনের উপর পূর্ণ ১ বছরের সার্ভিস ওয়ারেন্টি।" },
  { icon: Sparkles, title: "স্ক্র্যাচ প্রুফ গ্লাস", desc: "হার্ডেন্ড মিনারেল গ্লাস — সহজে দাগ পড়ে না।" },
  { icon: Package, title: "লাক্সারি গিফট বক্স", desc: "প্রিমিয়াম বক্সে ডেলিভারি — গিফটের জন্য পারফেক্ট।" },
  { icon: Clock, title: "জাপানি মুভমেন্ট", desc: "নির্ভুল কোয়ার্টজ মুভমেন্ট, দীর্ঘস্থায়ী ব্যাটারি।" },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-2xl font-bold md:text-3xl">
        কেন <span className="amber-text">TIMELOOKS</span>?
      </h2>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        প্রতিটি ঘড়ি কোয়ালিটি চেক করে পাঠানো হয়
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15">
              <f.icon className="size-5 text-primary" />
            </span>
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
