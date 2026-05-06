import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, color: '#1a365d' }}>CBLZ Landing Page Builder</h1>
      <p>Buat landing page profesional dalam hitungan detik.<br/>Mulai dari WhatsApp, Telegram, atau langsung di sini.</p>
      <div style={{ marginTop: 40 }}>
        <Link href="/dashboard" style={{
          display: 'inline-block',
          padding: '15px 30px',
          background: '#25D366',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: 8,
          textDecoration: 'none',
          fontSize: 18
        }}>
          Mulai Buat Landing Page
        </Link>
      </div>
    </div>
  );
}
