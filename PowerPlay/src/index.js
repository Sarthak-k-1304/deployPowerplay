import React from "react";
import ReactDom from "react-dom/client";
import { App } from "./App";
import "./styles/main.scss";
import { BrowserRouter } from "react-router";
import { AppProvider } from "./Context";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>
);
