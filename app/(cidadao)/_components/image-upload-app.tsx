"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export function ImageUpload({
  onUploaded,
  onUploadingChange,
}: {
  onUploaded?: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    onUploadingChange?.(true);
    setError(null);

    try {
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Arquivo deve ter no máximo 5MB");
      }

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error("Formato de imagem inválido");
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Falha no upload");
      }

      onUploaded?.(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload");
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  }

  return (
    <div className="space-y-2">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {uploading && <p className="text-xs text-gray-500">Enviando imagem…</p>}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
