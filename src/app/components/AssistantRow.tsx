import { Assistant } from '../types/assistants';
import { useAssistantStore } from '../store/assistant.store';
import { useRouter } from 'next/navigation';

interface Props {
  assistant: Assistant;
  onDelete: () => void;
}

export default function AssistantRow({ assistant, onDelete }: Props) {
  const openEditModal = useAssistantStore((s) => s.openEditModal);
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      {/* INFO */}
      <div className="flex items-center justify-between rounded-xl border p-4 shadow-sm hover:shadow-md transition flex-1">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg">{assistant.name}</h2>
          <p className="text-sm text-gray-500">
            Idioma: {assistant.language} · Tono: {assistant.tone}
          </p>
        </div>
      </div>

      {/* ACCIONES */}
      <div className="flex items-center justify-between rounded-xl border p-4 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3">
          {/* ENTRENAR */}
          <button
            onClick={() => router.push(`/assistants/${assistant.id}`)}
            className="p-2 rounded-md border hover:bg-gray-100"
            title="Entrenar"
          >
            🧠
          </button>

          {/* EDITAR */}
          <button
            onClick={() => openEditModal(assistant)}
            className="p-2 rounded-md border hover:bg-gray-100"
            title="Editar"
          >
            ✏️
          </button>

          {/* ELIMINAR */}
          <button
            onClick={onDelete}
            className="p-2 rounded-md border text-red-600 hover:bg-red-50"
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

// return (
//   <>
//     <div className="flex items-center justify-between rounded-xl border p-4 shadow-sm hover:shadow-md transition">
//       {/* Info */}
//       <div className="flex flex-col gap-1">
//         <h2 className="font-semibold text-lg">{assistant.name}</h2>
//         <p className="text-sm text-gray-500">
//           Idioma: {assistant.language} · Tono: {assistant.tone}
//         </p>
//       </div>
//     </div>
//     <div className="flex items-center justify-between rounded-xl border p-4 shadow-sm hover:shadow-md transition">
//       {/* Acciones */}
//       <div className="flex items-center gap-3">
//         <button
//           onClick={() => openEditModal(assistant)}
//           className="p-2 rounded-md border hover:bg-gray-100"
//         >
//           ✏️
//         </button>

//         <button
//           onClick={onDelete}
//           className="p-2 rounded-md border text-red-600 hover:bg-red-50"
//         >
//           🗑️
//         </button>
//       </div>
//     </div>
//   </>
// );
//}
