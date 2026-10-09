"use client";

import { useEffect, useState } from "react";
import { apiInspectorEventTarget } from "@/lib/api";
import { X, Activity } from "lucide-react";

interface ApiLog {
  timestamp: number;
  method: string;
  url: string;
  status: number;
  body: unknown;
}

export function ApiInspector() {
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      
      if (e.key === '`') {
        e.preventDefault(); // prevent typing backtick
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleApiLog = (e: Event) => {
      const customEvent = e as CustomEvent<ApiLog>;
      setLogs(prev => [customEvent.detail, ...prev].slice(0, 20));
    };

    apiInspectorEventTarget.addEventListener('api-log', handleApiLog);
    return () => apiInspectorEventTarget.removeEventListener('api-log', handleApiLog);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-[450px] max-h-[600px] bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 flex flex-col font-mono text-xs overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2 text-white font-bold">
          <Activity size={14} className="text-green-400" />
          API Inspector (Last 20)
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
          <X size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {logs.length === 0 ? (
          <div className="text-gray-500 text-center py-4">No API calls yet...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="p-2 rounded bg-white/5 border border-white/5">
              <div className="flex justify-between mb-1">
                <span className={`font-bold ${log.method === 'GET' ? 'text-blue-400' : log.method === 'POST' ? 'text-green-400' : log.method === 'PUT' ? 'text-yellow-400' : 'text-red-400'}`}>
                  {log.method}
                </span>
                <span className={log.status >= 200 && log.status < 300 ? 'text-green-400' : 'text-red-400'}>
                  {log.status}
                </span>
              </div>
              <div className="text-gray-300 break-all mb-1 truncate">{log.url}</div>
              {log.body && (
                <pre className="text-gray-400 mt-2 max-h-32 overflow-y-auto overflow-x-hidden p-2 bg-black/50 rounded text-[10px]">
                  {JSON.stringify(log.body, null, 2)}
                </pre>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
