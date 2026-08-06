import type { ComponentType } from "react";
import type { FormState, QRType } from "@/lib/qr/types";
import type { FormProps } from "./FormProps";
import UrlForm from "./UrlForm";
import TextForm from "./TextForm";
import WifiForm from "./WifiForm";
import ContactForm from "./ContactForm";
import EmailForm from "./EmailForm";

export type { FormProps } from "./FormProps";

const formComponent = <T extends FormState>(
  component: ComponentType<FormProps<T>>
): ComponentType<FormProps> =>
  component as unknown as ComponentType<FormProps>;

export const FORM_COMPONENTS: Record<QRType, ComponentType<FormProps>> = {
  url: formComponent(UrlForm),
  text: formComponent(TextForm),
  wifi: formComponent(WifiForm),
  contact: formComponent(ContactForm),
  email: formComponent(EmailForm),
};
