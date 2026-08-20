import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { STATUS_BN, bn } from "@/lib/locations";

export type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  district: string;
  thana: string;
  quantity: number;
  unit_price: number;
  delivery_charge: number;
  total: number;
  note: string | null;
  status: string;
  created_at: string;
};

export const ordersKey = ["admin-orders"];

export function useOrders() {
  return useQuery({
    queryKey: ordersKey,
    queryFn: async (): Promise<Order[]> => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Order[];
    },
  });
}

const STATUSES = ["pending", "shipped", "delivered", "cancelled"];

function statusColor(status: string) {
  if (status === "delivered") return "text-success";
  if (status === "cancelled") return "text-destructive";
  if (status === "shipped") return "text-primary";
  return "text-muted-foreground";
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [filter, setFilter] = useState("all");
  const qc = useQueryClient();

  const rows = useMemo(
    () => (filter === "all" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter],
  );

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("স্ট্যাটাস আপডেট হয়েছে");
      qc.invalidateQueries({ queryKey: ordersKey });
    },
    onError: () => toast.error("আপডেট ব্যর্থ হয়েছে"),
  });

  function exportCsv() {
    const head = [
      "Date",
      "Name",
      "Phone",
      "District",
      "Thana",
      "Address",
      "Qty",
      "Delivery",
      "Total",
      "Status",
    ];
    const lines = rows.map((o) =>
      [
        new Date(o.created_at).toLocaleString(),
        o.customer_name,
        o.phone,
        o.district,
        o.thana,
        o.address.replace(/\s+/g, " "),
        o.quantity,
        o.delivery_charge,
        o.total,
        o.status,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
    const csv = "\uFEFF" + [head.join(","), ...lines].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `timelooks-orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-semibold">অর্ডার তালিকা ({bn(rows.length)})</h2>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-input bg-secondary/40 px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="all" className="bg-card">
              সব স্ট্যাটাস
            </option>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="bg-card">
                {STATUS_BN[s]}
              </option>
            ))}
          </select>
          <button
            onClick={exportCsv}
            className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm hover:bg-secondary"
          >
            <Download className="size-4" /> CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead className="text-xs uppercase text-muted-foreground">
            <tr className="border-b border-border">
              <th className="py-3 pr-3">তারিখ</th>
              <th className="py-3 pr-3">কাস্টমার</th>
              <th className="py-3 pr-3">ফোন</th>
              <th className="py-3 pr-3">ঠিকানা</th>
              <th className="py-3 pr-3">পরিমাণ</th>
              <th className="py-3 pr-3">মোট</th>
              <th className="py-3 pr-3">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr key={o.id} className="border-b border-border/50 align-top">
                <td className="py-3 pr-3 text-xs text-muted-foreground">
                  {new Date(o.created_at).toLocaleDateString("bn-BD")}
                </td>
                <td className="py-3 pr-3 font-medium">{o.customer_name}</td>
                <td className="py-3 pr-3">{o.phone}</td>
                <td className="max-w-[220px] py-3 pr-3 text-xs text-muted-foreground">
                  {o.thana}, {o.district} — {o.address}
                </td>
                <td className="py-3 pr-3">{bn(o.quantity)}</td>
                <td className="py-3 pr-3 font-semibold text-primary">৳{bn(o.total)}</td>
                <td className="py-3 pr-3">
                  <select
                    value={o.status}
                    disabled={update.isPending}
                    onChange={(e) => update.mutate({ id: o.id, status: e.target.value })}
                    className={`rounded-lg border border-input bg-secondary/40 px-2 py-1.5 text-xs outline-none ${statusColor(o.status)}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-card text-foreground">
                        {STATUS_BN[s]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-muted-foreground">
                  কোনো অর্ডার নেই
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {update.isPending && (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="size-3 animate-spin" /> আপডেট হচ্ছে…
        </p>
      )}
    </div>
  );
}
