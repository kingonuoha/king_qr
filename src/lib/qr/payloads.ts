import type { ContactForm, EmailForm, FormState, QRType, TextForm, UrlForm, WifiForm } from "./types";

const WIFI_ESCAPE = /([\\;,:"])/g;

function escapeWifiValue(value: string): string {
  return value.replace(WIFI_ESCAPE, "\\$1");
}

export function isValidUrl(raw: string): boolean {
  const candidate = normalizeUrl(raw);
  return candidate !== null;
}

export function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const hasNonHttpScheme =
    /^[a-z][a-z0-9+.-]*:/i.test(trimmed) && !/^https?:\/\//i.test(trimmed);
  if (hasNonHttpScheme) return null;
  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const parsed = new URL(withScheme);
    return parsed.href;
  } catch {
    return null;
  }
}

export function isValidEmail(value: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,}$/.test(value.trim());
}

function buildUrlPayload(form: UrlForm): string | null {
  return normalizeUrl(form.link);
}

function buildTextPayload(form: TextForm): string | null {
  const text = form.text.trim();
  return text ? text : null;
}

function buildWifiPayload(form: WifiForm): string | null {
  const ssid = form.ssid;
  if (!ssid) return null;

  let out = "WIFI:";
  if (form.encryption !== "None") {
    out += `T:${form.encryption};`;
  }
  out += `S:${escapeWifiValue(ssid)};`;
  if (form.password && form.encryption !== "None") {
    out += `P:${escapeWifiValue(form.password)};`;
  }
  out += `H:${form.hidden ? "true" : "false"};;`;
  return out;
}

function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function buildContactPayload(form: ContactForm): string | null {
  const name = form.name.trim();
  if (!name) return null;

  const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${escapeVCardValue(name)}`];
  if (form.organization.trim()) {
    lines.push(`ORG:${escapeVCardValue(form.organization.trim())}`);
  }
  if (form.phone.trim()) {
    lines.push(`TEL:${escapeVCardValue(form.phone.trim())}`);
  }
  if (form.email.trim()) {
    lines.push(`EMAIL:${escapeVCardValue(form.email.trim())}`);
  }
  lines.push("END:VCARD");
  return lines.join("\n");
}

function buildEmailPayload(form: EmailForm): string | null {
  const to = form.to.trim();
  if (!isValidEmail(to)) return null;

  const params: string[] = [];
  if (form.subject.trim()) {
    params.push(`subject=${encodeURIComponent(form.subject)}`);
  }
  if (form.body.trim()) {
    params.push(`body=${encodeURIComponent(form.body)}`);
  }
  const query = params.length > 0 ? `?${params.join("&")}` : "";
  return `mailto:${to}${query}`;
}

export function buildPayload(type: QRType, form: FormState): string | null {
  switch (type) {
    case "url":
      return buildUrlPayload(form as UrlForm);
    case "text":
      return buildTextPayload(form as TextForm);
    case "wifi":
      return buildWifiPayload(form as WifiForm);
    case "contact":
      return buildContactPayload(form as ContactForm);
    case "email":
      return buildEmailPayload(form as EmailForm);
  }
}
