const VISITOR_ID_KEY = "demo-visitor-id";

type VisitPayload = {
  path: string;
  search: string;
  consultancyKey?: string | null;
  consultancyName: string;
};

function getVisitorId() {
  try {
    const existing = window.localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;

    const id = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_ID_KEY, id);
    return id;
  } catch {
    return "";
  }
}

export function trackVisit(payload: VisitPayload) {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    ...payload,
    url: window.location.href,
    referrer: document.referrer,
    visitorId: getVisitorId(),
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  });

  const endpoint = "/.netlify/functions/track-visit";

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon(endpoint, blob)) return;
  }

  void fetch(endpoint, {
    method: "POST",
    body,
    headers: { "content-type": "application/json" },
    keepalive: true,
  }).catch(() => {
    // Analytics must never block the demo.
  });
}
