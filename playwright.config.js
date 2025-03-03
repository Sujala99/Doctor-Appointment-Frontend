import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Location of your test files
  use: {
    headless: true,
    baseURL: 'http://localhost:5173',
    viewport: { width: 1280, height: 720 },
    timeout: 60000,
  },
  workers: 4,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],
  testMatch: '**/*.spec.ts',
  
  // Add reporter for HTML report generation
  reporter: [['html', { open: 'on-failure' }]], // Generates 'playwright-report' folder
});
