const profiles = new Map([
  ["friendly-japanese-academy", {
    name: "Friendly Japanese Academy",
    description: "Japanese language and Japan pathway support",
  }],
  ["shinsegae-korean-language", {
    name: "Shinsegae Consultancy Korean Language Bagbazar",
    description: "Korean language learning for study and work pathways",
  }],
  ["hangkukkorea", {
    name: "Shinsegae Consultancy Korean Language Bagbazar",
    description: "Korean language learning for study and work pathways",
  }],
  ["journey-to-europe", {
    name: "Journey To Europe Student Visa",
    description: "Europe student visa guidance and Malta-focused options",
  }],
  ["sr-educational-consultancy", {
    name: "SR Educational Consultancy New Baneshwor",
    description: "Education counseling from New Baneshwor",
  }],
  ["happy-educational-consultancy", {
    name: "Happy Educational Consultancy Kathmandu",
    description: "Friendly education counseling for abroad-study decisions",
  }],
  ["euro-asia-education", {
    name: "Euro Asia Education Consultancy Pvt. Ltd.",
    description: "Study-abroad counseling with IELTS and PTE preparation",
  }],
  ["sbi-education", {
    name: "SBI Education Consultancy Pvt. Ltd.",
    description: "Education and career counseling from Bagbazar",
  }],
  ["sejong-education", {
    name: "Sejong Education Consultancy",
    description: "Structured consulting for education decisions",
  }],
  ["cross-country-consultancy", {
    name: "Cross Country Multipurpose Consultancy Pvt. Ltd.",
    description: "Multipurpose education consulting with strong public credibility",
  }],
]);

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function replaceTag(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace("</head>", `${replacement}\n  </head>`);
}

export default async function handler(request, context) {
  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) return response;

  const url = new URL(request.url);
  const firstSegment = url.pathname.split("/").filter(Boolean)[0] || "";
  const profile = profiles.get(firstSegment);

  if (!profile) return response;

  const title = `${profile.name} — Website Demo`;
  const description = `${profile.description}. View the personalized website demo.`;
  const canonicalUrl = `${url.origin}${url.pathname}`;

  let html = await response.text();
  html = replaceTag(html, /<title>.*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = replaceTag(html, /<meta name="description" content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = replaceTag(html, /<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = replaceTag(html, /<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = replaceTag(html, /<meta property="og:url" content=".*?"\s*\/?>/i, `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`);
  html = replaceTag(html, /<meta name="twitter:title" content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = replaceTag(html, /<meta name="twitter:description" content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);

  const headers = new Headers(response.headers);
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "public, max-age=0, must-revalidate");

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const config = {
  path: "/*",
};
