"use client";

import { useRef, useState } from "react";

const inputCls =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

/**
 * Image field for the admin forms: upload a file to /api/upload or paste a URL.
 * Pass `onClear` to show a "Remove image" button (for optional images).
 */
export function ImagePicker({
  value,
  onChange,
  onClear,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear?: () => void;
  id: string;
}) {
  const [mode, setMode] = useState<"upload" | "url">(
    value.startsWith("http") ? "url" : "upload"
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd, credentials: "same-origin" });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        setUploadError(d?.error || `Upload failed (${res.status})`);
        return;
      }
      const d = await res.json();
      onChange(d.path);
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {(["upload", "url"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1 text-xs rounded border ${
              mode === m
                ? "bg-[#1565C0] text-white border-[#1565C0]"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {m === "upload" ? "Upload" : "URL"}
          </button>
        ))}
      </div>

      {mode === "upload" ? (
        <div>
          <div
            className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-[#1565C0] transition-colors text-sm text-gray-500"
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-[#1565C0]", "bg-blue-50"); }}
            onDragLeave={(e) => { e.currentTarget.classList.remove("border-[#1565C0]", "bg-blue-50"); }}
            onDrop={async (e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("border-[#1565C0]", "bg-blue-50");
              const file = e.dataTransfer.files[0];
              if (file) await upload(file);
            }}
          >
            {uploading ? "Uploading…" : "Click or drag & drop (PNG, JPG, WebP — max 5 MB)"}
          </div>
          <input id={id} ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) await upload(f); }} />
          {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
        </div>
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.png"
          className={inputCls}
        />
      )}

      {value && (
        <div className="relative w-full h-28 rounded overflow-hidden border border-gray-200 bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-2 top-2 rounded bg-white/90 px-2 py-1 text-xs font-medium text-red-600 shadow hover:bg-white"
            >
              Remove image
            </button>
          )}
        </div>
      )}
    </div>
  );
}
