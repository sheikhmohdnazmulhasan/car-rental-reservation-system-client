import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./routes";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={false} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);