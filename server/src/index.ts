import prisma from './lib/prisma';
import { renderTemplate } from './services/template-engine/renderer';

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

    if (!title && !headline) {
      return res.status(400).json({ error: 'Judul atau headline wajib diisi' });
    }

    const slug = (title || headline)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') + '-' + Date.now();

    // Data yang akan dimasukkan ke template
    const pageData = {
      headline: headline || title,
      subheadline: subheadline || 'Solusi terbaik untuk Anda',
      cta: cta || 'Hubungi Sekarang',
      features: features || ['Mudah', 'Cepat', 'Profesional'],
      image: image || 'https://via.placeholder.com/400x300',
      watermark: true, // nanti diubah berdasarkan paket user
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

    // Render HTML (opsional, bisa disimpan ke Supabase Storage nanti)
    const html = renderTemplate(template, pageData);

    // Untuk saat ini, kita hanya kirim link preview (nanti frontend akan render dengan fetch HTML terpisah)
    res.status(201).json({
      success: true,
      pageId: page.id,
      slug: slug,
      url: `${process.env.FRONTEND_URL || 'https://cblzai.com'}/p/${slug}`,
      previewHtml: html.substring(0, 200) + '...', // hanya potongan untuk preview
    });
  } catch (error) {
    console.error('Generate error:', error);
    res.status(500).json({ error: 'Gagal membuat landing page' });
  }
});
