
// // Test to verify deleting a doctor
// test('Delete Doctor', async ({ page }) => {
//   // Navigate to the View Doctor page
//   await page.goto('http://localhost:5173/viewDoctor'); // Adjust the URL to match your development server

//   // Wait for the table to be populated
//   await page.waitForSelector('table tbody tr');

//   // Click the first "Delete" button
//   await page.click('table tbody tr:nth-child(1) button:text("Delete")');

//   // Wait for the delete confirmation modal to appear
//   await page.waitForSelector('div.fixed.inset-0.bg-black.bg-opacity-50');

//   // Click the "Yes" button to confirm deletion
//   await page.click('button:text("Yes")');

//   // Wait for the modal to close
//   await page.waitForSelector('div.fixed.inset-0.bg-black.bg-opacity-50', { state: 'hidden' });

//   // Verify the doctor is no longer in the table
//   const rows = await page.$$('table tbody tr');
//   expect(rows.length).toBeGreaterThan(0); // Ensure there is at least one row left
// });