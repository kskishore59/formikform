import React, {FC, useEffect} from 'react';
import logging from '../../config/logging';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export interface PropType {
    component: React.FC;
}

const PrivateRoute: FC<PropType> = ({ component: Component }) => {
    const navigate = useNavigate()
    const details = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (!details.refreshToken)
    {
        logging.warn('No user detected, redirecting');
        navigate('/login')
    }
    })

    return (
        <Component />
    );
        

   
}

export default PrivateRoute;
