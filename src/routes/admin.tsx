import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { OrdersTable, useOrders } from "@/components/admin/OrdersTable";
import { StatsCards } from "@/components/admin/StatsCards";
import { ProductSettingsForm } from "@/components/admin/ProductSettingsForm";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "অ্যাডমিন প্যানেল — TIMELOOKS" },
      { name: "description", content: "TIMELOOKS অর্ডার ও প্রোডাক্ট ম্যানেজমেন্ট প্যানেল।" },
      { property: "og:title", content: "অ্যাডমিন প্যানেল — TIMELOOKS" },
      { property: "og:description", content: "TIMELOOKS অর্ডার ও প্রোডাক্ট ম্যানেজমেন্ট প্যানেল।" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type AuthState = "loading" | "signed-out" | "not-admin" | "admin";

function AdminPage() {
  const [state, setState] = useState<AuthState>("loading");

  async function check() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setState("signed-out");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();
    setState(roles ? "admin" : "not-admin");
  }

  useEffect(() => {
    void check();
  }, []);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (state === "signed-out") return <AdminLogin onSignedIn={() => void check()} />;

  if (state === "not-admin") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="glass max-w-sm rounded-2xl p-8 text-center">
          <h1 className="text-lg font-bold">প্রবেশাধিকার নেই</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            এই অ্যাকাউন্টটি অ্যাডমিন নয়। অ্যাডমিন অ্যাকাউন্ট দিয়ে লগইন করুন।
          </p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              setState("signed-out");
            }}
            className="mt-5 rounded-xl border border-border px-5 py-2.5 text-sm hover:bg-secondary"
          >
            লগআউট
          </button>
        </div>
      </div>
    );
  }

  return <Dashboard onSignOut={() => setState("signed-out")} />;
}

function Dashboard({ onSignOut }: { onSignOut: () => void }) {
  const { data: orders, isLoading } = useOrders();
  const [tab, setTab] = useState<"orders" | "settings">("orders");

  return (
    <div className="min-h-screen bg-background">
      <header className="glass sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div>
            <p className="text-base font-bold tracking-[0.2em]">TIMELOOKS</p>
            <p className="text-[10px] tracking-[0.2em] text-muted-foreground">অ্যাডমিন প্যানেল</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              সাইট দেখুন
            </Link>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                onSignOut();
              }}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 hover:bg-secondary"
            >
              <LogOut className="size-4" /> লগআউট
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <StatsCards orders={orders ?? []} />

        <div className="flex gap-2">
          {(
            [
              ["orders", "অর্ডার ম্যানেজমেন্ট"],
              ["settings", "প্রোডাক্ট ও প্রাইস সেটিংস"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                tab === key
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "orders" ? (
          isLoading ? (
            <p className="text-sm text-muted-foreground">লোড হচ্ছে…</p>
          ) : (
            <OrdersTable orders={orders ?? []} />
          )
        ) : (
          <ProductSettingsForm />
        )}
      </main>
    </div>
  );
}
