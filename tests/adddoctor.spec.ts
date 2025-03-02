// import { test, expect } from '@playwright/test';

// test('Add Doctor Form Submission', async ({ page }) => {
//   // Navigate to the Add Doctor page
//   await page.goto('http://localhost:5173/addDoctor'); // Adjust the URL to match your development server

//   // Fill in the form fields
//   await page.fill('input[name="fullName"]', 'John Doe');
//   await page.fill('input[name="email"]', 'john.doe@example.com');
//   await page.fill('input[name="username"]', 'johndoe');
//   await page.fill('input[name="password"]', 'password123');
//   await page.fill('input[name="phoneNumber"]', '1234567890');
//   await page.fill('input[name="address"]', '123 Main St');
//   await page.selectOption('select[name="gender"]', 'male');
//   await page.fill('input[name="dob"]', '1990-01-01');
//   await page.fill('input[name="specialization"]', 'Cardiology');
//   await page.fill('input[name="experience"]', '5');
//   await page.fill('input[name="fees"]', '100');
//   await page.fill('input[name="availableSlots"]', '9 AM - 12 PM, 3 PM - 5 PM');

//   // Submit the form
//   await page.click('button[type="submit"]');

//   // Wait for the success alert
//   await expect(page).toHaveText(/Doctor Added Successfully/);

//   // Optionally, you can check if the page navigates to the viewDoctor page
//   await expect(page).toHaveURL(/viewDoctor/);
// });