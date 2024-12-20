import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App";
import { GlobalStyle } from "./styled/GlobalStyles";
import { store } from "./state/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

document.addEventListener("contextmenu", (e) => {
     e.preventDefault();
});

root.render(
     <Provider store={store}>
          <GlobalStyle />
          <App />
     </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
