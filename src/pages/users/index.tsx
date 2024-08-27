import React, { use, useEffect } from 'react';
import UserTemplate from '@/components/templates/UserTemplate';
import useLocalStorage from '@/hooks/useLocalStorage';
import Loader from '@/components/atoms/Loader';
import router from 'next/router';

const Users = () => {
    const { sessionData, verifySession } = useLocalStorage("mySecretKey");
    const [loading, setLoading] = React.useState(true);


    useEffect(() => {
        if (!verifySession("mySecretKey")) {
            router.push("/login");
        }
        else {
            setLoading(false);
        }
    }
    , []);
    return (
        <div>
            {loading && <Loader />}
            {!loading && <UserTemplate />}
        </div>
    );
};

export default Users;