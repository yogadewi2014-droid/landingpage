import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// ─── Konfigurasi Awal ───────────────────────────────────
dotenv.config(); // baca file .env

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ─────────────────────────────────────────
app.use(cors()); // izinkan permintaan dari domain lain (Frontend Netlify)
app.use(express.json()); // biar bisa baca JSON dari body request

// (Opsional) Logging setiap permintaan ke console
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// ─── ROUTE: Cek Kesehatan Server ───────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'CBLZ Landing Page Builder API 🚀',
    version: '0.1.0',
    status: 'online',
  });
});

app.get('/api/hello', (_req: Request, res: Response) => {
  res.json({ hello: 'world' });
});

// ─── ROUTE: Generate Landing Page (dummy dulu) ─────────
// Nanti akan dihubungkan ke template-engine & AI
app.post('/api/pages/generate', async (req: Request, res: Response) => {
  try {
    const { userId, template, title, headline } = req.body;

    // Buat slug sederhana dari judul
    const baseSlug = title
      ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : 'landing';
    const slug = `${baseSlug}-${Date.now()}`;

    // Data landing page (masih dummy)
    const pageData = {
      headline: headline || title || 'Judul Landing Page',
      subheadline: 'Dibuat otomatis oleh CBLZ',
      cta: 'Hubungi Sekarang',
      benefits: ['Mudah', 'Cepat', 'Profesional'],
      watermark: true, // nanti diatur berdasarkan paket
    };

    // Di sini nanti kita panggil Prisma untuk simpan ke database
    // const page = await prisma.page.create({ data: {...} });

    // Respons sukses sementara
    res.status(201).json({
      success: true,
      message: 'Landing page berhasil dibuat (dummy)',
      data: {
        slug: slug,
        url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/p/${slug}`,
        pageData: pageData,
      },
    });
  } catch (error) {
    console.error('Error generating page:', error);
    res.status(500).json({ error: 'Gagal membuat landing page' });
  }
});

// ─── ROUTE: Login / Auth Placeholder ───────────────────
// Nanti gunakan Supabase Auth di sini
app.post('/api/auth/login', async (req: Request, res: Response) => {
  // Placeholder: terima email, panggil Supabase Auth
  // const { email, password } = req.body;
  // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  res.json({ message: 'Login endpoint (belum diimplementasikan)' });
});

// ─── Middleware Error Global ────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});

// ─── Jalankan Server ────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
  console.log(`🌐 Coba akses: http://localhost:${PORT}/`);
});
