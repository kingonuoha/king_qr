"use client";

import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { createQrOptions } from "@/lib/qr/render";
import { DEFAULT_QR_COLOR } from "@/lib/qr/types";

const PREVIEW_SIZE = 224;
const DEBOUNCE_MS = 300;

export function useQrCode(
  payload: string | null,
  foreground: string = DEFAULT_QR_COLOR
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [debounced, setDebounced] = useState<{
    payload: string | null;
    foreground: string;
  }>({ payload, foreground });
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounced({ payload, foreground });
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [payload, foreground]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.replaceChildren();
    const data = debounced.payload;
    if (!data) return;

    let cancelled = false;
    (async () => {
      try {
        setRenderError(false);
        const qr = new QRCodeStyling(
          createQrOptions(data, PREVIEW_SIZE, debounced.foreground)
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
  }, [debounced]);

  return { containerRef, renderError };
}
