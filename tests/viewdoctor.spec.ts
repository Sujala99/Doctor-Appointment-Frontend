import { test, expect } from '@playwright/test';

// Test to verify fetching and displaying all doctors
test('Get All Doctors', async ({ page }) => {
  // Navigate to the Doctor page
  await page.goto('http://localhost:5173/doctor'); // Adjust the URL to match your development server

  // Wait for the doctor cards to be populated
  await page.waitForSelector('.grid.grid-cols-1.sm:grid-cols-2 > div');

  // Get all doctor cards
  const doctorCards = await page.$$('.grid.grid-cols-1.sm:grid-cols-2 > div');

  // Ensure there is at least one doctor displayed
  expect(doctorCards.length).toBeGreaterThan(0);
});

// Test to verify the "No doctors available" message is displayed when there are no doctors
// test('Check No Doctors Message', async ({ page }) => {
//   // Navigate to the Doctor page
//   await page.goto('http://localhost:5173/doctor'); // Adjust the URL to match your development server

//   // Wait for the "No doctors available" message to be displayed
//   await page.waitForSelector('p.text-center.col-span-full.text-lg');

//   // Get the "No doctors available" message
//   const noDoctorsMessage = await page.textContent('p.text-center.col-span-full.text-lg');

//   // Verify the message is displayed
//   expect(noDoctorsMessage).toContain('No doctors available');
// });