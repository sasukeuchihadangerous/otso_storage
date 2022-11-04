import styles from './Button.module.scss'

const Button = ({children, className, ...props}) => {
    return (
        <button className={[styles.button, className].join(' ')} {...props}>{children}</button>
    );
}

export default Button;