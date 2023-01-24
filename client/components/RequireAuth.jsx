import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { useRouter } from 'next/router';
import AuthService from '../API/AuthService';

const RequireAuth = ({children}) => {
    const [loading, setLoading] = useState(true);
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        const fetchAuth = async () => {
            const response = await AuthService.auth();
            if(!response.data?.error) {
                dispatch(setUser(response.data.user));
            }
            setLoading(false);
        }
        fetchAuth();
    }, [])
    if(!loading) {
        if(!isAuth) {
            router.push('/login')
        } else {
            return children;
        }
        
    }
   
}

export default RequireAuth