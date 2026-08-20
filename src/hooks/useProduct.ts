import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ProductSettings = {
  id: string;
  title: string;
  description: string;
  price: number;
  old_price: number | null;
  stock: number;
  delivery_inside: number;
  delivery_outside: number;
};

export const productQueryOptions = {
  queryKey: ["product-settings"],
  queryFn: async (): Promise<ProductSettings | null> => {
    const { data, error } = await supabase
      .from("product_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data as ProductSettings | null;
  },
};

export function useProduct() {
  return useQuery(productQueryOptions);
}
