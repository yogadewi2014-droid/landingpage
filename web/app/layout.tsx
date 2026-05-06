import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CBLZ Landing Page Builder',
  description: 'Buat landing page profesional dalam hitungan detik via WhatsApp, Telegram, atau Web',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif', background: '#f5f5f5' }}>
        {children}
      </body>
    </html>
  );
}
