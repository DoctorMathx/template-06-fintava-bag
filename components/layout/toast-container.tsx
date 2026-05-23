"use client";

import { useToast } from "@/lib/toast-context";
import { X, CheckCircle, Info } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex flex-col gap-2 w-full max-w-sm px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-[#1A1A1A] text-white px-4 py-3 shadow-lg"
        >
          {t.type === "success" ? <CheckCircle className="w-4 h-4 flex-shrink-0 text-[#C4956A]" /> : <Info className="w-4 h-4 flex-shrink-0 text-white/60" />}
          <p className="text-xs font-medium flex-1 leading-relaxed">{t.message}</p>
          <button onClick={() => removeToast(t.id)} className="text-white/50 hover:text-white transition-colors flex-shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
