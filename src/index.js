import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./Reducer/index";
import {configureStore} from "@reduxjs/toolkit"
import "./index.css";

const store = configureStore({
  reducer:rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <Provider store = {store}>
      {/* <BrowserRouter> */}
          <App />
          {/* <Toaster/> */}
        {/* </BrowserRouter> */}
    </Provider>
    
  </React.StrictMode>
);
