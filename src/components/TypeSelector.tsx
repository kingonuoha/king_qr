"use client";

import type { QRType } from "@/lib/qr/types";
import { QR_TYPES, QR_TYPE_LABELS } from "@/lib/qr/types";

export default function TypeSelector({
  value,
  onChange,
}: {
  value: QRType;
  onChange: (type: QRType) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {QR_TYPES.map((type) => {
        const active = type === value;
        return (
          <button
            key={type}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(type)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 ${
              active
                ? "bg-brand-purple text-white shadow-sm"
                : "bg-card text-ink ring-1 ring-line hover:ring-brand-purple"
            }`}
          >
            {active && (
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-brand-green" />
            )}
            {QR_TYPE_LABELS[type]}
          </button>
        );
      })}
    </div>
  );
}
