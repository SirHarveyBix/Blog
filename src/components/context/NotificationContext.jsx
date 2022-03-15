import { createContext, useEffect, useState } from 'react';

export const NotificationContext = createContext(null);

export const NotificationContextProvider = ({ children }) => {
  const [requestStatus, setRequestStatus] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (requestStatus === 'pending') {
      setNotification({
        status: 'pending',
        title: 'connection en cours',
        message: 'veuillez patienter',
      });
    }
    if (requestStatus === 'success') {
      setNotification({
        status: 'success',
        title: 'Message envoyé.',
        message: 'Votre a bien été envoyé',
      });
    }
    if (requestStatus === 'userCreated') {
      setNotification({
        status: 'success',
        title: 'Créé.',
        message: 'Votre compte a bien été créé',
      });
    }
    if (requestStatus === 'userExists') {
      setNotification({
        status: 'error',
        title: 'Erreur !',
        message: 'Cet email est deja utilisé',
      });
    }

    if (requestStatus === 'connected') {
      setNotification({
        status: 'success',
        title: 'Vous etes connecté(e)',
        message: '👌',
      });
    }
    if (requestStatus === 'wrongPassword') {
      setNotification({
        status: 'error',
        title: 'Erreur !',
        message: 'votre mot de passe est erronné',
      });
    }
    if (requestStatus === 'missingField') {
      setNotification({
        status: 'error',
        title: 'Erreur !',
        message: 'Vous devez remplir les deux champs !',
      });
    }
    if (requestStatus) {
      const timer = setTimeout(() => {
        setNotification(null);
        setRequestStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  return (
    <NotificationContext.Provider
      value={{
        requestStatus: requestStatus,
        notification: notification,
        setRequestStatus: setRequestStatus,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
