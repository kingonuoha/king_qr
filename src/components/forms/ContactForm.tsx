"use client";

import type { ContactForm } from "@/lib/qr/types";
import { Field, TextInput } from "@/components/inputs";
import type { FormProps } from "./FormProps";

export default function ContactForm({
  value,
  onChange,
}: FormProps<ContactForm>) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Full name" required>
        <TextInput
          value={value.name}
          onChange={(next) => onChange({ ...value, name: next })}
          placeholder="Ada Lovelace"
        />
      </Field>
      <Field label="Phone">
        <TextInput
          value={value.phone}
          onChange={(next) => onChange({ ...value, phone: next })}
          placeholder="+1 555-0100"
          inputMode="tel"
        />
      </Field>
      <Field label="Email">
        <TextInput
          value={value.email}
          onChange={(next) => onChange({ ...value, email: next })}
          placeholder="ada@example.com"
          inputMode="email"
        />
      </Field>
      <Field label="Organization">
        <TextInput
          value={value.organization}
          onChange={(next) => onChange({ ...value, organization: next })}
          placeholder="Company name"
        />
      </Field>
    </div>
  );
}
