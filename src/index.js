import { registerRootComponent } from "expo";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import FontDefiner from "./FontDefiner";

function ReduxWrapper() {
  return (
    <Provider store={store}>
      <FontDefiner />
    </Provider>
  );
}

registerRootComponent(ReduxWrapper);
