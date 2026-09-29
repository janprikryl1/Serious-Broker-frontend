/*
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

type Toast = {
    message: string;
    color: ToastColor;
    duration: number;
};

export enum ToastColor {
  green = "var(--green-toast-color)",
  red = "var(--red-toast-color)",
  gold = "var(--neutral-toast-color)",
}
type ToastContextType = {
    showToast: (message: string, color: ToastColor, duration?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<Toast | null>(null);
    const [progress, setProgress] = useState(100);
    const [isVisible, setIsVisible] = useState(false);

    const showToast = (message: string, color: ToastColor, duration: number = 10000) => {
        setToast({ message, color, duration });
        setProgress(100);
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => setToast(null), 300);
        }, duration);
    };

    useEffect(() => {
        if (!toast) return;
        const interval = setInterval(() => {
            setProgress(prev => Math.max(0, prev - (100 / (toast.duration / 100))));
        }, 100);
        return () => clearInterval(interval);
    }, [toast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            <ToastComponent toast={toast} progress={progress} isVisible={isVisible} />
            {children}
        </ToastContext.Provider>
    );
};

const ToastComponent = ({ toast, progress, isVisible }: { toast: Toast | null, progress: number, isVisible: boolean }) => {
    if (!toast) return null;

    return (
        <div
            style={{
                backgroundColor: toast.color,
                color: toast.color === ToastColor.gold ? 'black' : 'white',
                padding: '10px 20px',
                textAlign: 'center',
                fontSize: '16px',
                position: 'relative',
                zIndex: 1000,
                width: '100%',
                boxSizing: 'border-box',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
                opacity: isVisible ? 1 : 0,
            }}
        >
            {toast.message}
            <div
                style={{
                    height: '3px',
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    transition: 'width 0.1s linear',
                    width: `${progress}%`,
                }}
            />
        </div>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
*/
