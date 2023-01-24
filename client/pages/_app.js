import '../styles/globals.css'
import { Provider } from 'react-redux';
import { store } from '../reducers';
import AuthProvider from '../components/AuthProvider';

function MyApp({ Component, pageProps }) {
    return <Provider store={store}>
        <AuthProvider Component={Component} {...pageProps} />   
    </Provider>
}

export default MyApp