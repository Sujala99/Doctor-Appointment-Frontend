import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Location of your test files
  use: {
    headless: true,   // Run tests in headless mode
    baseURL: 'http://localhost:5173', // Your React app’s URL
    viewport: { width: 1280, height: 720 }, // Default viewport size
    timeout: 60000, // Set timeout to 60 seconds
  },
  workers: 4, // Run 4 tests in parallel
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  testMatch: '**/*.spec.ts', // Match all spec files
});