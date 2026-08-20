import { Link } from "@tanstack/react-router";
import { Watch } from "lucide-react";

export function Header() {
  return (
    <header className="glass sticky top-0 z-40 w-full">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="amber-glow flex size-9 items-center justify-center rounded-xl bg-primary">
            <Watch className="size-5 text-primary-foreground" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-[0.2em]">TIMELOOKS</span>
            <span className="text-[10px] tracking-[0.25em] text-muted-foreground">
              TIME. STYLE. YOU
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <a href="#features" className="hidden transition-colors hover:text-foreground sm:block">
            ফিচার
          </a>
          <a href="#reviews" className="hidden transition-colors hover:text-foreground sm:block">
            রিভিউ
          </a>
          <a
            href="#order"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            অর্ডার করুন
          </a>
        </nav>
      </div>
    </header>
  );
}
