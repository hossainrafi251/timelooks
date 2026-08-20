export const BOGURA_THANAS = [
  "বগুড়া সদর",
  "শাহজাহানপুর",
  "শেরপুর",
  "শিবগঞ্জ",
  "ধুনট",
  "দুপচাঁচিয়া",
  "আদমদীঘি",
  "গাবতলী",
  "কাহালু",
  "নন্দীগ্রাম",
  "সারিয়াকান্দি",
  "সোনাতলা",
] as const;

export const DHAKA_THANAS = [
  "ধানমন্ডি",
  "গুলশান",
  "মিরপুর",
  "উত্তরা",
  "মোহাম্মদপুর",
  "বাড্ডা",
  "যাত্রাবাড়ী",
  "তেজগাঁও",
  "রামপুরা",
  "সাভার",
] as const;

export const DISTRICTS = [
  "বগুড়া",
  "ঢাকা",
  "গাজীপুর",
  "নারায়ণগঞ্জ",
  "চট্টগ্রাম",
  "রাজশাহী",
  "খুলনা",
  "সিলেট",
  "বরিশাল",
  "রংপুর",
  "ময়মনসিংহ",
  "কুমিল্লা",
  "দিনাজপুর",
  "পাবনা",
  "নওগাঁ",
  "জয়পুরহাট",
  "সিরাজগঞ্জ",
  "যশোর",
  "কুষ্টিয়া",
  "ফরিদপুর",
  "টাঙ্গাইল",
  "নোয়াখালী",
  "ফেনী",
  "কক্সবাজার",
] as const;

export const OTHER_THANA = "অন্যান্য (নিজে লিখুন)";

export function thanasFor(district: string): string[] {
  if (district === "বগুড়া") return [...BOGURA_THANAS];
  if (district === "ঢাকা") return [...DHAKA_THANAS];
  return [];
}

export function isInsideDhaka(district: string) {
  return district === "ঢাকা";
}

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function bn(value: number | string) {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

export const STATUS_BN: Record<string, string> = {
  pending: "পেন্ডিং",
  shipped: "শিপড",
  delivered: "ডেলিভারড",
  cancelled: "বাতিল",
};
