import { Brain, Loader2, Pencil, Trash2 } from 'lucide-react';

import { Assistant } from '../types/assistants';
import { useAssistantStore } from '../store/assistant.store';
import { useRouter } from 'next/navigation';

interface Props {
  assistant: Assistant;
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function AssistantRow({
  assistant,
  onDelete,
  isDeleting = false,
}: Props) {
  const openEditModal = useAssistantStore((s) => s.openEditModal);
  const router = useRouter();

  return (
    <div
      className="
        flex flex-col gap-3
        rounded-xl border p-4
        shadow-sm transition
        hover:shadow-md
        sm:flex-row sm:items-center sm:justify-between
      "
    >
      {/* INFO */}
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold sm:text-lg">{assistant.name}</h2>

        <p className="text-sm text-gray-500">
          {assistant.language} · {assistant.tone}
        </p>
      </div>

      {/* ACCIONES */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        {/* ENTRENAR */}
        <button
          onClick={() => router.push(`/assistants/${assistant.id}`)}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-lg border
            transition
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500
            active:scale-95
          "
          title="Entrenar asistente"
        >
          <Brain className="h-5 w-5 text-gray-700" />
        </button>

        {/* EDITAR */}
        <button
          onClick={() => openEditModal(assistant)}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-lg border
            transition
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500
            active:scale-95
          "
          title="Editar asistente"
        >
          <Pencil className="h-5 w-5 text-gray-700" />
        </button>

        {/* ELIMINAR */}
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-lg border
            text-red-600
            transition
            hover:bg-red-50
            focus:outline-none focus:ring-2 focus:ring-red-500
            active:scale-95
            disabled:opacity-50
            disabled:pointer-events-none
          "
          title="Eliminar asistente"
        >
          {isDeleting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Trash2 className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
