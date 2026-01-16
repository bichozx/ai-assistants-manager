import './globals.css';

import AssistantModal from './components/AssistantModal';
import { Providers } from './provaiders';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
          <AssistantModal />
        </Providers>
      </body>
    </html>
  );
}
