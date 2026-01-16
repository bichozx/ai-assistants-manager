import { Assistant } from '../types/assistants';
import { useAssistantStore } from '../store/assistant.store';

interface Props {
  assistant: Assistant;
  onDelete: () => void;
}

export default function AssistantRow({ assistant, onDelete }: Props) {
  const openEditModal = useAssistantStore((s) => s.openEditModal);

  return (
    <div className="flex items-center justify-between rounded-xl border p-4 shadow-sm hover:shadow-md transition">
      {/* Info */}
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-lg">{assistant.name}</h2>
        <p className="text-sm text-gray-500">
          Idioma: {assistant.language} · Tono: {assistant.tone}
        </p>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => openEditModal(assistant)}
          className="p-2 rounded-md border hover:bg-gray-100"
        >
          ✏️
        </button>

        <button
          onClick={onDelete}
          className="p-2 rounded-md border text-red-600 hover:bg-red-50"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
