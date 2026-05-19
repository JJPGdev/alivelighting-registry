import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  serial_number: string;
  created_at: string;
  artisan_name: string;
  artisan_photo_url: string | null;
  model_3d_url: string | null;
  flowers_type: string | null;
  moss_origin: string | null;
  materials: string | null;
  warranty_months: number;
  warranty_expires_at: string | null;
  production_notes: string | null;
  product_photos: string | null;
  edition_total: number | null;
  edition_number: number | null;
}

export async function getProductBySerial(
  serial: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("serial_number", serial.toUpperCase())
    .single();

  if (error || !data) return null;
  return data as Product;
}