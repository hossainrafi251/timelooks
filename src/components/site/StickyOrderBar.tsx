import { bn } from "@/lib/locations";
import { useProduct } from "@/hooks/useProduct";

export function StickyOrderBar() {
  const { data: product } = useProduct();
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-3 px-4 py-3 md:hidden">
      <div className="leading-tight">
        <p className="text-xs text-muted-foreground">আজকের মূল্য</p>
        <p className="text-lg font-bold text-primary">৳{bn(product?.price ?? 1490)}</p>
      </div>
      <a
        href="#order"
        className="flex-1 rounded-xl bg-primary py-3 text-center font-bold text-primary-foreground"
      >
        অর্ডার করুন
      </a>
    </div>
  );
}
