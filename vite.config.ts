import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
  },
});

// import { defineConfig } from "vitest/config";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     open: true,
//   },
//   test: {
//     globals: true,
//     environment: "jsdom",
//     setupFiles: "src/setupTests",
//     mockReset: true,
//   },
// });
