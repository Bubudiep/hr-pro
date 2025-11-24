import { BrowserRouter, Route, Routes } from "react-router-dom";
import App_home from "../home";
import Mobile_index from "../mobile";
import { AuthProvider } from "../context/authContext";
import NotFoundPage from "../mobile/notFound";
import Quanlycongty_index from "../mobile/canhan/admin/quanlycongty/index";
import DangbaiTuyendung_index from "../mobile/canhan/admin/dangbaituyendung";
import Congtacvien_index from "../mobile/canhan/admin/congtacvien";
import Tintuyen_index from "../mobile/lichtuyen/baiviet";

const Router_all = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App_home />}></Route>
          <Route path="mobile" element={<Mobile_index />}></Route>
          <Route path="mobile/:tab" element={<Mobile_index />}>
            <Route path="congty" element={<Quanlycongty_index />}></Route>
            <Route path="tin" element={<Tintuyen_index />}></Route>
            <Route path="tin/:tin" element={<Tintuyen_index />}></Route>
            <Route
              path="tuyendung"
              element={<DangbaiTuyendung_index />}
            ></Route>
            <Route path="tintd" element={<DangbaiTuyendung_index />}></Route>
            <Route path="congtv" element={<Congtacvien_index />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default Router_all;
