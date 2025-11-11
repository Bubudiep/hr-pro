// src/contexts/UserContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useAuth } from "./authContext"; // Import AuthContext để theo dõi trạng thái đăng nhập
import axios from "axios"; // Giả sử chúng ta dùng axios để fetch data
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  tag: string;
  account_type: string;
  timviec: boolean;
}
export interface AppConfig {
  taskbar?: boolean;
}
const DEFAULT_CONFIG: AppConfig = {
  taskbar: true,
};
interface UserContextType {
  config: AppConfig;
  profile: UserProfile | null; // Dữ liệu chi tiết của user
  isLoading: boolean; // Trạng thái đang tải
  setProfile: React.SetStateAction<any>;
  fetchUserProfile?: (userId: string) => Promise<void>; // Hàm để tải dữ liệu
  clearUserProfile?: () => void; // Hàm để xóa dữ liệu khi logout
  updateConfig: (newConfig: Partial<AppConfig>) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>({
    id: 0,
    name: "User name",
    tag: "user.name",
    email: "",
    avatar: "",
    timviec: false,
    account_type: "user",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user: authUser, logout: authLogout } = useAuth();
  const [appConfig, setAppConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const fetchUserProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Giả lập chờ mạng
      const mockProfile: UserProfile = {
        id: 1,
        name: userId, // Lấy tên từ AuthContext
        email: `${userId.toLowerCase()}@example.com`,
        tag: "user.name",
        avatar: "https://i.pravatar.cc/150",
        account_type: "user",
        timviec: false,
      };
      setProfile(mockProfile);
    } catch (error) {
      console.error("Lỗi khi tải thông tin user:", error);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };
  const clearUserProfile = () => {
    setProfile(null);
  };
  useEffect(() => {
    if (authUser) {
      fetchUserProfile(authUser);
    } else {
      clearUserProfile();
    }
  }, [authUser]);
  const updateConfig = (newConfig: Partial<AppConfig>) => {
    setAppConfig((prevConfig) => ({
      ...prevConfig, // Giữ nguyên các giá trị config cũ
      ...newConfig, // Ghi đè bằng các giá trị mới được truyền vào
    }));
  };
  const value = {
    profile,
    setProfile,
    isLoading,
    fetchUserProfile,
    clearUserProfile,
    config: appConfig,
    updateConfig,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser phải được dùng bên trong một UserProvider");
  }
  return context;
};
