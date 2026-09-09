"use client";

import { useState } from "react";
import type { Forms, QrColorStyle, QRType } from "@/lib/qr/types";
import { DEFAULT_QR_COLOR, emptyForms, QR_TYPE_LABELS } from "@/lib/qr/types";
import { buildPayload } from "@/lib/qr/payloads";
import { FORM_COMPONENTS } from "@/components/forms";
import TypeSelector from "@/components/TypeSelector";
import QrPreview from "@/components/QrPreview";
import ColorPickerPanel from "@/components/ColorPickerPanel";
import ExportPanel from "@/components/ExportPanel";
import ThemeToggle from "@/components/ThemeToggle";

export default function QrGenerator() {
  const [type, setType] = useState<QRType>("url");
  const [forms, setForms] = useState<Forms>(emptyForms);
  const [color, setColor] = useState<QrColorStyle>({
    foreground: DEFAULT_QR_COLOR,
  });

  const payload = buildPayload(type, forms[type]);
  const ActiveForm = FORM_COMPONENTS[type];

  const handleTypeChange = (next: QRType) => {
    setType(next);
    setForms(emptyForms);
  };

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-4 sm:px-6">
      <header className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="h-6 w-1.5 rounded-full bg-brand-green" />
          <div>
            <h1 className="text-2xl font-bold text-brand-purple">King QR</h1>
            <p className="text-sm text-ink/60">
              Pick a type, fill a form, get a scannable QR instantly.
            </p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <TypeSelector value={type} onChange={handleTypeChange} />

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_auto]">
        <section className="rounded-2xl bg-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-line">
          <h2 className="mb-4 text-lg font-semibold text-ink">
            {QR_TYPE_LABELS[type]}
          </h2>
          <ActiveForm
            value={forms[type]}
            onChange={(next) =>
              setForms((prev) => ({ ...prev, [type]: next }))
            }
          />
        </section>
        <aside className="flex w-full flex-col items-center gap-2.5 self-start rounded-2xl bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-line lg:w-[380px]">
          <QrPreview payload={payload} color={color} />
          {payload && (
            <>
              <ColorPickerPanel style={color} onChange={setColor} />
              <ExportPanel payload={payload} type={type} color={color} />
            </>
          )}
        </aside>
      </div>
    </main>
  );
}
