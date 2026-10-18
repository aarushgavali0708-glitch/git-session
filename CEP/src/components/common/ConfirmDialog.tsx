import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#252238]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#E8E5F0] overflow-hidden z-10 p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              isDestructive
                ? 'bg-[#FDF3F5] text-[#D98291]'
                : 'bg-[#FDF9F2] text-[#D8A65A]'
            }`}
          >
            {isDestructive ? (
              <Trash2 className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#252238]">{title}</h3>
            <p className="text-xs text-[#77738C] mt-0.5">Please confirm this action</p>
          </div>
        </div>

        <p className="text-sm text-[#77738C] leading-relaxed mb-6 bg-[#FAF9FD] p-3.5 rounded-xl border border-[#E8E5F0]">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#77738C] hover:text-[#252238] hover:bg-[#F0EDFA] transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all shadow-xs ${
              isDestructive
                ? 'bg-[#D98291] hover:bg-[#c97180]'
                : 'bg-[#6554C0] hover:bg-[#5644B0]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

