-- AliveLighting Registry — Supabase Schema
-- Ruleaza in SQL Editor la supabase.com

CREATE TABLE IF NOT EXISTS products (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number      text UNIQUE NOT NULL,
  created_at         date NOT NULL DEFAULT CURRENT_DATE,
  artisan_name       text NOT NULL,
  artisan_photo_url  text,
  model_3d_url       text,
  flowers_type       text,
  moss_origin        text,
  materials          text,
  warranty_months    integer NOT NULL DEFAULT 24,
  warranty_expires_at date,
  production_notes   text,
  product_photos     text,
  edition_total      integer,
  edition_number     integer
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
  ON products FOR SELECT USING (true);

-- Date de test
INSERT INTO products (serial_number,created_at,artisan_name,artisan_photo_url,
  model_3d_url,flowers_type,moss_origin,materials,warranty_months,
  warranty_expires_at,production_notes,product_photos,edition_total,edition_number)
VALUES
(
  'AL-0001','2026-01-15','Elena Marin',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  '','Gypsophila uscata, Eucalipt conservat, Lavanda uscata','Muntii Apuseni, Romania',
  'Bambus natural SIGVARD,Muschi conservat Scandinavian,Gypsophila uscata,Eucalipt conservat,Lavanda uscata,Sarma de cupru patinata,Vopsea mata negru mat',
  24,'2028-01-15',
  'Am creat acest exemplar intr-o dimineata de ianuarie, cand lumina venea oblic prin atelier si muschiul abia sosise din Muntii Apuseni. Fiecare fir de gypsophila a fost pozitionat manual, cu rabdare. Sper ca lumina lui va incalzi spatiul tau.',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80,https://images.unsplash.com/photo-1513506003901-1e6a35f0c5e1?w=800&q=80',
  50,1
),(
  'AL-0023','2026-03-08','Andrei Stoica',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  '','Bumbac salbatic conservat, Muschi de padure, Ramuri de salcie','Bucovina, Romania',
  'Bambus natural SIGVARD,Muschi de padure conservat,Bumbac salbatic conservat,Ramuri de salcie patinate,Rasina naturala transparenta,Vopsea mata negru mat',
  24,'2028-03-08',
  'Exemplarul 23 poarta in el linistea unui martie cu ploaie maruntica. Muschiul din Bucovina a ajuns in atelier cu pamant roscat pe radacini — l-am curatat fir cu fir. Exista in acest obiect ore intregi de tacere si concentrare pe care sper le simti cand il privesti aprins.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80,https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=80',
  50,23
),(
  'AL-0050','2026-05-01','Elena Marin',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  '','Feriga conservata, Gypsophila, Muschi de stanca','Retezat, Romania',
  'Bambus natural SIGVARD,Muschi de stanca conservat,Feriga conservata,Gypsophila uscata,Fir de alama oxidat,Vopsea mata negru mat',
  24,'2028-05-01',
  'Ultimul exemplar al primei serii. L-am finalizat cu emotie si cu o oarecare tristete — cum se termina orice lucru frumos. Feriga din Retezat a fost culeasa in ultima zi de octombrie, cand culorile erau la apogeu.',
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80,https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80',
  50,50
);