// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
interface AuthContextType {
  user: string | null; // Tên người dùng, hoặc null nếu chưa đăng nhập
  login: (username: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode; // 'children' là các component con (ví dụ: <App />)
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const login = (username: string) => {
    setUser(username);
  };
  const logout = () => {
    setUser(null);
  };
  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// 4. Tạo Custom Hook (Cách để sử dụng Context)
// Đây là cách làm tốt nhất để các component khác truy cập Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được dùng bên trong một AuthProvider");
  }
  return context;
};
