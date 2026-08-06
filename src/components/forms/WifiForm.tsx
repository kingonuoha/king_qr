"use client";

import type { WifiEncryption, WifiForm } from "@/lib/qr/types";
import { Field, Select, TextInput, Toggle } from "@/components/inputs";
import type { FormProps } from "./FormProps";

const ENCRYPTION_OPTIONS: { value: WifiEncryption; label: string }[] = [
  { value: "WPA", label: "WPA" },
  { value: "WEP", label: "WEP" },
  { value: "None", label: "None" },
];

export default function WifiForm({
  value,
  onChange,
}: FormProps<WifiForm>) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Network name (SSID)" required>
        <TextInput
          value={value.ssid}
          onChange={(next) => onChange({ ...value, ssid: next })}
          placeholder="MyHomeWiFi"
        />
      </Field>
      <Field label="Password">
        <TextInput
          value={value.password}
          onChange={(next) => onChange({ ...value, password: next })}
          placeholder="Network password"
          type="password"
        />
      </Field>
      <Field label="Encryption">
        <Select
          value={value.encryption}
          onChange={(next) =>
            onChange({ ...value, encryption: next as WifiEncryption })
          }
          options={ENCRYPTION_OPTIONS}
        />
      </Field>
      <Toggle
        checked={value.hidden}
        onChange={(next) => onChange({ ...value, hidden: next })}
        label="Hidden network"
      />
    </div>
  );
}
