// import { test, expect } from '@playwright/test';

// test.describe('Registration Form', () => {
//   test.beforeEach(async ({ page }) => {
//     // Navigate to the Register page
//     await page.goto('http://localhost:5173/register'); // Adjust URL to match your local setup
//   });

//   test('should render the registration form correctly', async ({ page }) => {
//     // Check if the form elements are present
//     await expect(page.locator('input[name="fullname"]')).toBeVisible();
//     await expect(page.locator('input[name="username"]')).toBeVisible();
//     await expect(page.locator('input[name="email"]')).toBeVisible();
//     await expect(page.locator('input[name="phonenumber"]')).toBeVisible();
//     await expect(page.locator('input[name="dob"]')).toBeVisible();
//     await expect(page.locator('input[name="password"]')).toBeVisible();
//     await expect(page.locator('button[type="submit"]')).toBeVisible();
//   });

//   test('should disable submit button when form is incomplete', async ({ page }) => {
//     // Initially, submit button should be disabled
//     const submitButton = page.locator('button[type="submit"]');
//     await expect(submitButton).toHaveAttribute('disabled', 'true');
//   });

//   test('should enable submit button when form is complete', async ({ page }) => {
//     // Fill out the form with valid data
//     await page.fill('input[name="fullname"]', 'klsdnflnla Doe');
//     await page.fill('input[name="username"]', 'njldvf');
//     await page.fill('input[name="email"]', 'djsnf@gmail.com');
//     await page.fill('input[name="phonenumber"]', '1234567890');
//     await page.fill('input[name="dob"]', '1990-01-01');
//     await page.fill('input[name="password"]', 'password123');

//     // The submit button should be enabled after filling the form
//     const submitButton = page.locator('button[type="submit"]');
//     await expect(submitButton).not.toHaveAttribute('disabled');
//     await expect(submitButton).toBeEnabled();
//   });

//   test('should show password visibility toggle button', async ({ page }) => {
//     // Check if the password visibility toggle button is visible
//     const toggleButton = page.locator('button[type="button"]');
//     await expect(toggleButton).toBeVisible();
//   });
// });
