import { Star } from "lucide-react";
import { bn } from "@/lib/locations";

const REVIEWS = [
  {
    name: "রাকিব হাসান",
    place: "শাহজাহানপুর, বগুড়া",
    rating: 5,
    text: "ঘড়িটা ছবির চেয়েও সুন্দর। বিল্ড কোয়ালিটি দারুণ, ক্যাশ অন ডেলিভারিতে দ্রুত পেয়েছি।",
  },
  {
    name: "সাদিয়া আফরিন",
    place: "ঢাকা",
    rating: 5,
    text: "গিফট হিসেবে নিয়েছিলাম, প্যাকেজিং প্রিমিয়াম। সবাই প্রশংসা করেছে।",
  },
  {
    name: "মেহেদী হাসান",
    place: "বগুড়া সদর",
    rating: 4,
    text: "দামের তুলনায় কোয়ালিটি অসাধারণ। স্ট্র্যাপ খুব আরামদায়ক।",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">কাস্টমার রিভিউ</h2>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-primary text-primary" />
            ))}
          </span>
          <span>
            {bn("4.9")}/{bn(5)} • {bn(1240)}+ রিভিউ
          </span>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <article key={r.name} className="glass rounded-2xl p-6">
            <div className="flex gap-1">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
            <p className="mt-4 text-sm font-semibold">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.place}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
