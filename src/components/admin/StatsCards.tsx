import { BadgeDollarSign, Clock, PackageCheck, ShoppingBag } from "lucide-react";
import { bn } from "@/lib/locations";
import type { Order } from "./OrdersTable";

export function StatsCards({ orders }: { orders: Order[] }) {
  const delivered = orders.filter((o) => o.status === "delivered");
  const pending = orders.filter((o) => o.status === "pending");
  const sales = delivered.reduce((sum, o) => sum + o.total, 0);

  const cards = [
    { icon: BadgeDollarSign, label: "মোট বিক্রয় (ডেলিভারড)", value: `৳${bn(sales)}` },
    { icon: ShoppingBag, label: "সর্বমোট অর্ডার", value: bn(orders.length) },
    { icon: Clock, label: "পেন্ডিং অর্ডার", value: bn(pending.length) },
    { icon: PackageCheck, label: "ডেলিভারড অর্ডার", value: bn(delivered.length) },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="glass rounded-2xl p-5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
            <c.icon className="size-5 text-primary" />
          </span>
          <p className="mt-3 text-2xl font-bold">{c.value}</p>
          <p className="text-xs text-muted-foreground">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
