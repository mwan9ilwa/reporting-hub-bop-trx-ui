import React, { FC } from 'react';
import { MessageBox } from 'components';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MessageBox kind="default" style={{ width: '300px', padding: '20px', textAlign: 'center' }}>
        <h5 style={{ fontSize: '16px', marginBottom: '10px' }}>Restricted Access!</h5>
        <p style={{ fontSize: '14px' }}>Your access to this resource has been restricted.</p>
      </MessageBox>
    </div>
  );
};

export default ErrorMessage;
