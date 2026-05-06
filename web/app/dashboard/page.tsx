'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../../lib/api-client';

export default function Dashboard() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', template: 'office' });

  const loadPages = async () => {
    // untuk MVP, pakai userId 'guest', atau bisa diganti nanti
    try {
      const data = await fetchAPI('/api/pages?userId=guest');
      setPages(data.pages || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadPages(); }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await fetchAPI('/api/pages/generate', {
        method: 'POST',
        body: JSON.stringify({
          title: form.title,
          template: form.template,
          userId: 'guest',
        }),
      });
      alert(`Landing page berhasil dibuat! ${result.url}`);
      setForm({ title: '', template: 'office' });
      loadPages();
    } catch (err: any) {
      alert('Gagal: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 20 }}>
      <h1 style={{ color: '#1a365d' }}>Dashboard</h1>

      <div style={{ background: 'white', padding: 20, borderRadius: 8, marginBottom: 20 }}>
        <h2>Buat Landing Page Baru</h2>
        <input
          type="text"
          placeholder="Judul (contoh: Nasi Goreng Enak)"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={{ width: '100%', padding: 10, marginBottom: 10, fontSize: 16, border: '1px solid #ccc', borderRadius: 4 }}
        />
        <select
          value={form.template}
          onChange={(e) => setForm({ ...form, template: e.target.value })}
          style={{ width: '100%', padding: 10, marginBottom: 10, fontSize: 16, border: '1px solid #ccc', borderRadius: 4 }}
        >
          <option value="office">Office / Bisnis</option>
          {/* nanti tambahkan restaurant, product, dll */}
        </select>
        <button
          onClick={handleGenerate}
          disabled={loading || !form.title}
          style={{
            width: '100%',
            padding: 15,
            backgroundColor: '#25D366',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Membuat...' : 'Buat Landing Page'}
        </button>
      </div>

      <h2>Landing Page Saya</h2>
      {pages.length === 0 && <p>Belum ada landing page.</p>}
      {pages.map((page: any) => (
        <div key={page.id} style={{ background: 'white', padding: 15, marginBottom: 10, borderRadius: 8 }}>
          <strong>{page.data?.headline || page.slug}</strong><br/>
          <a href={`/p/${page.slug}`} target="_blank">Lihat</a>
        </div>
      ))}
    </div>
  );
}
