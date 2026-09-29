import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  BsCheckCircleFill,
  BsExclamationTriangleFill,
  BsInfoCircleFill,
  BsX
} from "react-icons/bs";

const DEFAULT_DURATION = 7000;

type ToastType = "success" | "error" | "info";

const toastConfig: Record<ToastType, { bg: string; text: string; icon: JSX.Element; barBg: string }> = {
  success: {
    bg: "tw-bg-green",
    text: "tw-text-white",
    icon: <BsCheckCircleFill className="tw-text-xl tw-text-white tw-shrink-0" />,
    barBg: "tw-bg-white tw-opacity-60",
  },
  error: {
    bg: "tw-bg-red",
    text: "tw-text-white",
    icon: <BsExclamationTriangleFill className="tw-text-xl tw-text-white tw-shrink-0" />,
    barBg: "tw-bg-white tw-opacity-60",
  },
  info: {
    bg: "tw-bg-blue",
    text: "tw-text-white",
    icon: <BsInfoCircleFill className="tw-text-xl tw-text-white tw-shrink-0" />,
    barBg: "tw-bg-white tw-opacity-60",
  },
};

const ToastComponent = ({
                          t,
                          message,
                          type,
                          isInfinite,
                          duration,
                        }: {
  t: { id: string; visible: boolean };
  message: string;
  type: ToastType;
  isInfinite: boolean;
  duration: number;
}) => {
  const config = toastConfig[type];
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef(Date.now());
  const remainingTimeRef = useRef(duration);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isInfinite) return;

    if (!isPaused) {
      startTimeRef.current = Date.now();

      const updateProgress = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const currentRemaining = Math.max(0, remainingTimeRef.current - elapsed);

        const newProgress = (currentRemaining / duration) * 100;
        setProgress(newProgress);

        if (currentRemaining <= 0) {
          toast.dismiss(t.id);
        } else {
          animFrameRef.current = requestAnimationFrame(updateProgress);
        }
      };

      animFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, duration, isInfinite, t.id]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`tw-relative tw-overflow-hidden tw-w-screen tw-flex tw-flex-col tw-shadow-xl tw-transition-all tw-duration-300 tw-mb-1 ${
        t.visible ? "tw-opacity-100 tw-translate-y-0" : "tw-opacity-0 -tw-translate-y-4"
      } ${config.bg} ${config.text}`}
    >
      {/* Toast content */}
      <div className="tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-2 tw-w-full">
        <div className="tw-flex tw-items-center tw-gap-3 tw-mx-auto">
          {config.icon}
          <span className="tw-font-medium tw-text-sm md:tw-text-base">
            {message}
          </span>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={() => toast.dismiss(t.id)}
          className="tw-bg-transparent tw-border-0 tw-text-current tw-opacity-100 hover:tw-opacity-70 tw-cursor-pointer tw-p-0"
        >
          <BsX className="tw-text-3xl" />
        </button>
      </div>

      {/* Progress bar */}
      {!isInfinite && (
        <div className="tw-w-full tw-h-[3px] tw-bg-black/20 tw-overflow-hidden">
          <div
            className={`tw-h-full ${config.barBg}`}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

const renderToast = (
  message: string,
  type: ToastType,
  hasDismissButton: boolean = false,
  duration: number = DEFAULT_DURATION
) => {
  return toast.custom(
    (t) => (
      <ToastComponent
        t={t}
        message={message}
        type={type}
        isInfinite={hasDismissButton}
        duration={duration}
      />
    ),
    {
      duration: Infinity,
      style: {
        background: "transparent",
        boxShadow: "none",
        padding: 0,
        margin: 0,
        maxWidth: "100%",
      },
    }
  );
};

export const showToast = {
  // --- SUCCESS ---
  success: (msg: string, duration?: number) => renderToast(msg, "success", false, duration),
  successWithDismiss: (msg: string) => renderToast(msg, "success", true),

  // --- ERROR ---
  error: (msg: string, duration?: number) => renderToast(msg, "error", false, duration),
  errorWithDismiss: (msg: string) => renderToast(msg, "error", true),

  // --- INFO ---
  info: (msg: string, duration?: number) => renderToast(msg, "info", false, duration),
  infoWithDismiss: (msg: string) => renderToast(msg, "info", true),
};