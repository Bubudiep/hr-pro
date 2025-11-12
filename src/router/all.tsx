import { BrowserRouter, Route, Routes } from "react-router-dom";
import App_home from "../home";
import Mobile_index from "../mobile";
import { AuthProvider } from "../context/authContext";
import NotFoundPage from "../mobile/notFound";

const Router_all = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App_home />}></Route>
          <Route path="mobile" element={<Mobile_index />}>
            <Route path=":tab" element={<Mobile_index />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default Router_all;
