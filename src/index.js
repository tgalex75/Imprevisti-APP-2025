import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/regContext";
import { ColorProvider } from "./context/colorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ColorProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ColorProvider>
  </>,
);
