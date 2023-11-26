import { ToastAndroid } from 'react-native';

class Notification {
  static show(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  static showLong(message) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  }
}

export default Notification;
