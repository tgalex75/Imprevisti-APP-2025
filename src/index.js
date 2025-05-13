import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/regContext";
import { ColorProvider } from "./context/colorContext";
import { DatiImprevistiProvider } from "./context/datiImprevisti";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ColorProvider>
      <DatiImprevistiProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </DatiImprevistiProvider>
    </ColorProvider>
  </>,
);
