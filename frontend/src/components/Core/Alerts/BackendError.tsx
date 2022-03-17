import React from 'react';
import { renderAt } from '../../../utils/components';
import BriefNotification from './BriefNotification';

type BackendErrorProps = IbackError;

export const BackendError: React.FC<BackendErrorProps> = ({ message, status_code, type }) => {
    return (
        <BriefNotification type="secondary" severity={type} text={message} />
    );
}

export const showBackError = (err: IbackError) => {
    console.log({ err });
    renderAt(
        <BackendError {...err} />,
        "_overlay"
    );
}

export default BackendError;