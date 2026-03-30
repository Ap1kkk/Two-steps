import React, {useEffect, ReactNode, useCallback} from "react";
import styles from './modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    closeOnOverlayClick?: boolean;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
                                                isOpen,
                                                onClose,
                                                children,
                                                closeOnOverlayClick = true,
                                                className,
                                            }) => {
    const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
        }
    }, [closeOnOverlayClick, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}
            onClick={handleOverlayClick}
        >
            <div className={`${styles.modal} ${className || ''}`}>
                {children}
            </div>
        </div>
    );
};

Modal.displayName = 'Modal';