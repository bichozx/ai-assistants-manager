import { Bot } from 'lucide-react';

export default function EmptyState() {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        rounded-xl border border-dashed
        px-6 py-14
        text-center
        sm:py-20
      "
    >
      {/* Icono */}
      <Bot
        size={48}
        className="mb-4 text-gray-400 sm:w-14 sm:h-14"
        aria-hidden
      />

      {/* Texto principal */}
      <p className="text-base font-medium text-gray-700 sm:text-lg">
        No hay asistentes creados
      </p>

      {/* Texto secundario */}
      <p className="mt-1 max-w-sm text-sm text-gray-400">
        Crea tu primer asistente para comenzar a entrenarlo y probar respuestas
        simuladas.
      </p>
    </div>
  );
}
