import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { handelRightClick } from "./function/AppUtility";
import Vending from "./pages/Vending";
function App() {
  document.addEventListener("contextmenu", handelRightClick);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Vending />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
