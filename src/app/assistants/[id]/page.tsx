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

  const [editedRules, setEditedRules] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (isLoading || !assistant) {
    return <p className="p-6 text-center">Cargando asistente...</p>;
  }

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
      1000 + Math.random() * 1000,
    );
  };

  return (
    <main className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold">{assistant.name}</h1>
        <p className="text-sm text-gray-500">
          {assistant.language} · {assistant.tone}
        </p>
      </header>

      {/* Entrenamiento */}
      <section className="rounded-xl border p-4 space-y-3">
        <h2 className="font-medium text-gray-800">Entrenamiento</h2>

        <textarea
          value={rules}
          onChange={(e) => setEditedRules(e.target.value)}
          rows={4}
          placeholder="Define las reglas o instrucciones del asistente"
          className="
            w-full rounded-lg border p-3 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <button
            onClick={handleSaveRules}
            disabled={updateMutation.isPending}
            className="
              px-4 py-2 rounded-lg text-sm font-medium text-white
              bg-blue-600 hover:bg-blue-700 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {updateMutation.isPending ? 'Guardando...' : 'Guardar'}
          </button>

          {updateMutation.isSuccess && (
            <p className="text-sm text-green-600">
              Entrenamiento guardado correctamente
            </p>
          )}
        </div>
      </section>

      {/* Chat simulado */}
      <section className="rounded-xl border p-4 flex flex-col h-[420px]">
        <h2 className="font-medium text-gray-800 mb-3">Chat simulado</h2>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] rounded-lg p-2 text-sm leading-relaxed ${
                msg.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
              }`}
            >
              {msg.content}
            </div>
          ))}

          {isTyping && (
            <p className="text-sm text-gray-400 italic">
              El asistente está escribiendo...
            </p>
          )}
        </div>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
              flex-1 rounded-lg border p-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
            placeholder="Escribe un mensaje"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSend}
              className="
                px-4 py-2 rounded-lg bg-blue-600 text-white text-sm
                hover:bg-blue-700 transition
              "
            >
              Enviar
            </button>

            <button
              onClick={() => resetChat(id)}
              className="
                px-3 py-2 rounded-lg border text-sm
                hover:bg-gray-50 transition
              "
            >
              Reset
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
