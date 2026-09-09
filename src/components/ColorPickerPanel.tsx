"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import type { QrColorStyle } from "@/lib/qr/types";
import { PRESET_COLORS } from "@/lib/qr/types";
import { isLowContrast, normalizeHex } from "@/lib/qr/color";

export default function ColorPickerPanel({
  style,
  onChange,
}: {
  style: QrColorStyle;
  onChange: (next: QrColorStyle) => void;
}) {
  const value = style.foreground;
  const [hexText, setHexText] = useState(value);
  const [pickerOpen, setPickerOpen] = useState(false);
  const hexInvalid = normalizeHex(hexText) === null;

  const apply = (hex: string) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return;
    setHexText(normalized);
    onChange({ foreground: normalized });
  };

  const handleHexInput = (raw: string) => {
    setHexText(raw);
    const normalized = normalizeHex(raw);
    if (normalized) {
      onChange({ foreground: normalized });
    }
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <span className="text-sm font-medium text-ink">QR color</span>

      <div className="flex flex-wrap items-center gap-2">
        {PRESET_COLORS.map((preset) => {
          const active = value.toLowerCase() === preset.hex;
          return (
            <button
              key={preset.hex}
              type="button"
              aria-label={preset.label}
              aria-pressed={active}
              title={preset.label}
              onClick={() => {
                apply(preset.hex);
                setPickerOpen(false);
              }}
              className={`h-7 w-7 rounded-full ring-1 ring-line transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50 ${
                active
                  ? "scale-110 ring-2 ring-brand-purple"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: preset.hex }}
            />
          );
        })}
        <button
          type="button"
          aria-expanded={pickerOpen}
          aria-label="Toggle custom color picker"
          onClick={() => setPickerOpen((open) => !open)}
          className={`ml-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
            pickerOpen
              ? "bg-brand-purple text-white"
              : "bg-card text-ink ring-1 ring-line hover:ring-brand-purple"
          }`}
        >
          <span
            className="h-3.5 w-3.5 rounded-full ring-1 ring-line"
            style={{ backgroundColor: value }}
          />
          Custom
        </button>
      </div>

      {pickerOpen && (
        <>
          <div className="flex flex-col gap-1.5">
            <input
              value={hexText}
              onChange={(e) => handleHexInput(e.target.value)}
              placeholder="#000000"
              spellCheck={false}
              aria-label="Color hex code"
              aria-invalid={hexInvalid}
              className={`w-full rounded-lg border bg-card px-3 py-2 font-mono text-sm text-ink outline-none transition focus:ring-2 ${
                hexInvalid
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
                  : "border-line focus:border-brand-purple focus:ring-brand-purple/30"
              }`}
            />
            {hexInvalid && (
              <span className="text-xs text-red-600 dark:text-red-400">
                Enter a valid hex code, e.g. #1d4ed8
              </span>
            )}
          </div>
          <HexColorPicker
            color={normalizeHex(value) ?? "#000000"}
            onChange={apply}
            style={{ width: "100%" }}
            aria-label="Color picker"
          />
        </>
      )}

      {isLowContrast(value) && (
        <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
          Low contrast on white — this QR may not scan reliably.
        </p>
      )}
    </div>
  );
}
