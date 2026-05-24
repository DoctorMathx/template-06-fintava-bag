"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { announcements } from "@/mock/navigation";

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % announcements.length), 4500);
    return () => clearInterval(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative text-white text-center py-2.5 px-10 text-[11px] sm:text-xs font-medium tracking-[0.12em] uppercase" style={{ backgroundColor: "#6A0101" }}>
      {announcements[index]}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
