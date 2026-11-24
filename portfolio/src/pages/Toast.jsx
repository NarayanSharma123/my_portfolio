import React, { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiInfo,
  FiX,
} from "react-icons/fi";

let showNotification;

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    showNotification = (message, type = "success") => {
      const id = Date.now();

      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 3000);
    };

    return () => {
      showNotification = undefined;
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  const styles = {
    success: {
      icon: FiCheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/30",
    },
    error: {
      icon: FiAlertCircle,
      color: "text-rose-400",
      bg: "bg-rose-400/10",
      border: "border-rose-400/30",
    },
    warning: {
      icon: FiAlertTriangle,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/30",
    },
    info: {
      icon: FiInfo,
      color: "text-[#60A5FA]",
      bg: "bg-[#60A5FA]/10",
      border: "border-[#60A5FA]/30",
    },
  };

  return (
    <div className="fixed right-5 top-5 z-[9999] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const style = styles[toast.type] || styles.info;
        const Icon = style.icon;

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 rounded-xl border ${style.border} bg-[#111827] p-4 shadow-xl animate-toast`}
          >
            {/* Notification Icon */}
            <div className={`rounded-lg p-2 ${style.bg} ${style.color}`}>
              <Icon size={21} />
            </div>

            {/* Notification Message */}
            <p className="flex-1 text-sm text-white">{toast.message}</p>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90"
            >
              <FiX size={18} />
            </button>
          </div>
        );
      })}

      <style>
        {`
    @keyframes toastEnter {
      from {
        opacity: 0;
        transform: translateX(25px);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .animate-toast {
      animation: toastEnter 0.3s ease;
    }
  `}
      </style>
    </div>
  );
};

export const showToast = (message, type = "success") => {
  if (showNotification) {
    showNotification(message, type);
  }
};

export default Toast;
