import { createContext, useState } from 'react';

export const NotificationContext = createContext(null);

export const NotificationContextProvider = ({ children }) => {
  const [requestStatus, setRequestStatus] = useState('');

  return (
    <NotificationContext.Provider
      value={{
        requestStatus: requestStatus,
        setRequestStatus: setRequestStatus,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
