import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5174,
    allowedHosts: [
      "equipment-chant-identify.ngrok-free.dev"
    ]
  }
});
