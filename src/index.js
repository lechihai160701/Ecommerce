import { App as AntdApp } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
// import store from "./redux/store";
import { persistor, store } from "./redux/storePersist";
import "./sass/index.scss";
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <AntdApp>
          <App />
        </AntdApp>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
