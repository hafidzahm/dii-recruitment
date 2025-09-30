import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import { TableContextProvider } from "@/contexts/TableContext";

createRoot(document.getElementById("root")!).render(
  <TableContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </TableContextProvider>
);
