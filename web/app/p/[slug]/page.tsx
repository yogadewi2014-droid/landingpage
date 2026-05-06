import { fetchAPI } from '../../../lib/api-client';

async function getPageData(slug: string) {
  try {
    const data = await fetchAPI(`/api/pages/${slug}/html`);
    return data;
  } catch (error) {
    return null;
  }
}

export default async function PublicPage({ params }: { params: { slug: string } }) {
  const page = await getPageData(params.slug);

  if (!page || !page.html) {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', padding: 40, textAlign: 'center' }}>
        <h1>Halaman tidak ditemukan</h1>
        <p>Landing page ini belum ada atau telah dihapus.</p>
      </div>
    );
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: page.html }} />
  );
}
