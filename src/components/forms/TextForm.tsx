"use client";

import type { TextForm } from "@/lib/qr/types";
import { Field, TextArea } from "@/components/inputs";
import type { FormProps } from "./FormProps";

export default function TextForm({
  value,
  onChange,
}: FormProps<TextForm>) {
  return (
    <Field label="Text" required>
      <TextArea
        value={value.text}
        onChange={(next) => onChange({ ...value, text: next })}
        placeholder="Type anything…"
      />
    </Field>
  );
}
