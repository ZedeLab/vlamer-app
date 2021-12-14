import React, { useState, useEffect, useContext } from 'react';

const ToastContext = React.createContext();

export const IN_APP_NOTIFICATION_TYPES = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  DEFAULT: 'DEFAULT',
};

const ToastProvider = ({ children }) => {
  const defaultData = {
    show: false,
    duration: 3000,
    message: '',
    type: IN_APP_NOTIFICATION_TYPES.DEFAULT,
  };

  const [toastData, setToastData] = useState({ ...defaultData });

  useEffect(() => {
    if (toastData.show) {
      setTimeout(() => {
        setToastData({
          ...defaultData,
          show: false,
        });
      }, toastData.duration);
    }
  }, [toastData]);

  const show = (data) => {
    setToastData({
      ...toastData,
      ...data,
    });
  };

  const hide = () => {
    setToastData({ ...defaultData });
  };

  return (
    <ToastContext.Provider
      value={{
        toastData,
        toast: {
          show,
          hide,
        },
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext);
