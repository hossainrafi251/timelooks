import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 pb-24 pt-12 md:pb-12">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <p className="text-xl font-bold tracking-[0.25em]">TIMELOOKS</p>
        <p className="mt-1 text-xs tracking-[0.3em] text-primary">TIME. STYLE. YOU</p>
        <p className="mt-4 text-sm text-muted-foreground">
          ক্যাশ অন ডেলিভারি • সারা বাংলাদেশে ডেলিভারি • হটলাইন: ০১৭০০-০০০০০০
        </p>
        <Link to="/admin" className="mt-4 inline-block text-xs text-muted-foreground/60">
          অ্যাডমিন প্যানেল
        </Link>
      </div>
    </footer>
  );
}
