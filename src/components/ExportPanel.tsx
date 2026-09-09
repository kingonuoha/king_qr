"use client";

import { useEffect, useRef, useState } from "react";
import type { QrColorStyle, QRType } from "@/lib/qr/types";
import {
  copyQrToClipboard,
  DOWNLOAD_SIZES,
  downloadQr,
} from "@/lib/qr/render";
import type { DownloadFormat, DownloadSize } from "@/lib/qr/render";

const FORMAT_OPTIONS: { key: DownloadFormat; label: string }[] = [
  { key: "png", label: "PNG" },
  { key: "svg", label: "SVG" },
];

const SIZE_OPTIONS: { key: DownloadSize; label: string }[] = [
  { key: "small", label: "Small" },
  { key: "medium", label: "Medium" },
  { key: "large", label: "Large" },
];

export default function ExportPanel({
  payload,
  type,
  color,
}: {
  payload: string | null;
  type: QRType;
  color: QrColorStyle;
}) {
  const [format, setFormat] = useState<DownloadFormat>("png");
  const [size, setSize] = useState<DownloadSize>("medium");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const copiedTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimer.current !== null) {
        window.clearTimeout(copiedTimer.current);
      }
    };
  }, []);

  const handleDownload = async () => {
    if (!payload) return;
    setBusy(true);
    setError(null);
    try {
      await downloadQr(payload, format, size, type, color.foreground);
    } catch {
      setError("Download failed — try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleCopy = async () => {
    if (!payload) return;
    setBusy(true);
    setError(null);
    setCopied(false);
    try {
        const ok = await copyQrToClipboard(
          payload,
          DOWNLOAD_SIZES[size],
          color.foreground
        );
      if (ok) {
        setCopied(true);
        if (copiedTimer.current !== null) {
          window.clearTimeout(copiedTimer.current);
        }
        copiedTimer.current = window.setTimeout(() => setCopied(false), 2000);
      } else {
        setError(
          "Your browser doesn't support copying images — try downloading instead."
        );
      }
    } catch {
      setError("Copy failed — try downloading instead.");
    } finally {
      setBusy(false);
    }
  };

  const disabled = !payload || busy;

  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.06)] ring-1 ring-line">
      <h2 className="text-lg font-semibold text-ink">Download</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Format</span>
          <div className="flex flex-wrap gap-2">
            {FORMAT_OPTIONS.map((option) => {
              const active = option.key === format;
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={active}
                  disabled={disabled}
                  onClick={() => setFormat(option.key)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    active
                      ? "bg-brand-purple text-white shadow-sm"
                      : "bg-card text-ink ring-1 ring-line hover:ring-brand-purple"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-ink">Size</span>
          <div className="flex flex-wrap gap-2">
            {SIZE_OPTIONS.map((option) => {
              const active = option.key === size;
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={active}
                  disabled={disabled}
                  onClick={() => setSize(option.key)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    active
                      ? "bg-brand-purple text-white shadow-sm"
                      : "bg-card text-ink ring-1 ring-line hover:ring-brand-purple"
                  }`}
                >
                  {option.label}
                  <span className="text-ink/50"> · {DOWNLOAD_SIZES[option.key]}px</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDownload}
            disabled={disabled}
            className="rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? "Working…" : "Download QR"}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={disabled}
            className="rounded-lg bg-card px-5 py-2.5 text-sm font-semibold text-brand-purple ring-1 ring-brand-purple transition hover:bg-brand-purple hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy to clipboard"}
          </button>
        </div>
        {copied && (
          <p className="text-sm font-medium text-brand-green">
            Copied to clipboard!
          </p>
        )}
        {error && (
          <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </section>
  );
}
