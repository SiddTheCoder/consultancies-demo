import { getStore } from "@netlify/blobs";

const jsonHeaders = {
  "content-type": "application/json",
  "cache-control": "no-store",
};

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return (
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("client-ip") ||
    "unknown"
  );
}

function cleanPayload(value) {
  if (!value || typeof value !== "object") return {};

  return {
    path: String(value.path || "").slice(0, 300),
    search: String(value.search || "").slice(0, 300),
    url: String(value.url || "").slice(0, 700),
    referrer: String(value.referrer || "").slice(0, 700),
    visitorId: String(value.visitorId || "").slice(0, 120),
    consultancyKey: String(value.consultancyKey || "").slice(0, 120),
    consultancyName: String(value.consultancyName || "").slice(0, 160),
    language: String(value.language || "").slice(0, 80),
    timezone: String(value.timezone || "").slice(0, 120),
    viewport: String(value.viewport || "").slice(0, 80),
  };
}

async function readAdminData(store) {
  const { blobs } = await store.list();
  const newest = blobs
    .map((blob) => blob.key)
    .sort()
    .reverse()
    .slice(0, 500);

  const visits = await Promise.all(
    newest.map((key) => store.get(key, { type: "json" }))
  );

  const validVisits = visits.filter(Boolean);
  const uniqueIps = new Set(validVisits.map((visit) => visit.ip).filter(Boolean));
  const byConsultancy = validVisits.reduce((acc, visit) => {
    const key = visit.consultancyKey || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return {
    totalStoredVisits: blobs.length,
    returnedVisits: validVisits.length,
    uniqueIpCount: uniqueIps.size,
    byConsultancy,
    visits: validVisits,
  };
}

export default async function handler(request, context) {
  const store = getStore("site-visits");

  if (request.method === "GET") {
    const adminToken = process.env.VISIT_ADMIN_TOKEN;
    const providedToken =
      request.headers.get("x-visit-admin-token") ||
      new URL(request.url).searchParams.get("token");

    if (!adminToken || providedToken !== adminToken) {
      return Response.json(
        { error: "Missing or invalid admin token." },
        { status: 401, headers: jsonHeaders }
      );
    }

    return Response.json(await readAdminData(store), { headers: jsonHeaders });
  }

  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed." },
      { status: 405, headers: jsonHeaders }
    );
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const visit = {
    ...cleanPayload(body),
    ip: getClientIp(request),
    userAgent: request.headers.get("user-agent") || "",
    country: context.geo?.country?.name || "",
    countryCode: context.geo?.country?.code || "",
    subdivision: context.geo?.subdivision?.name || "",
    city: context.geo?.city || "",
    latitude: context.geo?.latitude || null,
    longitude: context.geo?.longitude || null,
    timestamp: new Date().toISOString(),
  };

  const date = visit.timestamp.slice(0, 10);
  const key = `${date}/${Date.now()}-${crypto.randomUUID()}.json`;
  await store.setJSON(key, visit, {
    metadata: {
      ip: visit.ip,
      country: visit.country,
      path: visit.path,
      consultancyKey: visit.consultancyKey,
    },
  });

  return Response.json({ ok: true }, { status: 201, headers: jsonHeaders });
}
