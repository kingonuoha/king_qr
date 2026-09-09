"use client";

import { useQrCode } from "@/hooks/useQrCode";
import type { QrColorStyle } from "@/lib/qr/types";

export default function QrPreview({
  payload,
  color,
}: {
  payload: string | null;
  color: QrColorStyle;
}) {
  const { containerRef, renderError } = useQrCode(payload, color.foreground);

  return (
    <div className="flex aspect-square w-full max-w-[248px] items-center justify-center rounded-2xl bg-white p-3 shadow-sm ring-1 ring-zinc-200">
      {payload ? (
        renderError ? (
          <p className="px-4 text-center text-sm text-zinc-400">
            Too much content for a QR — shorten it and try again.
          </p>
        ) : (
          <div ref={containerRef} />
        )
      ) : (
        <p className="px-4 text-center text-sm text-zinc-400">
          Fill in the fields to generate your QR
        </p>
      )}
    </div>
  );
}
