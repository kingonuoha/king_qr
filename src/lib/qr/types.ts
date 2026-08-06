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
