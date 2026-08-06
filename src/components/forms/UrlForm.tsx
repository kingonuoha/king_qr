"use client";

import type { UrlForm } from "@/lib/qr/types";
import { Field, TextInput } from "@/components/inputs";
import type { FormProps } from "./FormProps";

export default function UrlForm({
  value,
  onChange,
}: FormProps<UrlForm>) {
  return (
    <Field label="Link" required hint="Enter a valid web address">
      <TextInput
        value={value.link}
        onChange={(next) => onChange({ ...value, link: next })}
        placeholder="https://example.com"
        inputMode="url"
      />
    </Field>
  );
}
