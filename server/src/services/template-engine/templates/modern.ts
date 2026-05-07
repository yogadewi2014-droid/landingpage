function cloudinary(url: string, width = 800) {
  if (!url) return "";

  // otomatis optimize jika dari cloudinary
  if (url.includes("cloudinary.com")) {
    return url.replace(
      "/upload/",
      `/upload/f_auto,q_auto,w_${width},c_limit/`
    );
  }

  return url;
}

export function render(data: any) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${data.headline}</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <style>
    *{
      margin:0;
      padding:0;
      box-sizing:border-box;
    }

    body{
      font-family:'Inter',sans-serif;
      background:#f4f7fb;
      color:#0f172a;
    }

    .container{
      max-width:520px;
      margin:0 auto;
      background:white;
      min-height:100vh;
      overflow:hidden;
    }

    .hero{
      position:relative;
      padding:56px 24px 42px;
      background:
        radial-gradient(circle at top left,#8b5cf6 0%,transparent 35%),
        radial-gradient(circle at top right,#6366f1 0%,transparent 30%),
        linear-gradient(135deg,#312e81,#4f46e5,#7c3aed);
      color:white;
      text-align:center;
    }

    .badge{
      display:inline-block;
      background:rgba(255,255,255,0.15);
      border:1px solid rgba(255,255,255,0.2);
      backdrop-filter:blur(10px);
      padding:10px 18px;
      border-radius:999px;
      font-size:13px;
      margin-bottom:22px;
    }

    h1{
      font-size:36px;
      line-height:1.15;
      font-weight:800;
      margin-bottom:16px;
    }

    .subheadline{
      font-size:16px;
      line-height:1.7;
      opacity:.92;
      margin-bottom:28px;
    }

    .hero img{
      width:100%;
      border-radius:28px;
      box-shadow:
        0 20px 40px rgba(0,0,0,0.25),
        0 0 0 6px rgba(255,255,255,0.08);
      object-fit:cover;
    }

    .section{
      padding:30px 24px;
    }

    .section-title{
      font-size:26px;
      font-weight:800;
      margin-bottom:22px;
      text-align:center;
      color:#111827;
    }

    .feature{
      display:flex;
      gap:14px;
      align-items:flex-start;
      background:#f8fafc;
      border:1px solid #e2e8f0;
      border-radius:22px;
      padding:18px;
      margin-bottom:14px;
    }

    .icon{
      width:42px;
      height:42px;
      border-radius:14px;
      display:flex;
      align-items:center;
      justify-content:center;
      background:linear-gradient(135deg,#4f46e5,#7c3aed);
      color:white;
      font-size:18px;
      flex-shrink:0;
    }

    .feature p{
      font-size:16px;
      line-height:1.6;
      color:#334155;
    }

    .testimonial{
      background:white;
      border-radius:24px;
      padding:22px;
      box-shadow:0 10px 30px rgba(15,23,42,0.06);
      margin-bottom:16px;
      border:1px solid #f1f5f9;
    }

    .stars{
      color:#f59e0b;
      font-size:18px;
      margin-bottom:10px;
    }

    .testimonial p{
      line-height:1.7;
      color:#475569;
      margin-bottom:12px;
    }

    .user{
      font-weight:700;
      color:#0f172a;
    }

    .cta-box{
      margin:28px 24px;
      background:linear-gradient(135deg,#16a34a,#22c55e);
      border-radius:28px;
      padding:28px 22px;
      text-align:center;
      color:white;
      box-shadow:0 20px 40px rgba(34,197,94,0.3);
    }

    .cta-box h3{
      font-size:28px;
      margin-bottom:10px;
      font-weight:800;
    }

    .cta-box p{
      opacity:.92;
      line-height:1.7;
      margin-bottom:22px;
    }

    .cta-button{
      display:block;
      width:100%;
      background:white;
      color:#16a34a;
      text-decoration:none;
      padding:18px;
      border-radius:18px;
      font-size:18px;
      font-weight:800;
    }

    .footer{
      text-align:center;
      padding:34px 20px 90px;
      font-size:13px;
      color:#94a3b8;
    }

    .footer a{
      color:#4f46e5;
      text-decoration:none;
      font-weight:700;
    }

    .sticky{
      position:fixed;
      bottom:0;
      left:0;
      width:100%;
      background:white;
      padding:14px;
      border-top:1px solid #e2e8f0;
      box-shadow:0 -10px 30px rgba(0,0,0,0.06);
    }

    .sticky a{
      display:block;
      max-width:520px;
      margin:0 auto;
      text-align:center;
      background:linear-gradient(135deg,#16a34a,#22c55e);
      color:white;
      text-decoration:none;
      padding:18px;
      border-radius:18px;
      font-size:18px;
      font-weight:800;
    }
  </style>
</head>

<body>

<div class="container">

  <section class="hero">

    <div class="badge">
      ${data.badge || "🔥 Promo Hari Ini"}
    </div>

    <h1>
      ${data.headline}
    </h1>

    <p class="subheadline">
      ${data.subheadline}
    </p>

    <img 
      src="${cloudinary(data.image, 900)}" 
      alt="Hero Image"
      loading="lazy"
    />

  </section>

  <section class="section">

    <h2 class="section-title">
      ${data.featureTitle || "Kenapa Banyak Yang Pilih Ini?"}
    </h2>

    ${(data.features || [])
      .map(
        (f: string) => `
      <div class="feature">
        <div class="icon">✓</div>
        <p>${f}</p>
      </div>
    `
      )
      .join("")}

  </section>

  ${
    data.testimonials?.length
      ? `
  <section class="section">

    <h2 class="section-title">
      ${data.testimonialTitle || "Testimoni Customer"}
    </h2>

    ${(data.testimonials || [])
      .map(
        (t: any) => `
      <div class="testimonial">

        <div class="stars">
          ${"★".repeat(t.rating || 5)}
        </div>

        <p>
          "${t.text}"
        </p>

        <div class="user">
          — ${t.name}
        </div>

      </div>
    `
      )
      .join("")}

  </section>
  `
      : ""
  }

  <div class="cta-box">

    <h3>
      ${data.ctaTitle || "Siap Order Sekarang?"}
    </h3>

    <p>
      ${data.ctaDescription || "Dapatkan promo spesial hari ini sebelum kehabisan."}
    </p>

    <a href="${data.ctaLink || "#"}" class="cta-button">
      ${data.cta || "Pesan Sekarang"}
    </a>

  </div>

  <div class="footer">
    Dibuat dengan ❤️ oleh
    <a href="https://cblzai.com">
      cblzai.com
    </a>
  </div>

</div>

<div class="sticky">
  <a href="${data.ctaLink || "#"}">
    ${data.cta || "Pesan Sekarang"}
  </a>
</div>

</body>
</html>`;
}
