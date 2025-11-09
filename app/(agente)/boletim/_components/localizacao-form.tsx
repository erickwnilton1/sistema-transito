"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import type { BoletimFormData } from "@/types/types";

interface Props {
  coords: { latitude: number; longitude: number } | null;
  locationError: string | null;
}

export default function LocalizacaoForm({ coords, locationError }: Props) {
  return (
    <div className="mb-6 p-5 border rounded-2xl bg-gradient-to-r from-blue-50 to-white shadow-md">
      <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
        Localização Atual
      </h2>
      {locationError ? (
        <p className="text-red-600 font-medium">{locationError}</p>
      ) : coords ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col bg-blue-100 p-3 rounded-xl shadow-sm">
            <span className="font-semibold text-blue-700">Latitude</span>
            <span className="text-gray-700">{coords.latitude.toFixed(15)}</span>
          </div>
          <div className="flex flex-col bg-blue-100 p-3 rounded-xl shadow-sm">
            <span className="font-semibold text-blue-700">Longitude</span>
            <span className="text-gray-700">
              {coords.longitude.toFixed(15)}
            </span>
          </div>
          <div className="md:col-span-2">
            <p className="text-green-700 font-medium">
              Geolocalização obtida com sucesso.
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 font-medium">Obtendo geolocalização...</p>
      )}
    </div>
  );
}
