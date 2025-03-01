import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Location of your test files
  use: {
    headless: true,   // Run tests in headless mode
    baseURL: 'http://localhost:5173', // Your React app’s URL
    viewport: { width: 1280, height: 720 }, // Default viewport size
  },
});
