'use client';

import { mockResponses } from '@/app/constants/mockResponses';
import { useAssistantById } from '@/app/hooks/useAssistantById';
import { useAssistantStore } from '@/app/store/assistant.store';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useUpdateAssistant } from '@/app/hooks/useUpdateAssistant';

export default function AssistantTrainingPage() {
  const { id } = useParams<{ id: string }>();

  const { data: assistant, isLoading } = useAssistantById(id);
  const updateMutation = useUpdateAssistant();

  const { chats, addMessage, resetChat } = useAssistantStore();

  const messages = chats[id] ?? [];

  // 🔹 Estado solo cuando el usuario edita
  const [editedRules, setEditedRules] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (isLoading || !assistant) {
    return <p className="p-6">Cargando asistente...</p>;
  }

  // 🔹 Fuente de verdad
  const rules = editedRules ?? assistant.rules ?? '';

  const handleSaveRules = () => {
    updateMutation.mutate({
      id: assistant.id,
      data: {
        ...assistant,
        rules,
      },
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage(id, {
      id: crypto.randomUUID(),
      sender: 'user',
      content: input,
      createdAt: new Date(),
    });

    setInput('');
    setIsTyping(true);

    setTimeout(
      () => {
        const response =
          mockResponses[Math.floor(Math.random() * mockResponses.length)];

        addMessage(id, {
          id: crypto.randomUUID(),
          sender: 'assistant',
          content: response,
          createdAt: new Date(),
        });

        setIsTyping(false);
      },
      1000 + Math.random() * 1000
    );
  };

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">{assistant.name}</h1>
        <p className="text-sm text-gray-500">
          {assistant.language} · {assistant.tone}
        </p>
      </div>

      {/* Entrenamiento */}
      <section className="border rounded-xl p-4 space-y-2">
        <h2 className="font-medium">Entrenamiento</h2>

        <textarea
          value={rules}
          onChange={(e) => setEditedRules(e.target.value)}
          rows={4}
          className="w-full border rounded-md p-2"
        />

        <button
          onClick={handleSaveRules}
          disabled={updateMutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {updateMutation.isPending ? 'Guardando...' : 'Guardar'}
        </button>

        {updateMutation.isSuccess && (
          <p className="text-sm text-green-600">
            Entrenamiento guardado correctamente
          </p>
        )}
      </section>

      {/* Chat simulado */}
      <section className="border rounded-xl p-4 flex flex-col h-[400px]">
        <h2 className="font-medium mb-2">Chat Simulado</h2>

        <div className="flex-1 overflow-y-auto space-y-2 mb-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[70%] p-2 rounded-md text-sm ${
                msg.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
              }`}
            >
              {msg.content}
            </div>
          ))}

          {isTyping && (
            <p className="text-sm text-gray-400">
              El asistente está escribiendo...
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border rounded-md p-2"
            placeholder="Escribe un mensaje"
          />

          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Enviar
          </button>

          <button
            onClick={() => resetChat(id)}
            className="px-3 py-2 border rounded-md"
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}
