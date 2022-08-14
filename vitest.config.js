import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ['./setupTests.js'],
    globals: true,
    environment: 'jsdom',
  },
});
