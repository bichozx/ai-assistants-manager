import { Assistant } from '../types/assistants';

let assistants: Assistant[] = [
  {
    id: '1',
    name: 'Asistente de Ventas',
    language: 'Español',
    tone: 'Profesional',
    responseLength: {
      short: 30,
      medium: 50,
      long: 20,
    },
    audioEnabled: true,
    rules:
      'Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades del cliente antes de ofrecer productos.',
  },
  {
    id: '2',
    name: 'Soporte Técnico',
    language: 'Inglés',
    tone: 'Amigable',
    responseLength: {
      short: 20,
      medium: 30,
      long: 50,
    },
    audioEnabled: false,
    rules:
      'Ayudas a resolver problemas técnicos de manera clara y paso a paso. Siempre confirma que el usuario haya entendido antes de continuar.',
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () => delay(100 + Math.random() * 400);

const shouldFail = (probability = 0.1) => Math.random() < probability;

export const getAssistants = async (): Promise<Assistant[]> => {
  await randomDelay();
  return [...assistants];
};

export const createAssistant = async (
  data: Omit<Assistant, 'id'>
): Promise<Assistant> => {
  await randomDelay();

  const newAssistant: Assistant = {
    ...data,
    id: crypto.randomUUID(),
  };

  assistants.push(newAssistant);
  return newAssistant;
};

export const updateAssistant = async (
  id: string,
  data: Omit<Assistant, 'id'>
): Promise<Assistant> => {
  await randomDelay();

  const index = assistants.findIndex((a) => a.id === id);

  if (index === -1) {
    throw new Error('Asistente no encontrado');
  }

  assistants[index] = {
    ...assistants[index],
    ...data,
  };

  return assistants[index];
};

export const deleteAssistant = async (id: string): Promise<void> => {
  await randomDelay();

  if (shouldFail()) {
    throw new Error('Error al eliminar el asistente');
  }

  assistants = assistants.filter((a) => a.id !== id);
};

export const getAssistantById = async (id: string): Promise<Assistant> => {
  await randomDelay();

  const assistant = assistants.find((a) => a.id === id);

  if (!assistant) {
    throw new Error('Asistente no encontrado');
  }

  return assistant;
};
