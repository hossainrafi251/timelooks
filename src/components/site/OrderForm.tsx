import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useProduct } from "@/hooks/useProduct";
import { DISTRICTS, OTHER_THANA, bn, isInsideDhaka, thanasFor } from "@/lib/locations";

const inputClass =
  "w-full rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export function OrderForm() {
  const { data: product } = useProduct();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("বগুড়া");
  const [thana, setThana] = useState("শাহজাহানপুর");
  const [customThana, setCustomThana] = useState("");
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const thanaOptions = useMemo(() => [...thanasFor(district), OTHER_THANA], [district]);
  const price = product?.price ?? 1490;
  const delivery = isInsideDhaka(district)
    ? (product?.delivery_inside ?? 80)
    : (product?.delivery_outside ?? 150);
  const subtotal = price * qty;
  const total = subtotal + delivery;

  function onDistrictChange(value: string) {
    setDistrict(value);
    const list = thanasFor(value);
    setThana(list[0] ?? OTHER_THANA);
    setCustomThana("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const finalThana = thana === OTHER_THANA ? customThana.trim() : thana;
    if (!name.trim() || !phone.trim() || !address.trim() || !finalThana) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }
    if (!/^01[3-9]\d{8}$/.test(phone.trim())) {
      toast.error("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("orders").insert({
      customer_name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      district,
      thana: finalThana,
      quantity: qty,
      unit_price: price,
      delivery_charge: delivery,
      total,
      note: note.trim() || null,
    });
    setLoading(false);
    if (error) {
      toast.error("অর্ডার পাঠাতে সমস্যা হয়েছে, আবার চেষ্টা করুন");
      return;
    }
    setDone(true);
    toast.success("অর্ডার সফলভাবে গৃহীত হয়েছে!");
  }

  if (done) {
    return (
      <section id="order" className="mx-auto max-w-2xl px-4 py-16">
        <div className="glass rounded-3xl p-10 text-center">
          <CheckCircle2 className="mx-auto size-14 text-primary" />
          <h2 className="mt-4 text-2xl font-bold">ধন্যবাদ! অর্ডার কনফার্ম হয়েছে</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            আমাদের প্রতিনিধি শীঘ্রই আপনার নম্বরে কল করবে। মোট বিল ৳{bn(total)} (ক্যাশ অন
            ডেলিভারি)।
          </p>
          <button
            onClick={() => setDone(false)}
            className="mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            আরেকটি অর্ডার করুন
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-center text-2xl font-bold md:text-3xl">অর্ডার করতে ফর্মটি পূরণ করুন</h2>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        পেমেন্ট: ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা দিন)
      </p>

      <form onSubmit={submit} className="mt-8 grid gap-6 md:grid-cols-5">
        <div className="glass space-y-4 rounded-2xl p-6 md:col-span-3">
          <div>
            <label className="mb-1.5 block text-sm">আপনার নাম *</label>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="নাম লিখুন"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm">মোবাইল নম্বর *</label>
            <input
              className={inputClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              inputMode="numeric"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm">জেলা *</label>
              <select
                className={inputClass}
                value={district}
                onChange={(e) => onDistrictChange(e.target.value)}
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d} className="bg-card">
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm">থানা / উপজেলা *</label>
              <select
                className={inputClass}
                value={thana}
                onChange={(e) => setThana(e.target.value)}
              >
                {thanaOptions.map((t) => (
                  <option key={t} value={t} className="bg-card">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {thana === OTHER_THANA && (
            <input
              className={inputClass}
              value={customThana}
              onChange={(e) => setCustomThana(e.target.value)}
              placeholder="থানার নাম লিখুন"
            />
          )}
          <div>
            <label className="mb-1.5 block text-sm">সম্পূর্ণ ঠিকানা *</label>
            <textarea
              className={`${inputClass} min-h-24`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="গ্রাম / রোড / বাসা নম্বর"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm">নোট (ঐচ্ছিক)</label>
            <input
              className={inputClass}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="বিশেষ নির্দেশনা"
            />
          </div>
        </div>

        <div className="glass h-fit space-y-4 rounded-2xl p-6 md:col-span-2">
          <h3 className="font-semibold">অর্ডার সামারি</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">পরিমাণ</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex size-8 items-center justify-center rounded-lg border border-border"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center font-semibold">{bn(qty)}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="flex size-8 items-center justify-center rounded-lg border border-border"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
          <div className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">পণ্যের দাম</span>
              <span>৳{bn(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                ডেলিভারি ({isInsideDhaka(district) ? "ঢাকার ভিতরে" : "ঢাকার বাইরে"})
              </span>
              <span>৳{bn(delivery)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
              <span>সর্বমোট</span>
              <span className="text-primary">৳{bn(total)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="amber-glow flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            অর্ডার কনফার্ম করুন
          </button>
          <p className="text-center text-xs text-muted-foreground">
            ক্যাশ অন ডেলিভারি • সারা দেশে ডেলিভারি
          </p>
        </div>
      </form>
    </section>
  );
}
