import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App_home from "../home";
import Mobile_index from "../mobile";
import { AuthProvider } from "../context/authContext";
import { UserProvider } from "../context/userContext";
import NotFoundPage from "../mobile/notFound";
import News_index from "../mobile/news";

const Router_all = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<App_home />}></Route>
            <Route path="mobile" element={<Mobile_index />}>
              <Route index element={<Navigate to="news" replace />} />
              <Route path="news" element={<News_index />}></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Route>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default Router_all;
