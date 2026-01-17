'use client';

import { AlertTriangle, X } from 'lucide-react';

interface Props {
  open: boolean;
  title?: string;
  description?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDeleteModal({
  open,
  title = 'Eliminar asistente',
  description = 'Esta acción no se puede deshacer. ¿Estás seguro?',
  isLoading = false,
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40 p-4
      "
    >
      <div
        className="
          w-full max-w-md
          rounded-xl bg-white p-6
          shadow-lg
          animate-in fade-in zoom-in
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>

            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <p className="mt-4 text-sm text-gray-600">{description}</p>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="
              w-full sm:w-auto
              rounded-lg border px-4 py-2
              text-sm font-medium
              text-gray-700
              hover:bg-gray-100
              disabled:opacity-50
            "
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="
              w-full sm:w-auto
              rounded-lg bg-red-600 px-4 py-2
              text-sm font-medium text-white
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
