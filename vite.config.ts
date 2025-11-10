import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    // Hoặc có thể dùng: host: true,
    // (Tùy chọn) Bạn cũng có thể đặt port ở đây
    // port: 3000,
  },
});
