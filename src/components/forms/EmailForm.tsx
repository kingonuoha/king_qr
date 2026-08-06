"use client";

import type { EmailForm } from "@/lib/qr/types";
import { Field, TextArea, TextInput } from "@/components/inputs";
import type { FormProps } from "./FormProps";

export default function EmailForm({
  value,
  onChange,
}: FormProps<EmailForm>) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="To" required>
        <TextInput
          value={value.to}
          onChange={(next) => onChange({ ...value, to: next })}
          placeholder="name@example.com"
          inputMode="email"
        />
      </Field>
      <Field label="Subject">
        <TextInput
          value={value.subject}
          onChange={(next) => onChange({ ...value, subject: next })}
          placeholder="Meeting this week"
        />
      </Field>
      <Field label="Body">
        <TextArea
          value={value.body}
          onChange={(next) => onChange({ ...value, body: next })}
          placeholder="Type your message…"
          rows={5}
        />
      </Field>
    </div>
  );
}
