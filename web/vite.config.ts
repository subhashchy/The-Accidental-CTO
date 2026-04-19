import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.GITHUB_REPO || ""; // here, "The-Accidental-CTO"

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: isGithubPages ? `/${repoName}/` : "/",

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
