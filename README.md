Clonar el repositorio:

git clone https://github.com/bichozx/ai-assistants-manager
cd ai-assistants-manager

Instalar dependencias:

npm install

Levantar el servidor de desarrollo:

npm run dev

Abrir en el navegador:

http://localhost:3000

⚠ Este proyecto solo tiene frontend. Los datos son simulados con mockResponses y Zustand para la gestión de estado local.

🛠 Decisiones técnicas y su justificación
Tecnología / Patrón Justificación
Next.js (App Router) Routing moderno, fácil escalabilidad, soporte SSR/SSG.
TypeScript Tipado estático, menor probabilidad de errores, autocompletado.
Zustand Estado UI y sincronización inmediata de datos (modal abierto/cerrado, historial de chat, asistentes seleccionados).
React Query Manejo de estado asincrónico, mutaciones, cache, loading y errores. Ideal para operaciones tipo “server”.
React Hook Form Manejo de formularios complejos, validaciones y performance optimizada.
Tailwind CSS Desarrollo rápido de UI, consistente, sin depender de librerías externas de componentes.
Lucide Icons Iconografía limpia y consistente.
uuid Generación de IDs únicas para mensajes de chat simulados.
📁 Estructura del proyecto
src/
├── app/
│ ├── page.tsx # Listado de asistentes
│ ├── assistant/
│ │ └── [id]/page.tsx # Página de entrenamiento
│ ├── layout.tsx
│ └── providers.tsx # React Query Provider
├── components/
│ ├── assistants/ # Listado de asistentes
│ ├── chat/ # Componentes de chat
│ ├── modal/ # Modales de creación/edición
│ └── ui/ # Componentes UI reutilizables
├── store/
│ └── assistant.store.ts # Zustand
├── services/
│ └── assistants.service.ts # API simulada
├── hooks/
│ └── useAssistants.ts # React Query hooks
├── types/
│ └── assistant.ts
├── constants/
│ └── mockResponses.ts

🚀 Características implementadas

Gestión de asistentes

Listado de asistentes

Visualización de detalles por asistente

Modal de creación / edición

Reglas de entrenamiento configurables

Chat simulado

Historial de chat por asistente (Zustand)

Mensajes de usuario y respuesta simulada

Indicador “El asistente está escribiendo…”

Reset de chat

UI / UX

Diseño responsive con Tailwind CSS

Animaciones suaves en toasts y modales

Botón de “Regresar” en páginas de detalle

Feedback de acciones (guardar reglas, reset de chat)

Mock data

Datos simulados con mockResponses

IDs únicos generadas con crypto.randomUUID()

Estado persistente durante la sesión (Zustand)

⚡ Notas finales

Se priorizó claridad, escalabilidad y separación de responsabilidades entre UI state (Zustand) y async/server-like state (React Query).
