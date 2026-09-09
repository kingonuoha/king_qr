export type QRType = "url" | "text" | "wifi" | "contact" | "email";

export type WifiEncryption = "WPA" | "WEP" | "None";

export interface UrlForm {
  link: string;
}

export interface TextForm {
  text: string;
}

export interface WifiForm {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
  hidden: boolean;
}

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  organization: string;
}

export interface EmailForm {
  to: string;
  subject: string;
  body: string;
}

export type FormState = UrlForm | TextForm | WifiForm | ContactForm | EmailForm;

export interface Forms {
  url: UrlForm;
  text: TextForm;
  wifi: WifiForm;
  contact: ContactForm;
  email: EmailForm;
}

export const emptyForms: Forms = {
  url: { link: "" },
  text: { text: "" },
  wifi: { ssid: "", password: "", encryption: "WPA", hidden: false },
  contact: { name: "", phone: "", email: "", organization: "" },
  email: { to: "", subject: "", body: "" },
};

export type QRTypeLabel =
  | "URL"
  | "Text"
  | "WiFi"
  | "Contact"
  | "Email";

export const QR_TYPES: QRType[] = ["url", "text", "wifi", "contact", "email"];

export const QR_TYPE_LABELS: Record<QRType, QRTypeLabel> = {
  url: "URL",
  text: "Text",
  wifi: "WiFi",
  contact: "Contact",
  email: "Email",
};

export interface QrColorStyle {
  foreground: string;
}

export const DEFAULT_QR_COLOR = "#000000";

export const PRESET_COLORS: { hex: string; label: string }[] = [
  { hex: "#000000", label: "Black" },
  { hex: "#1d4ed8", label: "Blue" },
  { hex: "#047857", label: "Green" },
  { hex: "#b91c1c", label: "Red" },
  { hex: "#6d28d9", label: "Purple" },
];
