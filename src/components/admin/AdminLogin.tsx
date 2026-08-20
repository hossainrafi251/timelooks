import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const inputClass =
  "w-full rounded-xl border border-input bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary";

export function AdminLogin({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "setup">("login");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (mode === "setup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      if (signUpError) {
        setLoading(false);
        toast.error("অ্যাকাউন্ট তৈরি ব্যর্থ: " + signUpError.message);
        return;
      }
      await supabase.auth.signInWithPassword({ email, password });
      const { data: claimed } = await supabase.rpc("claim_admin");
      setLoading(false);
      if (!claimed) {
        toast.error("অ্যাডমিন অ্যাকাউন্ট আগেই তৈরি করা আছে");
        return;
      }
      toast.success("অ্যাডমিন অ্যাকাউন্ট তৈরি হয়েছে");
      onSignedIn();
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("লগইন ব্যর্থ: ইমেইল বা পাসওয়ার্ড ভুল");
      return;
    }
    onSignedIn();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-sm space-y-4 rounded-2xl p-8">
        <div className="text-center">
          <span className="amber-glow mx-auto flex size-11 items-center justify-center rounded-xl bg-primary">
            <Lock className="size-5 text-primary-foreground" />
          </span>
          <h1 className="mt-4 text-xl font-bold tracking-[0.2em]">TIMELOOKS</h1>
          <p className="text-xs text-muted-foreground">
            {mode === "login" ? "অ্যাডমিন প্যানেল লগইন" : "প্রথমবার অ্যাডমিন অ্যাকাউন্ট তৈরি"}
          </p>
        </div>
        <input
          className={inputClass}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ইমেইল"
        />
        <input
          className={inputClass}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="পাসওয়ার্ড"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-primary-foreground disabled:opacity-60"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {mode === "login" ? "লগইন" : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "setup" : "login")}
          className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "login"
            ? "প্রথমবার সেটআপ করছেন? অ্যাডমিন অ্যাকাউন্ট তৈরি করুন"
            : "ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন"}
        </button>
      </form>
    </div>
  );
}
