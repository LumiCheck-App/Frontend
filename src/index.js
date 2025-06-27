import { registerRootComponent } from 'expo';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import FontDefiner from './FontDefiner';
import Toast from 'react-native-toast-message';
import toastConfig from './toastConfig';
import messaging from '@react-native-firebase/messaging';
import { NativeModules } from 'react-native';

const { FloatingBubble } = NativeModules;

// Handle messages in the background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (FloatingBubble && remoteMessage?.notification?.body) {
    FloatingBubble.showBubble();
    FloatingBubble.showMessage(remoteMessage.notification.body);
  }
});

messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background:', remoteMessage);
      // Pequeno delay para garantir que a navegação está pronta
      setTimeout(() => {
        NavigationRef.current?.navigate('QuestionPage');
      }, 10000);})

function ReduxWrapper() {
  return (
    <Provider store={store}>
      <FontDefiner />
      <Toast config={toastConfig} />
    </Provider>
  );
}

registerRootComponent(ReduxWrapper);
