import React, { FC } from 'react';
import { MessageBox } from 'components';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'left',
        marginTop: '-8px',
        marginBottom: '-8px',
        marginLeft: '-16px',
        marginRight: '-16px',
      }}
    >
      <MessageBox
        kind="default"
        style={{
          width: '100%',
          textAlign: 'left',
          marginTop: '-8px',
          marginBottom: '-8px',
          marginLeft: '-16px',
          marginRight: '-16px',
        }}
      >
        <p style={{ fontSize: '14px' }}>Restricted Access</p>
      </MessageBox>
    </div>
  );
};

export default ErrorMessage;
