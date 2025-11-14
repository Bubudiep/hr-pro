// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Api from "../components/api";
import { message } from "antd";
import { getMaxUpdatedAt, putMultiple, syncInit } from "../db/App_db";
interface UpdateProfileType {
  tag?: string;
  level_name?: string;
  address?: string;
  inventer?: number;
  level?: string;
  name?: string;
  name_display?: string;
  phone?: string;
  user?: number;
  timviec?: boolean;
  verified?: boolean;
  updated_at?: string;
  created_at?: string;
}
interface ProfileType {
  id: number;
  tag: string;
  address: string;
  inventer: number;
  level: string;
  level_name: string;
  name: string;
  name_display: string;
  phone: string;
  user: number;
  timviec: boolean;
  verified: boolean;
  updated_at: string;
  created_at: string;
}
interface UserType {
  id: string;
  username: string;
  profile: ProfileType;
  access_token?: string | "";
}
interface AuthContextType {
  user: UserType | undefined;
  loading: boolean;
  init: { companies: any[]; ips: any[]; tags: any[] };
  setInit: any;
  config: {
    taskbar: boolean;
  };
  login: (
    username: string,
    password: string,
    remember: boolean,
    callback: (e: boolean) => void
  ) => void;
  auto_login: (callback: (e: boolean) => void) => Promise<void>;
  logout: () => void;
  updateProfile: (e: UpdateProfileType) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface AuthProviderProps {
  children: ReactNode; // 'children' là các component con (ví dụ: <App />)
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [config, setConfig] = useState({ taskbar: true });
  const [init, setInit] = useState({ companies: [], ips: [], tags: [] });
  const auto_login = async (callback?: (e: boolean) => void) => {
    setLoading(true);
    let success = false;
    const access_token: string = localStorage.getItem("access_token") || "";
    if (access_token) {
      Api.get("/user/", access_token)
        .then((res) => {
          setUser({ ...res, access_token: access_token });
          success = true;
        })
        .catch((e) => {
          console.log(e);
        });
    }
    await syncInit(access_token || "");
    if (callback) callback(success);
    setLoading(false);
  };
  const login = (
    username: string,
    password: string,
    remember: boolean,
    callback?: (e: boolean) => void
  ) => {
    setLoading(true);
    Api.post("/in/", { username, password })
      .then((login_res) => {
        if (remember) {
          localStorage.setItem("access_token", login_res?.access_token);
        } else {
          localStorage.removeItem("access_token");
        }
        Api.get("/user/", login_res?.access_token)
          .then((res) => {
            setUser({ ...res, access_token: login_res?.access_token });
            if (callback) callback(true);
          })
          .catch((e) => {
            message.error(e?.response?.data?.detail || "Lỗi không xác định!!");
            if (callback) callback(false);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((e) => {
        message.error(e?.response?.data?.detail || "Lỗi không xác định!!");
        setLoading(false);
        if (callback) callback(false);
      });
  };
  const logout = () => {
    setUser(undefined);
  };
  const updateProfile = (updateData: UpdateProfileType) => {
    Api.patch(
      `/profile/${user?.profile?.id}/`,
      updateData,
      user?.access_token || ""
    )
      .then((res) => {
        setUser((o) =>
          o
            ? {
                ...(o || {}),
                profile: res,
              }
            : undefined
        );
      })
      .catch((e) => {
        message.error(e?.response?.data?.detail || "Lỗi không xác định!!");
      });
  };
  const value = {
    init,
    setInit,
    user,
    loading,
    config,
    login,
    logout,
    updateProfile,
    auto_login,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth phải được dùng bên trong một AuthProvider");
  }
  return context;
};
