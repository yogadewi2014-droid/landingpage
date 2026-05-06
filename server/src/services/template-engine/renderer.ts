import officeLayout from './templates/office/layout.json';

interface PageData {
  headline: string;
  subheadline: string;
  cta: string;
  features: string[];
  image: string;
  watermark: boolean;
}

export function renderTemplate(templateName: string, data: PageData): string {
  let layout: any;
  if (templateName === 'office') {
    layout = officeLayout;
  } else {
    layout = officeLayout; // fallback
  }

  let html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.headline}</title>
<style>
  body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f9f9f9; }
  .container { max-width: 480px; margin: 0 auto; background: white; min-height: 100vh; }
  .hero { padding: 40px 20px; text-align: center; background: #1a365d; color: white; }
  .hero h1 { font-size: 28px; margin: 0 0 10px; }
  .hero p { font-size: 16px; opacity: 0.9; }
  .features { padding: 20px; }
  .features ul { list-style: none; padding: 0; }
  .features li { padding: 10px 0; border-bottom: 1px solid #eee; font-size: 16px; }
  .cta { padding: 20px; text-align: center; }
  .cta a { display: inline-block; background: #25D366; color: white; padding: 15px 30px; font-size: 20px; font-weight: bold; border-radius: 8px; text-decoration: none; }
  .watermark { text-align: center; padding: 10px; font-size: 12px; color: #999; }
  .watermark a { color: #999; }
</style>
</head>
<body>
<div class="container">
`;

  for (const section of layout.sections) {
    if (section.type === 'hero') {
      html += `<div class="hero">
        <h1>${data.headline || section.props.defaultHeadline}</h1>
        <p>${data.subheadline || section.props.defaultSubheadline}</p>
        <img src="${data.image || section.props.defaultImage}" alt="Hero" style="width:100%; max-width:300px; margin-top:20px; border-radius: 8px;">
      </div>`;
    } else if (section.type === 'features') {
      html += `<div class="features"><ul>`;
      const items = data.features?.length ? data.features : section.props.defaultItems;
      for (const item of items) {
        html += `<li>✅ ${item}</li>`;
      }
      html += `</ul></div>`;
    } else if (section.type === 'cta') {
      html += `<div class="cta">
        <a href="${section.props.defaultLink}">${data.cta || section.props.defaultText}</a>
      </div>`;
    }
  }

  if (data.watermark) {
    html += `<div class="watermark">Dibuat oleh <a href="https://cblzai.com">cblzai.com</a> – Buat landing page kamu di sini</div>`;
  }

  html += `</div></body></html>`;
  return html;
}
