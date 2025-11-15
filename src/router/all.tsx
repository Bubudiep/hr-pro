import { BrowserRouter, Route, Routes } from "react-router-dom";
import App_home from "../home";
import Mobile_index from "../mobile";
import { AuthProvider } from "../context/authContext";
import NotFoundPage from "../mobile/notFound";
import Quanlycongty_index from "../mobile/canhan/quanlycongty/index";

const Router_all = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App_home />}></Route>
          <Route path="mobile" element={<Mobile_index />}></Route>
          <Route path="mobile/:tab" element={<Mobile_index />}>
            <Route path="congty" element={<Quanlycongty_index />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default Router_all;
