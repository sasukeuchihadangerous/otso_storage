import styles from './Modal.module.scss';
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({active, setActive, children, className, closable}) => {
    return (
        <AnimatePresence>
            {active &&
                <motion.div className={styles.overlay} initial={{ opacity: 0 }} exit={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} onClick={closable ? e => setActive(false) : e => e}>
                    <motion.div className={[styles.modal, className].join(' ')} initial={{ opacity: 0, scale: 0 }} exit={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} onClick={e => e.stopPropagation()}>
                        {children}
                    </motion.div>
                </motion.div>     
            }
        </AnimatePresence>
    );
}

export default Modal;