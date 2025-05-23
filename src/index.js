import { registerRootComponent } from 'expo';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import FontDefiner from './FontDefiner';
import Toast from 'react-native-toast-message';
import toastConfig from './toastConfig';

function ReduxWrapper() {
  return (
    <Provider store={store}>
      <FontDefiner />
      <Toast config={toastConfig} />
    </Provider>
  );
}

registerRootComponent(ReduxWrapper);
