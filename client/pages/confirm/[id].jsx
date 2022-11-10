import { useRouter } from 'next/router';
import Image from 'next/image';
import Modal from '../../components/UI/Modal/Modal';
import AuthService from '../../API/AuthService';
import Button from '../../components/UI/Button/Button';
import styles from '../../styles/[id].module.scss';
import m_styles from '../../styles/modal.module.scss';
import Logo from '../../assets/logo.svg';

const Confirm = ({ message }) => {
    const router = useRouter();

    return (
        <Modal className={m_styles.modal} active={ true } setActive={false} closable={false}>
            <div className={styles.logo}><Image src={Logo} alt="logotype" /></div>
            <p className={m_styles.m_description}>{ message }</p>
            <Button className={m_styles.m_button} onClick={() => router.push('/login')} >Перейти к форме авторизации</Button>
        </Modal>
    );
}



export async function getServerSideProps({ params }) {
    let message = '';

    const response = await AuthService.confirm(params.id);
    if(response.status === 500) {
        message = response.data.error;
    } else if (response.status === 200) {
        message = response.data.message;
    } else {
        message = 'При подтверждении аккаунта произошла неизвестная ошибка, попробуйте позже';
    }

    return { props: { message } }
}

export default Confirm