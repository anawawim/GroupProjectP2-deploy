import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext";
import { AIContextProvider } from "./context/AIContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <SocketContextProvider>
      <AIContextProvider>
        <App />
      </AIContextProvider>
    </SocketContextProvider>
  </BrowserRouter>
);
