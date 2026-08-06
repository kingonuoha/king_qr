"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { createQrOptions } from "@/lib/qr/render";

const PREVIEW_SIZE = 224;
const DEBOUNCE_MS = 300;

export function useQrCode(payload: string | null) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [debouncedPayload, setDebouncedPayload] = useState<string | null>(payload);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedPayload(payload);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [payload]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.replaceChildren();
    if (!debouncedPayload) return;

    let cancelled = false;
    (async () => {
      try {
        setRenderError(false);
        const qr = new QRCodeStyling(
          createQrOptions(debouncedPayload, PREVIEW_SIZE)
        );
        if (cancelled) return;
        qr.append(container);
      } catch {
        if (!cancelled) setRenderError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debouncedPayload]);

  return { containerRef, renderError };
}
