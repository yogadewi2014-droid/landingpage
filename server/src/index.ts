import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prisma from './lib/prisma';                        // ← Prisma client
import { renderTemplate } from './services/template-engine/renderer'; // ← Template engine

// ─── Konfigurasi Awal ───────────────────────────────────
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ─────────────────────────────────────────
app.use(cors());
app.use(express.json());

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

// ─── ROUTE: Generate Landing Page (NYATA) ──────────────
app.post('/api/pages/generate', async (req: Request, res: Response) => {
  try {
    const {
      userId = 'guest',
      template = 'office',
      title,
      headline,
      subheadline,
      cta,
      features,
      image,
    } = req.body;

    // Validasi sederhana
    if (!title && !headline) {
      return res.status(400).json({ error: 'Judul atau headline wajib diisi' });
    }

    // Buat slug dari judul
    const baseSlug = (title || headline)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const slug = `${baseSlug}-${Date.now()}`;

    // Data halaman
    const pageData = {
      headline: headline || title,
      subheadline: subheadline || 'Solusi terbaik untuk Anda',
      cta: cta || 'Hubungi Sekarang',
      features: features || ['Mudah', 'Cepat', 'Profesional'],
      image: image || 'https://via.placeholder.com/400x300',
      watermark: true, // nanti diatur berdasarkan paket user
    };

    // Simpan ke database
    const page = await prisma.page.create({
      data: {
        userId,
        template,
        slug,
        data: pageData,
        published: true,
      },
    });

    // Render HTML menggunakan template engine
    const html = renderTemplate(template, pageData);

    // Respons sukses
    res.status(201).json({
      success: true,
      pageId: page.id,
      slug: slug,
      url: `${process.env.FRONTEND_URL || 'https://cblzai.com'}/p/${slug}`,
      previewHtml: html.substring(0, 200) + '...',
    });
  } catch (error) {
    console.error('Generate error:', error);
    res.status(500).json({ error: 'Gagal membuat landing page' });
  }
});

// ─── ROUTE: Login / Auth Placeholder ───────────────────
app.post('/api/auth/login', async (req: Request, res: Response) => {
  res.json({ message: 'Login endpoint (belum diimplementasikan)' });
});

// ─── Middleware Error Global ────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Terjadi kesalahan pada server' });
});
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

// ─── Jalankan Server ────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
  console.log(`🌐 Akses: http://localhost:${PORT}/`);
});
