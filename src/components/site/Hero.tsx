import { ShieldCheck, Truck, Star } from "lucide-react";
import watchHero from "@/assets/watch-hero.png";
import { Typewriter } from "@/components/Typewriter";
import { bn } from "@/lib/locations";
import { useProduct } from "@/hooks/useProduct";

export function Hero() {
  const { data: product } = useProduct();

  return (
    <section className="grid-noise relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-primary">
            <Star className="size-3 fill-primary" /> বাংলাদেশের #১ লাক্সারি ওয়াচ ব্র্যান্ড
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">
            {product?.title ?? "TIMELOOKS ক্লাসিক ক্রোনো"}
          </h1>
          <p className="mt-4 min-h-[2.5rem] text-lg font-semibold md:text-2xl">
            <Typewriter
              className="amber-text"
              words={[
                "সময়ের সাথে স্টাইল",
                "আপনার ব্যক্তিত্বের প্রতিচ্ছবি",
                "প্রিমিয়াম লাক্সারি ওয়াচ",
              ]}
            />
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {product?.description ??
              "প্রিমিয়াম কোয়ালিটির লাক্সারি হাতঘড়ি — সীমিত স্টক।"}
          </p>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-bold text-primary">
              ৳{bn(product?.price ?? 1490)}
            </span>
            {product?.old_price ? (
              <span className="pb-1 text-lg text-muted-foreground line-through">
                ৳{bn(product.old_price)}
              </span>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#order"
              className="amber-glow rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              এখনই অর্ডার করুন
            </a>
            <a
              href="#features"
              className="rounded-full border border-border px-7 py-3 font-semibold transition-colors hover:bg-secondary"
            >
              বিস্তারিত দেখুন
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Truck className="size-4 text-primary" /> ক্যাশ অন ডেলিভারি
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" /> ১ বছরের ওয়ারেন্টি
            </span>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="amber-glow absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
          <img
            src={watchHero}
            alt="TIMELOOKS প্রিমিয়াম লাক্সারি হাতঘড়ি"
            width={1024}
            height={1024}
            className="animate-float relative w-72 drop-shadow-2xl md:w-[26rem]"
          />
        </div>
      </div>
    </section>
  );
}
