import React, {useEffect, ReactNode} from "react";
import styles from './modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
                                                isOpen,
                                                children,
                                                className,
                                            }) => {
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
        <div className={styles.overlay}>
            <div className={`${styles.modal} ${className || ''}`}>
                {children}
            </div>
        </div>
    );
};

Modal.displayName = 'Modal';