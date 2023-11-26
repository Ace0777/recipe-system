import React from 'react';
import { useToast } from 'react-native-fast-toast';

const Notification = () => {
  const toast = useToast();

  const show = (message) => {
    toast.show(message);
  };

  const showLong = (message) => {
    toast.show(message, { duration: 4000 });
  };

  return {
    show,
    showLong,
  };
};

export default Notification;
