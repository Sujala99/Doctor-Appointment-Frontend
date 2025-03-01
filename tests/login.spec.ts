// // tests/login.spec.js

// import { test, expect } from '@playwright/test';

// test.describe('Login Page', () => {
//   // test.beforeEach(async ({ page }) => {
//   //   // Navigate to the login page (adjust the URL as needed)
//   //   await page.goto('http://localhost:5173/login'); // Make sure your React app is running locally on port 3000
//   // });

//   // test('should show error for empty fields', async ({ page }) => {
//   //   // Make sure the input fields are empty
//   //   const usernameInput = await page.locator('input[name="username"]');
//   //   const passwordInput = await page.locator('input[name="password"]');
    
//   //   // Leave the fields empty and try clicking
//   //   await page.click('button[type="submit"]');
    
//   //   // Verify that the error message is displayed
//   //   const errorMessage = await page.locator('p.text-red-500');
//   //   await expect(errorMessage).toBeVisible();
//   // });
  

//   // test('should show error for invalid credentials', async ({ page }) => {
//   //   // Wait for username input to be visible
//   //   await page.waitForSelector('input[name="username"]');
//   //   await page.fill('input[name="username"]', 'testuser');
//   //   await page.waitForSelector('input[name="password"]');
//   //   await page.fill('input[name="password"]', 'password123');
//   //   await page.waitForSelector('button[type="submit"]:enabled');
//   //   await page.click('button[type="submit"]');
    
    
//   //   // Add verification for invalid login (assuming an error message shows up)
//   //   const errorMessage = await page.locator('p.text-red-500');
//   //   await expect(errorMessage).toBeVisible();
//   // });
  

//   // test('should toggle password visibility', async ({ page }) => {
//   //   // Fill in the password field
//   //   await page.fill('input[name="password"]', 'password123');
    
//   //   // Get the password input field
//   //   const passwordInput = page.locator('input[name="password"]');
    
//   //   // Initially, the password should be hidden
//   //   await expect(passwordInput).toHaveAttribute('type', 'password');
    
//   //   // Toggle password visibility
//   //   await page.click('button:has-text("Show")');
    
//   //   // After toggling, the password should be visible
//   //   await expect(passwordInput).toHaveAttribute('type', 'text');
//   // });

//   test('should navigate to registration page on link click', async ({ page }) => {
//     // Click the "Create an account" link
//     await page.click('a:has-text("Create an account")');
    
//     // Verify that the user is navigated to the registration page
//     await expect(page).toHaveURL('http://localhost:5173/register');
//   });

//   test('should show alert on successful login', async ({ page }) => {
//     // Fill in the login form with valid credentials
//     await page.fill('input[name="username"]', 'testuser');
//     await page.fill('input[name="password"]', 'password123');
    
//     // Listen for the SweetAlert modal and intercept the popup
//     page.on('dialog', async (dialog) => {
//       await expect(dialog.message()).toContain('Welcome back!');
//       await dialog.accept();
//     });
    
//     // Click the login button
//     await page.click('button[type="submit"]');
//   });
// });


import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {

  // Test for successful login
 test('should log in a user successfully', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:5173/login'); // Adjust the URL as per your app setup

  // Input valid credentials
  await page.fill('input[id="username"]', 'aakash');  // Use a valid test username or email
  await page.fill('input[id="password"]', 'aakash'); // Use a valid test password

  // Click on the login button
  await page.click('button[type="submit"]');

  // Wait for the redirect to happen
  await page.waitForNavigation();

  // Verify successful navigation (e.g., check if the page contains a user-specific element)
  // Update the expected URL to match the correct redirect (e.g., "/")
  expect(await page.url()).toBe('http://localhost:5173/'); // Or any other expected URL after login

  // Optionally, check for a token in local storage (this would require you to handle authentication on the frontend)
  const token = await page.evaluate(() => localStorage.getItem('token'));
  expect(token).not.toBeNull();
});


});
