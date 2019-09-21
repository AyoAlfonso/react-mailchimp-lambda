import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Values } from "redux-form-website-template";
import store from "./store";
import SimpleForm from "./SimpleForm";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>PoweredLocal</h2>
      <SimpleForm />
      <Values form="simple" />
    </div>
  </Provider>,
  rootEl
);
