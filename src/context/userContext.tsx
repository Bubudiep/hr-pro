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
  avatar: string; // Thêm một số trường dữ liệu thực tế
}
// 2. Định nghĩa "hình dạng" của Context
interface UserContextType {
  profile: UserProfile | null; // Dữ liệu chi tiết của user
  isLoading: boolean; // Trạng thái đang tải
  fetchUserProfile: (userId: string) => Promise<void>; // Hàm để tải dữ liệu
  clearUserProfile: () => void; // Hàm để xóa dữ liệu khi logout
}
// 3. Tạo Context
const UserContext = createContext<UserContextType | undefined>(undefined);
// 4. Tạo Provider
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user: authUser, logout: authLogout } = useAuth();
  const fetchUserProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      // Giả lập gọi API
      // const response = await axios.get(`/api/users/${userId}`);
      // setProfile(response.data);

      // --- Giả lập dữ liệu ---
      await new Promise((resolve) => setTimeout(resolve, 500)); // Giả lập chờ mạng
      const mockProfile: UserProfile = {
        id: 1,
        name: userId, // Lấy tên từ AuthContext
        email: `${userId.toLowerCase()}@example.com`,
        avatar: "https://i.pravatar.cc/150",
      };
      setProfile(mockProfile);
      // ------------------------
    } catch (error) {
      console.error("Lỗi khi tải thông tin user:", error);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm xóa dữ liệu khi logout
  const clearUserProfile = () => {
    setProfile(null);
  };

  // Tự động tải thông tin user khi 'authUser' thay đổi (tức là khi login)
  useEffect(() => {
    if (authUser) {
      fetchUserProfile(authUser); // authUser là 'username' từ AuthContext
    } else {
      clearUserProfile(); // Xóa profile khi user là null (logout)
    }
  }, [authUser]); // Chạy lại khi authUser thay đổi

  const value = {
    profile,
    isLoading,
    fetchUserProfile,
    clearUserProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 5. Tạo Custom Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser phải được dùng bên trong một UserProvider");
  }
  return context;
};
