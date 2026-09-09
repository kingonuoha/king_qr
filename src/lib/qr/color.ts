const HEX_FULL = /^#[0-9a-fA-F]{6}$/;
const HEX_SHORT = /^#[0-9a-fA-F]{3}$/;

export function isValidHex(value: string): boolean {
  return HEX_FULL.test(value);
}

export function normalizeHex(raw: string): string | null {
  let value = raw.trim();
  if (!value.startsWith("#")) value = `#${value}`;
  value = value.toLowerCase();
  if (HEX_SHORT.test(value)) {
    value = `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }
  return HEX_FULL.test(value) ? value : null;
}

function channelLuminance(channel8bit: number): number {
  const c = channel8bit / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const value = normalizeHex(hex);
  if (!value) return 0;
  const r = parseInt(value.slice(1, 3), 16);
  const g = parseInt(value.slice(3, 5), 16);
  const b = parseInt(value.slice(5, 7), 16);
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

export const LOW_CONTRAST_RATIO = 3;

export function contrastAgainstWhite(hex: string): number {
  return (1 + 0.05) / (relativeLuminance(hex) + 0.05);
}

export function isLowContrast(hex: string): boolean {
  return contrastAgainstWhite(hex) < LOW_CONTRAST_RATIO;
}
