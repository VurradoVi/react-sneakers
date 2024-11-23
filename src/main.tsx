import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Favorite from "./components/pages/Favorite.tsx";
import "./index.scss";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="favorite"
          element={<Favorite onClickCart={() => console.log("Cart opened")} />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
