import { notFound } from 'next/navigation';
import { fetchAPI } from '../../../lib/api-client';

async function getPageData(slug: string) {
  try {
    return await fetchAPI(
      `/api/pages/${slug}/html`
    );
  } catch (error) {
    return null;
  }
}

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function PublicPage({
  params,
}: PageProps) {
  const page = await getPageData(
    params.slug
  );

  if (!page || !page.html) {
    notFound();
  }

  return (
    <main>
      <div
        dangerouslySetInnerHTML={{
          __html: page.html,
        }}
      />
    </main>
  );
}
