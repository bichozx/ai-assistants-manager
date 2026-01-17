'use client';

import { CheckCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  toastKey: number;
  message: string;
  duration?: number;
}

export default function Toast({ toastKey, message, duration = 3000 }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!toastKey) return;

    const showTimeout = setTimeout(() => setVisible(true), 0);

    const hideTimeout = setTimeout(() => setVisible(false), duration);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [toastKey, duration]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="
          flex items-center gap-3
          rounded-lg bg-green-600 px-4 py-3
          text-sm text-white shadow-lg
          animate-in slide-in-from-bottom fade-in
        "
      >
        <CheckCircle className="h-5 w-5" />

        <span>{message}</span>

        <button
          onClick={() => setVisible(false)}
          className="ml-2 opacity-80 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
