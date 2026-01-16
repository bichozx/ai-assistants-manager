import { Assistant } from '../types/assistants';
import { useAssistantStore } from '../store/assistant.store';

interface Props {
  assistant: Assistant;
  onDelete: () => void;
}

export default function AssistantCard({ assistant, onDelete }: Props) {
  const openEditModal = useAssistantStore((state) => state.openEditModal);

  return (
    <div className="border rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition">
      <h2 className="font-semibold text-lg">{assistant.name}</h2>

      <p className="text-sm text-gray-500">Idioma: {assistant.language}</p>

      <p className="text-sm text-gray-500">Tono: {assistant.tone}</p>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => openEditModal(assistant)}
          className="text-sm px-3 py-1 rounded-md border hover:bg-gray-100"
        >
          Editar
        </button>

        <button
          onClick={onDelete}
          className="text-sm px-3 py-1 rounded-md border text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
