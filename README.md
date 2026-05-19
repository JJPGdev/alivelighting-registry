# AliveLighting Registry

**Registrul Exemplarelor** — aplicatie web pentru autentificarea produselor AliveLighting.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (zero UI libraries)
- Supabase (PostgreSQL)
- @google/model-viewer (3D viewer)
- Vercel (hosting)

## Deploy in 5 pasi

### 1. Cloneaza repo-ul
```bash
git clone https://github.com/JJPGdev/alivelighting-registry.git
cd alivelighting-registry
npm install
```

### 2. Configureaza Supabase
1. Mergi la [supabase.com](https://supabase.com) si creeaza un proiect nou
2. In SQL Editor, ruleaza continutul fisierului `supabase/schema.sql`
3. Copiaza **Project URL** si **anon public key** din Settings → API

### 3. Variabile de mediu
Creeaza fisierul `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Testeaza local
```bash
npm run dev
# Deschide http://localhost:3000
# Introdu AL-0023 pentru a testa
```

### 5. Deploy pe Vercel
1. Mergi la [vercel.com](https://vercel.com) → New Project → Import din GitHub
2. Adauga in Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Click Deploy — gata!

## Structura proiect
```
alivelighting-registry/
├── app/
│   ├── page.tsx              # Pagina search /registry
│   ├── layout.tsx            # Layout global cu fonturi
│   ├── globals.css           # Stiluri globale + variabile culori
│   └── registry/
│       └── [serial]/
│           └── page.tsx      # Pagina produs individual
├── components/
│   ├── ModelViewer.tsx       # Wrapper @google/model-viewer
│   └── PhotoGallery.tsx      # Galerie foto cu crossfade
├── lib/
│   └── supabase.ts           # Client Supabase + types
└── supabase/
    └── schema.sql            # Schema DB + date de test
```

## Paleta de culori
| Variabila | Hex | Utilizare |
|-----------|-----|-----------|
| `--color-bg` | `#0a0a0a` | Background principal |
| `--color-bg-alt` | `#111111` | Background sectiuni alternative |
| `--color-text` | `#f0ede8` | Text principal |
| `--color-gold` | `#c9a96e` | Accent auriu mat |
| `--color-text-muted` | `#9a9590` | Text secundar |