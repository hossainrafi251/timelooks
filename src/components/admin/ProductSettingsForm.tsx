import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useProduct, type ProductSettings } from "@/hooks/useProduct";

const inputClass =
  "w-full rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary";

export function ProductSettingsForm() {
  const { data } = useProduct();
  const qc = useQueryClient();
  const [form, setForm] = useState<ProductSettings | null>(null);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async (values: ProductSettings) => {
      const { error } = await supabase
        .from("product_settings")
        .update({
          title: values.title,
          description: values.description,
          price: values.price,
          old_price: values.old_price,
          stock: values.stock,
          delivery_inside: values.delivery_inside,
          delivery_outside: values.delivery_outside,
        })
        .eq("id", values.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("সেটিংস সেভ হয়েছে");
      qc.invalidateQueries({ queryKey: ["product-settings"] });
    },
    onError: () => toast.error("সেভ করা যায়নি"),
  });

  if (!form) return <p className="text-sm text-muted-foreground">লোড হচ্ছে…</p>;

  const num = (key: keyof ProductSettings) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: Number(e.target.value) || 0 });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate(form);
      }}
      className="glass grid gap-4 rounded-2xl p-6 md:grid-cols-2"
    >
      <div className="md:col-span-2">
        <label className="mb-1.5 block text-sm">পণ্যের নাম</label>
        <input
          className={inputClass}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div className="md:col-span-2">
        <label className="mb-1.5 block text-sm">বাংলা বর্ণনা</label>
        <textarea
          className={`${inputClass} min-h-24`}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm">মূল্য (৳)</label>
        <input type="number" className={inputClass} value={form.price} onChange={num("price")} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm">আগের মূল্য (৳)</label>
        <input
          type="number"
          className={inputClass}
          value={form.old_price ?? 0}
          onChange={num("old_price")}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm">ঢাকার ভিতরে ডেলিভারি (৳)</label>
        <input
          type="number"
          className={inputClass}
          value={form.delivery_inside}
          onChange={num("delivery_inside")}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm">ঢাকার বাইরে ডেলিভারি (৳)</label>
        <input
          type="number"
          className={inputClass}
          value={form.delivery_outside}
          onChange={num("delivery_outside")}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm">স্টক</label>
        <input type="number" className={inputClass} value={form.stock} onChange={num("stock")} />
      </div>
      <div className="flex items-end md:col-span-2">
        <button
          type="submit"
          disabled={save.isPending}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-60"
        >
          {save.isPending && <Loader2 className="size-4 animate-spin" />} সেভ করুন
        </button>
      </div>
    </form>
  );
}
