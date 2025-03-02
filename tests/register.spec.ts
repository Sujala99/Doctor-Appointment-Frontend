import { test, expect } from '@playwright/test';

test('Register Form Submission', async ({ page }) => {
  // Increase the timeout for this test
  test.setTimeout(60000); // Set timeout to 60 seconds

  // Navigate to the Register page
  await page.goto('http://localhost:5173/register'); // Adjust the URL to match your development server

  // Fill in the form fields
  await page.fill('input[name="fullname"]', 'John Doe');
  await page.fill('input[name="username"]', 'johndoe');
  await page.fill('input[name="email"]', 'john.doe@example.com');
  await page.fill('input[name="dob"]', '1990-01-01');
  await page.fill('input[name="phonenumber"]', '1234567890');
  await page.fill('input[name="password"]', 'password123');

  // Submit the form
  await page.click('button[type="submit"]');

  // Wait for the success alert
  await expect(page.locator('text=Registration Successful')).toBeVisible();

  // Optionally, you can check if the page navigates to the login page
  await expect(page).toHaveURL(/login/);
});