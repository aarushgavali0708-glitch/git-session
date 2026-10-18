import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useData();

  if (toasts.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#8BAF9B] shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-[#D98291] shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[#D8A65A] shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-[#6554C0] shrink-0" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-4 border-l-[#8BAF9B]';
      case 'error':
        return 'border-l-4 border-l-[#D98291]';
      case 'warning':
        return 'border-l-4 border-l-[#D8A65A]';
      default:
        return 'border-l-4 border-l-[#6554C0]';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 bg-white rounded-xl shadow-lg border border-[#E8E5F0] ${getBorderColor(
            toast.type
          )} transition-all duration-200 animate-in fade-in slide-in-from-bottom-2`}
        >
          {getIcon(toast.type)}
          <div className="flex-1 text-sm text-[#252238] font-medium leading-snug">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#77738C] hover:text-[#252238] transition-colors p-0.5 rounded"
            aria-label="Close toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

