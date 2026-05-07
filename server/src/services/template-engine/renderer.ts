export function renderTemplate(
  template: string,
  data: any
) {
  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>${data.headline}</title>

  <style>
    *{
      margin:0;
      padding:0;
      box-sizing:border-box;
      font-family:Arial,sans-serif;
    }

    body{
      background:#f5f7fb;
      color:#222;
    }

    .container{
      max-width:480px;
      margin:0 auto;
      background:white;
      min-height:100vh;
    }

    .hero{
      background:linear-gradient(
        135deg,
        #0f172a,
        #1e3a8a
      );

      color:white;
      text-align:center;
      padding:60px 24px;
    }

    .hero img{
      width:100%;
      border-radius:20px;
      margin-top:24px;
    }

    h1{
      font-size:36px;
      line-height:1.2;
      margin-bottom:16px;
    }

    .subheadline{
      font-size:18px;
      opacity:0.9;
    }

    .features{
      padding:32px 24px;
    }

    .feature{
      background:#f8fafc;
      border-radius:16px;
      padding:18px;
      margin-bottom:16px;
      font-size:17px;
    }

    .cta-wrap{
      padding:24px;
      text-align:center;
    }

    .cta{
      display:block;
      width:100%;
      background:#22c55e;
      color:white;
      text-decoration:none;
      padding:18px;
      border-radius:16px;
      font-size:20px;
      font-weight:bold;
    }

    .footer{
      text-align:center;
      font-size:13px;
      color:#777;
      padding:32px 20px;
    }

    .footer a{
      color:#2563eb;
      text-decoration:none;
    }

  </style>
</head>

<body>

<div class="container">

  <section class="hero">
    <h1>${data.headline}</h1>

    <p class="subheadline">
      ${data.subheadline}
    </p>

    <img
      src="${data.image}"
      alt="Hero"
    />
  </section>

  <section class="features">

    ${(data.features || [])
      .map(
        (feature: string) => `
          <div class="feature">
            ✅ ${feature}
          </div>
        `
      )
      .join('')}

  </section>

  <div class="cta-wrap">
    <a href="#" class="cta">
      ${data.cta}
    </a>
  </div>

  <div class="footer">
    Dibuat oleh
    <a href="https://cblzai.com">
      cblzai.com
    </a>
  </div>

</div>

</body>
</html>
  `;
}
