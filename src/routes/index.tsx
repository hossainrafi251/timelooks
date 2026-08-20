import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Reviews } from "@/components/site/Reviews";
import { OrderForm } from "@/components/site/OrderForm";
import { Footer } from "@/components/site/Footer";
import { StickyOrderBar } from "@/components/site/StickyOrderBar";

const title = "TIMELOOKS — প্রিমিয়াম লাক্সারি হাতঘড়ি | TIME. STYLE. YOU";
const description =
  "TIMELOOKS লাক্সারি হাতঘড়ি — ওয়াটারপ্রুফ, প্রিমিয়াম স্ট্র্যাপ ও ১ বছরের ওয়ারেন্টি। ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশে।";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Reviews />
        <OrderForm />
      </main>
      <Footer />
      <StickyOrderBar />
    </div>
  );
}
