import QRCodeStyling from "qr-code-styling";
import type { FileExtension, Options } from "qr-code-styling";

export type DownloadFormat = "png" | "svg";
export type DownloadSize = "small" | "medium" | "large";

export const DOWNLOAD_SIZES: Record<DownloadSize, number> = {
  small: 256,
  medium: 512,
  large: 1024,
};

export function createQrOptions(data: string, size: number): Options {
  return {
    type: "canvas",
    width: size,
    height: size,
    margin: Math.round(size * 0.06),
    data,
    qrOptions: {
      errorCorrectionLevel: "M",
    },
    dotsOptions: {
      type: "square",
      color: "#000000",
    },
    cornersSquareOptions: {
      type: "square",
      color: "#000000",
    },
    cornersDotOptions: {
      type: "square",
      color: "#000000",
    },
    backgroundOptions: {
      color: "#ffffff",
    },
  };
}

function downloadDataUrl(dataUrl: string, filename: string): void {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function downloadBlob(blob: Blob, filename: string): void {
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") {
      downloadDataUrl(reader.result, filename);
    }
  };
  reader.readAsDataURL(blob);
}

function fileExtension(format: DownloadFormat): FileExtension {
  return format;
}

export async function downloadQr(
  data: string,
  format: DownloadFormat,
  size: DownloadSize,
  typeSlug: string
): Promise<void> {
  const qr = new QRCodeStyling(createQrOptions(data, DOWNLOAD_SIZES[size]));
  const raw = await qr.getRawData(fileExtension(format));
  if (!raw) return;
  const blob = raw instanceof Blob ? raw : new Blob([new Uint8Array(raw)], { type: `image/${fileExtension(format)}` });
  downloadBlob(blob, `king-qr-${typeSlug}.${fileExtension(format)}`);
}

export async function copyQrToClipboard(data: string, size: number): Promise<boolean> {
  const qr = new QRCodeStyling(createQrOptions(data, size));
  const raw = await qr.getRawData("png");
  if (!raw) return false;
  const blob = raw instanceof Blob ? raw : new Blob([new Uint8Array(raw)], { type: "image/png" });

  if (typeof ClipboardItem === "undefined" || !navigator.clipboard) {
    return false;
  }

  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
  return true;
}
