import React from "react";
import ReactDOM from "react-dom/client";  // Note: React 18+ uses "react-dom/client"
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));  // Make sure this ID matches the div in index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
